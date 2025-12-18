import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 设置相对路径，解决cloudbase部署白屏问题
  server: {
    host: '0.0.0.0', // 支持IP访问
    port: 5532 // 指定端口为5532
  }
})