import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    // Output directly into the Go embed directory so `go build` picks it up.
    outDir: '../internal/api/static/dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Use stable filenames instead of content-hashed ones so that
        // rebuilding the frontend does not produce noisy git diffs.
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    // Top-level await in main.js requires esnext; all modern browsers support it.
    target: 'esnext',
  },
})
