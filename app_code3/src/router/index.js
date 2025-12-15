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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router