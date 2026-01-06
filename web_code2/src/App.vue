<template>
  <div class="app-container" :data-theme="currentTheme">
    <!-- 新布局组件 -->
    <Layout v-if="showNavigation" />
    
    <!-- 引导页不需要布局 -->
    <router-view v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from './components/Layout.vue'

const router = useRouter()

// 主题状态管理
const currentTheme = ref('dark')

// 控制导航显示
const showNavigation = ref(true)

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
  // 始终使用深色主题
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
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>