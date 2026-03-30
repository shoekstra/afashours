package static

import "embed"

//go:generate npm --prefix ../../../web ci
//go:generate npm --prefix ../../../web run build

// FS is the embedded filesystem containing the compiled Vue frontend assets
// from the dist/ directory, built by running go generate in this package.
//
//go:embed dist
var FS embed.FS
