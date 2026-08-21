import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pastikan ada kata kunci "export default"
export default defineConfig({
  plugins: [react()],
})