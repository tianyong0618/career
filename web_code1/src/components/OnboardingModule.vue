<script setup>
// 冷启动模块-测评和简历导入组件
</script>

<template>
  <div class="onboarding-module-card card">
    <div class="card-header">
      <h3>快速完善你的职业镜像</h3>
      <p>解决新用户无数据问题</p>
    </div>
    <div class="card-content">
      <div class="onboarding-options">
        <!-- 快速AI测评 -->
        <div class="option-item">
          <div class="option-icon">📋</div>
          <div class="option-info">
            <h4>快速AI测评</h4>
            <p>10道情景题 + 5分钟AI面试（语音/文字）</p>
            <div class="option-meta">
              <span class="meta-item">耗时：≤10分钟</span>
            </div>
          </div>
          <button class="btn-primary">开始测评</button>
        </div>
        
        <!-- 简历一键导入 -->
        <div class="option-item">
          <div class="option-icon">📄</div>
          <div class="option-info">
            <h4>简历一键导入</h4>
            <p>支持PDF/Word，自动提取技能/项目</p>
            <div class="option-meta">
              <span class="meta-item">耗时：≤2分钟</span>
            </div>
          </div>
          <button class="btn-secondary">上传简历</button>
        </div>
        
        <!-- 社交授权 -->
        <div class="option-item">
          <div class="option-icon">🔗</div>
          <div class="option-info">
            <h4>社交授权（可选）</h4>
            <p>授权LinkedIn/实习僧，补充经历</p>
            <div class="option-meta">
              <span class="meta-item">用户可控</span>
            </div>
          </div>
          <button class="btn-outline">授权</button>
        </div>
      </div>
      
      <!-- 输出说明 -->
      <div class="output-info">
        <div class="info-icon">✅</div>
        <div class="info-text">
          <strong>输出：</strong>生成 V1 职业镜像，准确率目标 ≥70%（经用户确认后迭代）
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.onboarding-module-card {
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

.card-header p {
  margin: var(--spacing-xs) 0 0 0;
  color: var(--text-secondary);
  font-size: var(--font-size-medium);
}

/* 选项列表 */
.onboarding-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  background-color: #fafafa;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.option-item:hover {
  box-shadow: var(--shadow-sm);
  border-color: var(--primary-color);
}

.option-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-md);
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xlarge);
  flex-shrink: 0;
}

.option-item:nth-child(2) .option-icon {
  background-color: var(--secondary-color);
}

.option-item:nth-child(3) .option-icon {
  background-color: var(--success-color);
}

.option-info {
  flex: 1;
}

.option-info h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.option-info p {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-small);
  line-height: 1.4;
}

.option-meta {
  display: flex;
  gap: var(--spacing-md);
}

.meta-item {
  font-size: var(--font-size-small);
  color: var(--text-tertiary);
}

/* 输出说明 */
.output-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: var(--border-radius-md);
  color: var(--success-color);
}

.info-icon {
  font-size: var(--font-size-large);
  flex-shrink: 0;
}

.info-text {
  font-size: var(--font-size-medium);
  line-height: 1.5;
}

.info-text strong {
  font-weight: 500;
}

@media (max-width: 768px) {
  .option-item {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .option-info {
    margin: var(--spacing-md) 0;
  }
  
  .option-meta {
    justify-content: center;
  }
  
  .output-info {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }
}
</style>