import { createRouter, createWebHistory } from 'vue-router';

// 懒加载路由组件
const Home = () => import('./views/Home.vue');
const BizPlanGen = () => import('./views/BizPlanGen.vue');
const PolicyMatch = () => import('./views/PolicyMatch.vue');
const RiskAlert = () => import('./views/RiskAlert.vue');
const ResourceHub = () => import('./views/ResourceHub.vue');
const AIPartner = () => import('./views/AIPartner.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '我的创业概况' }
  },
  {
    path: '/biz-plan-gen',
    name: 'BizPlanGen',
    component: BizPlanGen,
    meta: { title: '商业计划书生成器' }
  },
  {
    path: '/policy-match',
    name: 'PolicyMatch',
    component: PolicyMatch,
    meta: { title: '政策匹配引擎' }
  },
  {
    path: '/risk-alert',
    name: 'RiskAlert',
    component: RiskAlert,
    meta: { title: '风险预警雷达' }
  },
  {
    path: '/resource-hub',
    name: 'ResourceHub',
    component: ResourceHub,
    meta: { title: '资源撮合Marketplace' }
  },
  {
    path: '/ai-partner',
    name: 'AIPartner',
    component: AIPartner,
    meta: { title: 'AI创业导师' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫，设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `VenturePilot™ - ${to.meta.title}`;
  }
  next();
});

export default router;
