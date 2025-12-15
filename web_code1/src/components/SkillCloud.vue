<script setup>
// 能力云图组件
</script>

<template>
  <div class="skill-cloud-card card">
    <div class="card-header">
      <h3>能力云图</h3>
    </div>
    <div class="card-content">
      <div class="skill-cloud">
        <div class="skill-item" style="font-size: 24px; color: var(--primary-color);">Python</div>
        <div class="skill-item" style="font-size: 20px; color: var(--secondary-color);">SQL</div>
        <div class="skill-item" style="font-size: 18px; color: var(--success-color);">Tableau</div>
        <div class="skill-item" style="font-size: 16px; color: var(--warning-color);">Excel</div>
        <div class="skill-item" style="font-size: 22px; color: var(--primary-color);">数据分析</div>
        <div class="skill-item" style="font-size: 18px; color: var(--secondary-color);">机器学习</div>
        <div class="skill-item" style="font-size: 16px; color: var(--success-color);">数据可视化</div>
        <div class="skill-item" style="font-size: 20px; color: var(--warning-color);">逻辑思维</div>
        <div class="skill-item" style="font-size: 18px; color: var(--primary-color);">沟通表达</div>
        <div class="skill-item" style="font-size: 16px; color: var(--secondary-color);">团队协作</div>
        <div class="skill-item" style="font-size: 14px; color: var(--success-color);">问题解决</div>
        <div class="skill-item" style="font-size: 18px; color: var(--warning-color);">项目管理</div>
      </div>
      <div class="skill-source">
        <p>来源：简历解析 + 测评 + 任务完成记录</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-cloud-card {
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

.skill-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: #f0f7ff;
  border-radius: var(--border-radius-md);
  min-height: 150px;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.skill-cloud:hover {
  box-shadow: var(--shadow-sm);
}

.skill-item {
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

.skill-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  background-color: rgba(255, 255, 255, 0.8);
}

.skill-source {
  margin-top: var(--spacing-md);
  text-align: right;
}

.skill-source p {
  margin: 0;
  font-size: var(--font-size-small);
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .skill-cloud {
    padding: var(--spacing-md);
    min-height: 120px;
  }
  
  .skill-item {
    font-size: 14px !important;
  }
}
</style>