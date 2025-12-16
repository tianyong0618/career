import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 使用相对路径，确保部署后资源能正确加载
  server: {
    host: '0.0.0.0', // 支持IP访问
    port: 5521 // 指定端口为5521
  }
})
