<template>
  <div class="growth-progress card">
    <div class="card-header">
      <h3>成长进度</h3>
    </div>
    <div class="card-content">
      <div class="goal-section">
        <h4 class="main-goal">{{ growthProgress.mainGoal }}</h4>
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: growthProgress.progress + '%' }"></div>
          </div>
          <span class="progress-text">{{ growthProgress.progress }}%</span>
        </div>
      </div>
      
      <div class="milestones-section">
        <h5 class="section-title">里程碑</h5>
        <div class="milestones-list">
          <div 
            class="milestone-item" 
            v-for="(milestone, index) in growthProgress.milestones" 
            :key="index"
          >
            <div class="milestone-icon">
              <span v-if="milestone.completed">✅</span>
              <span v-else>⏳</span>
            </div>
            <div class="milestone-content">
              <div class="milestone-name">{{ milestone.name }}</div>
              <div class="milestone-status" v-if="milestone.completed">已完成</div>
              <div class="milestone-status pending" v-else>待完成</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hint-section">
        <div class="hint-icon">💡</div>
        <div class="hint-text">{{ growthProgress.hint }}</div>
      </div>
      
      <div class="quick-actions-section">
        <button 
          class="action-btn" 
          v-for="action in quickActions" 
          :key="action.id"
          @click="handleAction(action)"
        >
          <span class="action-icon">{{ action.icon }}</span>
          <span class="action-text">{{ action.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { growthProgress, quickActions } from '../assets/mock/data'
import { useRouter } from 'vue-router'

const router = useRouter()
// 处理快捷行动点击
const handleAction = (action) => {
  if (action.link.startsWith('/')) {
    router.push(action.link)
  } else if (action.text === '开始AI测评') {
    // 开始AI测评，清除现有冷启动状态，重新开始冷启动流程
    localStorage.removeItem('onboardingCompleted')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('userIdentity')
    // 传递来源参数，以便在onboarding页面显示返回按钮
    router.push('/onboarding?from=profile')
  } else {
    // 处理其他类型的链接
    console.log('处理其他类型的链接:', action.link)
  }
}
</script>

<style scoped>
.growth-progress {
  margin-bottom: var(--spacing-lg);
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

.goal-section {
  margin-bottom: var(--spacing-lg);
}

.main-goal {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.progress-bar {
  flex: 1;
  height: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background-color: var(--success-color);
  border-radius: var(--radius-full, 9999px);
  transition: width var(--transition-normal);
}

.progress-text {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  min-width: 40px;
  text-align: right;
}

.milestones-section {
  margin-bottom: var(--spacing-lg);
}

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  font-weight: 600;
}

.milestones-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.milestone-icon {
  font-size: var(--font-size-lg);
  min-width: 24px;
}

.milestone-content {
  flex: 1;
}

.milestone-name {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.milestone-status {
  font-size: var(--font-size-xs);
  color: var(--success-color);
  font-weight: 500;
}

.milestone-status.pending {
  color: var(--warning-color);
}

.hint-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: rgba(24, 144, 255, 0.1);
  border: 1px solid rgba(24, 144, 255, 0.2);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.hint-icon {
  font-size: var(--font-size-lg);
}

.hint-text {
  font-size: var(--font-size-sm);
  color: var(--primary-color);
  flex: 1;
}

.quick-actions-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.action-icon {
  font-size: var(--font-size-md);
}

.action-text {
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .quick-actions-section {
    grid-template-columns: 1fr 1fr;
  }
  
  .progress-bar-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .progress-text {
    text-align: right;
    margin-top: var(--spacing-xs);
  }
}
</style>