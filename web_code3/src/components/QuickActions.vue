<script setup>
// 导入路由跳转函数
import { useRouter } from 'vue-router';

const router = useRouter();

// 定义快捷行动项
const quickActions = [
  {
    id: 1,
    icon: '📄',
    title: '生成BP',
    description: '快速生成商业计划书',
    route: '/biz-plan-gen'
  },
  {
    id: 2,
    icon: '🏛️',
    title: '政策匹配',
    description: '查看可申报的补贴与优惠政策',
    route: '/policy-match'
  },
  {
    id: 3,
    icon: '⚠️',
    title: '风险预警',
    description: '查看当前风险提示',
    route: '/risk-alert'
  },
  {
    id: 4,
    icon: '💼',
    title: '资源撮合',
    description: '寻找潜在合伙人、投资人或供应商',
    route: '/resource-hub'
  }
];

// 导航到对应页面
const navigateTo = (routePath) => {
  router.push(routePath);
};
</script>

<template>
  <div class="quick-actions-section">
    <h3 class="section-title">快捷行动</h3>
    <div class="actions-grid">
      <div 
        v-for="action in quickActions" 
        :key="action.id" 
        class="action-card"
        @click="navigateTo(action.route)"
      >
        <div class="action-icon">{{ action.icon }}</div>
        <div class="action-content">
          <h4 class="action-title">{{ action.title }}</h4>
          <p class="action-description">{{ action.description }}</p>
        </div>
        <div class="action-arrow">→</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quick-actions-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.action-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid var(--border-color);
}

.action-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--primary-blue);
}

.action-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.action-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

.action-arrow {
  font-size: 18px;
  color: var(--text-tertiary);
  transition: var(--transition);
}

.action-card:hover .action-arrow {
  color: var(--primary-blue);
  transform: translateX(4px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .action-card {
    padding: 16px;
  }
  
  .action-icon {
    font-size: 28px;
  }
}
</style>