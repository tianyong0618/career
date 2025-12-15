<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <Navbar />
    
    <div class="main-content">
      <!-- 侧边栏 -->
      <Sidebar />
      
      <!-- 路由出口 -->
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
  margin-top: 60px; /* 为顶部导航栏留出空间 */
}

.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>
