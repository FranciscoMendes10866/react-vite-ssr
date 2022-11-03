import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { million } from 'million/vite-plugin-million'
import eslintPlugin from '@nabla/vite-plugin-eslint'

export default defineConfig({
  plugins: [react(), million(), eslintPlugin()],
  esbuild: { jsx: 'automatic' }
})
