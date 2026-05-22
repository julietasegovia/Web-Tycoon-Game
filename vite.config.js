import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/~cinco/',
  plugins: [react()],
  server: {
    port: 3000,           // Puerto fijo
    open: true,           // Abrir automáticamente en navegador
    strictPort: true,     // Forzar uso del puerto 3000 (falla si está ocupado)
    host: true,           // Escuchar en todas las interfaces (útil para redes locales)
  },
  preview: {
    port: 3000,
      open: true,
  },
})
