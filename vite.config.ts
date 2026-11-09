import { existsSync } from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production'
  const localCorePath = path.resolve(__dirname, '../@widget-js/core/dist/index.js')
  const useLocalCore = command === 'serve' && existsSync(localCorePath)
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        ...(useLocalCore ? { '@widget-js/core': localCorePath } : {}),
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8085,
    },
    optimizeDeps: {
      // Watch the local core bundle directly during development.
      exclude: useLocalCore ? ['@widget-js/core'] : [],
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-i18next',
        'i18next',
        'sonner',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'cmdk',
        'framer-motion',
        'axios',
        'consola',
        useLocalCore ? '@widget-js/core > localforage' : '@widget-js/core',
        '@widget-js/react',
        '@widget-js/web-api',
      ],
    },
    build: {
      target: 'es2020',
      cssTarget: 'chrome100',
      minify: isProd ? 'esbuild' : false,
      sourcemap: !isProd,
      cssCodeSplit: true,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('@widget-js')) {
                if (id.includes('@widget-js/react')) { return 'widget-react' }
                if (id.includes('@widget-js/core')) { return 'widget-core' }
                return 'widget-other'
              }
              if (id.includes('supabase') || id.includes('@supabase')) { return 'supabase' }
              if (/node_modules\/react(\/|$)/.test(id)) { return 'react-core' }
              if (/node_modules\/react-dom(\/|$)/.test(id)) { return 'react-dom' }
              return 'vendor'
            }
          },
          chunkFileNames: isProd ? 'assets/chunk-[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: isProd ? 'assets/[name]-[hash][extname]' : 'assets/[name][extname]',
        },
      },
    },
  }
})
