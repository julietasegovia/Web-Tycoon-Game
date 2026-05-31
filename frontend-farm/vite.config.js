import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,           // Puerto fijo
    open: true,           // Abrir automáticamente en navegador
    strictPort: true,     // Forzar uso del puerto 3000 (falla si está ocupado)
    host: true,
    proxy: {
      '/api': 'http://localhost:4000',              // Configuración de proxy (útil para desarrollo backend)
    }
  },
  preview: {
    port: 3000,
      open: true,
  },
})
