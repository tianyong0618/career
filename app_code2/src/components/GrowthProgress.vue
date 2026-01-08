<template>
  <div class="growth-progress card">
    <div class="card-header">
      <h3>成长进度</h3>
    </div>
    <div class="card-content">
      <div class="goal-section">
        <ProgressBar 
          :percentage="growthProgress.progress" 
          :title="'目标进度'" 
          :label="growthProgress.mainGoal" 
        />
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
    </div>
  </div>
</template>

<script setup>
import { growthProgress } from '../assets/mock/data'
import { useRouter } from 'vue-router'
import ProgressBar from './ProgressBar.vue'


const router = useRouter()

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



.progress-bar-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.progress-bar {
  flex: 1;
  height: 16px;
  background-color: #333333;
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid #444444;
}

.progress-fill {
  height: 100%;
  background-color: var(--success-color);
  border-radius: var(--radius-full, 9999px);
  transition: width var(--transition-normal);
  box-shadow: 0 0 8px rgba(82, 196, 26, 0.5);
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

/* 响应式设计 */
@media (max-width: 768px) {
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