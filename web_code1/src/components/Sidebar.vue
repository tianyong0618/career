<script setup>
// 侧边栏组件
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['switch-menu'])

// 菜单项状态管理
const activeMenu = ref('profile')

const switchMenu = (menuItem) => {
  activeMenu.value = menuItem
  emit('switch-menu', menuItem)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-menu">
      <div 
        class="menu-item" 
        :class="{ active: activeMenu === 'profile' }" 
        @click="switchMenu('profile')"
      >
        <span class="menu-icon">🏠</span>
        <span class="menu-text">我的职业镜像</span>
      </div>
      <div 
        class="menu-item" 
        :class="{ active: activeMenu === 'path' }" 
        @click="switchMenu('path')"
      >
        <span class="menu-icon">🚀</span>
        <span class="menu-text">路径沙盒</span>
      </div>
      <div 
        class="menu-item" 
        :class="{ active: activeMenu === 'ai' }" 
        @click="switchMenu('ai')"
      >
        <span class="menu-icon">🤖</span>
        <span class="menu-text">AI合伙人</span>
      </div>
      <div 
        class="menu-item" 
        :class="{ active: activeMenu === 'growth' }" 
        @click="switchMenu('growth')"
      >
        <span class="menu-icon">📈</span>
        <span class="menu-text">成长中心</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: var(--card-bg);
  border-right: 1px solid var(--border-color);
  padding: var(--spacing-md) 0;
  box-shadow: var(--shadow-sm);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: 0 var(--border-radius-lg) var(--border-radius-lg) 0;
  font-size: var(--font-size-medium);
}

.menu-item:hover {
  background-color: #e8f4f8;
  color: var(--primary-color);
}

.menu-item.active {
  background-color: var(--primary-color);
  color: white;
  font-weight: 500;
}

.menu-icon {
  font-size: var(--font-size-large);
}

.menu-text {
  flex: 1;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>