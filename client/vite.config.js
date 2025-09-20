import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/petconnect/', // <-- add this line with your repo name
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/feedback': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
