import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-tinder-card']
  },
  build: {
    commonjsOptions: {
      include: [/react-tinder-card/, /node_modules/]
    }
  }
})