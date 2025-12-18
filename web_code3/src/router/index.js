import { createRouter, createWebHashHistory } from 'vue-router';

// 懒加载路由组件
const Dashboard = () => import('../views/Dashboard.vue');
const BizPlanGen = () => import('../views/BizPlanGen.vue');
const PolicyMatch = () => import('../views/PolicyMatch.vue');
const RiskAlert = () => import('../views/RiskAlert.vue');
const ResourceHub = () => import('../views/ResourceHub.vue');
const AITutor = () => import('../views/AITutor.vue');
const Onboarding = () => import('../views/Onboarding.vue');

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/biz-plan-gen',
    name: 'BizPlanGen',
    component: BizPlanGen
  },
  {
    path: '/policy-match',
    name: 'PolicyMatch',
    component: PolicyMatch
  },
  {
    path: '/risk-alert',
    name: 'RiskAlert',
    component: RiskAlert
  },
  {
    path: '/resource-hub',
    name: 'ResourceHub',
    component: ResourceHub
  },
  {
    path: '/ai-tutor',
    name: 'AITutor',
    component: AITutor
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: Onboarding
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 路由守卫，检查冷启动状态
router.beforeEach((to, from, next) => {
  // 获取冷启动完成状态
  const onboardingCompleted = localStorage.getItem('onboardingCompleted');
  
  // 如果用户未完成冷启动，且当前不在onboarding页面，则跳转到onboarding
  if (!onboardingCompleted && to.name !== 'Onboarding') {
    next({ name: 'Onboarding' });
  } else {
    // 如果用户已完成冷启动，且当前在onboarding页面，则跳转到首页
    if (onboardingCompleted && to.name === 'Onboarding') {
      next({ name: 'Dashboard' });
    } else {
      next();
    }
  }
});

export default router;