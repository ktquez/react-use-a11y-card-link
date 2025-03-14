import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'ReactUseA11yCardLink',
      fileName: 'react-use-a11y-card-link',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          React: 'React',
        },
      },
    },
  }
})
