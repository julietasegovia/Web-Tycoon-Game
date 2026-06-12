import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        rewrite: (path) => path // Don't rewrite, keep /api prefix
      }
    }
  },
  preview: {
    port: 3000,
    open: true,
  },
})