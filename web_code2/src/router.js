import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import PathSandbox from './views/PathSandbox.vue'
import AIPartner from './views/AIPartner.vue'
import GrowthCenter from './views/GrowthCenter.vue'
import Onboarding from './views/Onboarding.vue'
import AIAssessment from './views/AIAssessment.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/path-sandbox',
      name: 'PathSandbox',
      component: PathSandbox
    },
    {
      path: '/ai-partner',
      name: 'AIPartner',
      component: AIPartner
    },
    {
      path: '/growth-center',
      name: 'GrowthCenter',
      component: GrowthCenter
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: Onboarding
    },
    {
      path: '/ai-assessment',
      name: 'AIAssessment',
      component: AIAssessment
    }
  ]
})

export default router