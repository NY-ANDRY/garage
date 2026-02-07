/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import ui from '@nuxt/ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui(),
    legacy({
      // We explicitly target browsers that support BigInt
      targets: ['edge >= 79', 'firefox >= 68', 'chrome >= 67', 'safari >= 14'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Creates separate chunks for large libraries
            if (id.includes('@ionic')) return 'ionic';
            if (id.includes('vue')) return 'vue-stuff';
            if (id.includes('lottie')) return 'lottie';
            // Everything else goes to vendor
            return 'vendor';
          }
        }
      }
    }
  }
})
