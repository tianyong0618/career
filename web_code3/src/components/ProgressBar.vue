<script setup>
// 接收进度信息作为props
const props = defineProps({
  progress: {
    type: Object,
    required: true
  }
});

// 计算进度百分比
const calculateProgress = () => {
  if (!props.progress.steps || props.progress.steps.length === 0) {
    return 0;
  }
  const completedSteps = props.progress.steps.filter(step => step.completed).length;
  return Math.round((completedSteps / props.progress.steps.length) * 100);
};
</script>

<template>
  <div class="progress-card">
    <div class="card-header">
      <h3 class="card-title">创业进展</h3>
    </div>
    
    <div class="card-body">
      <div class="progress-info">
        <h4 class="main-goal">{{ progress.mainGoal }}</h4>
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: calculateProgress() + '%' }"></div>
          </div>
          <span class="progress-percentage">{{ calculateProgress() }}%</span>
        </div>
      </div>
      
      <div class="steps-container">
        <div v-for="(step, index) in progress.steps" :key="index" class="step-item">
          <div class="step-status" :class="{ completed: step.completed }">
            <span class="step-icon">{{ step.completed ? '✅' : '⏳' }}</span>
          </div>
          <div class="step-info">
            <span class="step-name">{{ step.name }}</span>
          </div>
        </div>
      </div>
      
      <div v-if="progress.hint" class="hint-section">
        <span class="hint-icon">💡</span>
        <span class="hint-text">{{ progress.hint }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  margin-bottom: 24px;
  transition: var(--transition);
}

.progress-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.progress-info {
  margin-bottom: 20px;
}

.main-goal {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-blue), var(--success-green));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-percentage {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-blue);
  min-width: 40px;
}

.steps-container {
  margin-bottom: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.step-status {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  flex-shrink: 0;
}

.step-status.completed {
  background-color: rgba(82, 196, 26, 0.1);
}

.step-icon {
  font-size: 16px;
}

.step-info {
  flex: 1;
}

.step-name {
  font-size: 14px;
  color: var(--text-primary);
}

.hint-section {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: rgba(250, 173, 20, 0.1);
  border-radius: var(--border-radius);
  border-left: 4px solid var(--warning-yellow);
}

.hint-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.hint-text {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
}
</style>