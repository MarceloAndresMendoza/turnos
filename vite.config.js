import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './docs',
    return:{
      site: "https://marceloandresmendoza.github.io",
      base: "turnos",
    }
  }
})
