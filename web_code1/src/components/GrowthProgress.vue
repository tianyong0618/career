<script setup>
// 成长进度条组件
</script>

<template>
  <div class="growth-progress-card card">
    <div class="card-header">
      <h3>成长进度</h3>
    </div>
    <div class="card-content">
      <div class="progress-info">
        <h4>距离初级数据分析师还有：</h4>
        <div class="progress-steps">
          <div class="step-item">
            <span class="step-icon">📚</span>
            <span class="step-text">2项技能待提升</span>
          </div>
          <div class="step-item">
            <span class="step-icon">💼</span>
            <span class="step-text">1个实战项目</span>
          </div>
        </div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-label">
          <span>当前进度</span>
          <span class="progress-percentage">75%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 75%"></div>
        </div>
      </div>
      <div class="quick-actions">
        <button class="btn-primary">探索职业路径</button>
        <button class="btn-secondary">开始AI测评</button>
        <button class="btn-outline">查看今日推荐</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.growth-progress-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-large);
}

.progress-info {
  margin-bottom: var(--spacing-lg);
}

.progress-info h4 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.progress-steps {
  display: flex;
  gap: var(--spacing-xl);
}

.step-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-medium);
  color: var(--text-secondary);
}

.step-icon {
  font-size: var(--font-size-large);
}

.progress-bar-container {
  margin-bottom: var(--spacing-lg);
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-medium);
  font-weight: 500;
  color: var(--text-secondary);
}

.progress-percentage {
  color: var(--primary-color);
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: var(--bg-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-lg);
  transition: width var(--transition-normal);
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.quick-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.quick-actions button {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-medium);
}

@media (max-width: 768px) {
  .progress-steps {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .quick-actions button {
    width: 100%;
  }
}
</style>