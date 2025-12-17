import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/biz-plan-gen',
    name: 'BizPlanGen',
    component: () => import('../views/BizPlanGen.vue')
  },
  {
    path: '/policy-match',
    name: 'PolicyMatch',
    component: () => import('../views/PolicyMatch.vue')
  },
  {
    path: '/risk-alert',
    name: 'RiskAlert',
    component: () => import('../views/RiskAlert.vue')
  },
  {
    path: '/resource-hub',
    name: 'ResourceHub',
    component: () => import('../views/ResourceHub.vue')
  },
  {
    path: '/ai-tutor',
    name: 'AITutor',
    component: () => import('../views/AITutor.vue')
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('../views/Onboarding.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，检查冷启动状态
router.beforeEach((to, from, next) => {
  // 获取冷启动完成状态
  const onboardingCompleted = localStorage.getItem('onboardingCompleted')
  
  // 如果用户未完成冷启动，且当前不在onboarding页面，则跳转到onboarding
  if (!onboardingCompleted && to.name !== 'Onboarding') {
    next({ name: 'Onboarding' })
  } else {
    // 如果用户已完成冷启动，且当前在onboarding页面，则跳转到首页
    if (onboardingCompleted && to.name === 'Onboarding') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
})

export default router