<template>
  <div class="app-container" :data-theme="currentTheme">
    <!-- 顶部导航栏 -->
    <Header @theme-change="toggleTheme" :current-theme="currentTheme" v-if="showNavigation" />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 底部导航栏 -->
    <BottomNav v-if="showNavigation" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import BottomNav from './components/BottomNav.vue'

const router = useRouter()

// 主题状态管理
const currentTheme = ref('light')

// 控制导航显示
const showNavigation = ref(true)

// 主题列表
const themes = [
  { value: 'light', label: '浅色模式' },
  { value: 'dark', label: '深色模式' }
]

// 切换主题
const toggleTheme = () => {
  const currentIndex = themes.findIndex(theme => theme.value === currentTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  currentTheme.value = themes[nextIndex].value
  localStorage.setItem('theme', currentTheme.value)
}

// 冷启动检查
const checkOnboarding = () => {
  const onboardingCompleted = localStorage.getItem('onboardingCompleted')
  const currentPath = window.location.pathname
  
  // 如果未完成冷启动且不在冷启动页面，则跳转到冷启动页面
  if (!onboardingCompleted && currentPath !== '/onboarding') {
    showNavigation.value = false
    router.replace('/onboarding')
  } else {
    showNavigation.value = true
  }
}

// 从本地存储加载主题并检查冷启动
onMounted(() => {
  // 始终使用深色主题，忽略localStorage中的设置
  currentTheme.value = 'dark'
  localStorage.setItem('theme', 'dark')
  
  // 检查冷启动状态
  checkOnboarding()
  
  // 监听路由变化，控制导航显示
  router.beforeEach((to, from, next) => {
    if (to.path === '/onboarding') {
      showNavigation.value = false
    } else {
      showNavigation.value = true
    }
    next()
  })
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
    padding-bottom: 70px;
  }
}
</style>