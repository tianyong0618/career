<template>
  <div class="layout-container">
    <!-- 左侧导航栏 -->
    <SideNav />
    
    <!-- 主内容区 -->
    <main class="flex-1 overflow-y-auto p-8">
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
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: #0f172a;
}

/* 主内容区 */
main {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background-color: #0f172a;
}

/* 自定义滚动条样式 */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background: #1e293b;
}

main::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>