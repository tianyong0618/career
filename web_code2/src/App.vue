<template>
  <div class="app-container" :data-theme="currentTheme">
    <!-- 顶部导航栏 -->
    <Header @theme-change="toggleTheme" :current-theme="currentTheme" />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 底部导航栏 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import BottomNav from './components/BottomNav.vue'

// 主题状态管理
const currentTheme = ref('light')

// 主题列表
const themes = [
  { value: 'light', label: '浅色模式' },
  { value: 'dark', label: '深色模式' },
  { value: 'high-contrast', label: '高对比度模式' },
  { value: 'dark-high-contrast', label: '深色高对比度模式' }
]

// 切换主题
const toggleTheme = () => {
  const currentIndex = themes.findIndex(theme => theme.value === currentTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  currentTheme.value = themes[nextIndex].value
  localStorage.setItem('theme', currentTheme.value)
}

// 从本地存储加载主题
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && themes.some(theme => theme.value === savedTheme)) {
    currentTheme.value = savedTheme
  }
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-secondary);
}

.main-content {
  flex: 1;
  padding: var(--spacing-lg) 0;
}

/* 底部导航栏固定在底部 */
@media (max-width: 768px) {
  .main-content {
    padding-bottom: 70px; /* 为底部导航栏预留空间 */
  }
}
</style>