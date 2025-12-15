import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // 确保构建后的资源路径正确
  server: {
    host: '0.0.0.0', // 支持IP访问
    port: 5521 // 指定端口为5521
  }
})
