import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/', // Added base path for GitHub Pages
  server: {
    port: 5173,
    open: true
  },
  assetsInclude: ['**/*.pdf'] // Add PDF files to the asset include list
})
