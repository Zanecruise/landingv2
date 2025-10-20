import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Serve files from `public/` during development so your existing static index files
// live there and are available at http://localhost:5173/
export default defineConfig({
  root: path.resolve(__dirname, 'public'),
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  },
  css: {
    postcss: null
  }
})
