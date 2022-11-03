import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { million } from 'million/vite-plugin-million'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'
import eslintPlugin from '@nabla/vite-plugin-eslint'

export default defineConfig({
  plugins: [react(), million(), swcReactRefresh(), eslintPlugin()],
  esbuild: { jsx: 'automatic' }
})
