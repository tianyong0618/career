<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <Header />
    
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 动态渲染路由组件 -->
      <router-view />
    </main>
    
    <!-- 底部导航栏 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './Header.vue'
import BottomNav from './BottomNav.vue'
</script>

<style scoped>
/* 布局容器 */
.layout-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  position: relative;
}

/* 主内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #0f172a;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  margin-bottom: 60px; /* 为底部导航栏留出空间 */
}

/* 鼠标悬停时显示滚动条 */
.main-content:hover {
  scrollbar-color: #475569 #1e293b;
}

/* 自定义滚动条样式 */
.main-content::-webkit-scrollbar {
  width: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-content:hover::-webkit-scrollbar {
  opacity: 1;
}

.main-content::-webkit-scrollbar-track {
  background: #1e293b;
  border-radius: 3px;
}

.main-content::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 3px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* 响应式调整 */
@media (min-width: 768px) {
  .main-content {
    padding: 1.5rem;
  }
}
</style>