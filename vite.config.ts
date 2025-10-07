import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

const resolvePath = (dir: string) => path.resolve(process.cwd(), dir)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolvePath('src'),
      '@assets': resolvePath('src/assets'),
      '@components': resolvePath('src/components'),
      '@constants': resolvePath('src/constants'),
      '@models': resolvePath('src/models'),
      '@pages': resolvePath('src/pages'),
      '@plugins': resolvePath('src/plugins'),
      '@utils': resolvePath('src/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 8061,
    open: true,
    proxy: {
      '/api': 'http://127.0.0.1:8020',
      '/graphql': 'http://127.0.0.1:8020',
    },
  },
  build: {
    outDir: 'dist4vite',
  },
})
