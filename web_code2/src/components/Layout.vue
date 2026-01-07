<template>
  <div class="layout-container">
    <!-- 左侧导航栏 -->
    <SideNav />
    
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 动态渲染路由组件 -->
      <router-view />
    </main>
    
    <!-- 右侧AI经纪人面板 -->
    <AIAgentPanel />
  </div>
</template>

<script setup>
import SideNav from './SideNav.vue'
import AIAgentPanel from './AIAgentPanel.vue'
</script>

<style scoped>
/* 布局容器 */
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: #0f172a;
}

/* 主内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background-color: #0f172a;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

/* 大屏样式 - 右侧面板显示时 */
@media (min-width: 1280px) {
  .main-content {
    width: 60%;
    flex: none;
  }
}



/* 鼠标悬停时显示滚动条 */
.main-content:hover {
  scrollbar-color: #475569 #1e293b;
}

/* 自定义滚动条样式 */
.main-content::-webkit-scrollbar {
  width: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-content:hover::-webkit-scrollbar {
  opacity: 1;
}

.main-content::-webkit-scrollbar-track {
  background: #1e293b;
}

.main-content::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>