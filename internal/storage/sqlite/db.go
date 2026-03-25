package sqlite

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	_ "embed"
	"fmt"
	"io"

	_ "modernc.org/sqlite"
)

//go:embed schema.sql
var schemaSQL string

// DB is a SQLite-backed implementation of storage.Storage.
type DB struct {
	db  *sql.DB
	key []byte // 32-byte AES-256 key derived from the provided encryption key
}

// NewDB opens (or creates) a SQLite database at dsn and applies the schema.
// encryptionKey is used to encrypt and decrypt Toggl tokens at rest. It must
// be at least 16 characters long and should be a high-entropy secret (e.g. 32
// random bytes from a secrets manager), not a human-chosen passphrase. It is
// normalised to a 32-byte AES-256 key via SHA-256.
func NewDB(dsn, encryptionKey string) (*DB, error) {
	if len(encryptionKey) < 16 {
		return nil, fmt.Errorf("encryptionKey must be at least 16 characters")
	}

	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, fmt.Errorf("opening database: %w", err)
	}

	// SQLite does not support concurrent writers; a single connection avoids
	// "database is locked" errors under concurrent request load.
	db.SetMaxOpenConns(1)

	var journalMode string
	if err := db.QueryRow(`PRAGMA journal_mode=WAL`).Scan(&journalMode); err != nil {
		db.Close()
		return nil, fmt.Errorf("enabling WAL mode: %w", err)
	}
	if journalMode != "wal" && journalMode != "memory" {
		db.Close()
		return nil, fmt.Errorf("enabling WAL mode: got %q", journalMode)
	}
	if _, err := db.Exec(`PRAGMA foreign_keys=ON`); err != nil {
		db.Close()
		return nil, fmt.Errorf("enabling foreign keys: %w", err)
	}
	if _, err := db.Exec(schemaSQL); err != nil {
		db.Close()
		return nil, fmt.Errorf("applying schema: %w", err)
	}

	sum := sha256.Sum256([]byte(encryptionKey))
	return &DB{db: db, key: sum[:]}, nil
}

// Close closes the underlying database connection.
func (d *DB) Close() error {
	return d.db.Close()
}

// encrypt encrypts plaintext with AES-256-GCM and returns a base64-encoded
// string of the nonce + ciphertext. Returns an empty string for empty input.
func (d *DB) encrypt(plaintext string) (string, error) {
	if plaintext == "" {
		return "", nil
	}
	block, err := aes.NewCipher(d.key)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", fmt.Errorf("generating nonce: %w", err)
	}
	sealed := gcm.Seal(nonce, nonce, []byte(plaintext), nil)
	return base64.StdEncoding.EncodeToString(sealed), nil
}

// decrypt decrypts a base64-encoded AES-256-GCM ciphertext produced by
// encrypt. Returns an empty string for empty input.
func (d *DB) decrypt(encoded string) (string, error) {
	if encoded == "" {
		return "", nil
	}
	data, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		return "", fmt.Errorf("base64 decode: %w", err)
	}
	block, err := aes.NewCipher(d.key)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	if len(data) < gcm.NonceSize() {
		return "", fmt.Errorf("ciphertext too short")
	}
	nonce, ciphertext := data[:gcm.NonceSize()], data[gcm.NonceSize():]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", fmt.Errorf("decrypting: %w", err)
	}
	return string(plaintext), nil
}
