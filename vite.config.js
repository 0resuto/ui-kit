import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

function copyTypesPlugin() {
  return {
    name: 'copy-types',
    closeBundle() {
      const srcTypes = resolve(import.meta.dirname, 'src/index.d.ts')
      const distTypes = resolve(import.meta.dirname, 'dist/index.d.ts')
      if (existsSync(srcTypes)) {
        copyFileSync(srcTypes, distTypes)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyTypesPlugin(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      name: 'UiKit',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      cssFileName: 'ui-kit'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'lucide-react'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'lucide-react': 'LucideReact'
        }
      }
    }
  }
})

