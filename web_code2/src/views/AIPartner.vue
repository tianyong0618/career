<template>
  <div class="ai-partner-view">
    <div class="container">

      
      <!-- AI对话组件 -->
      <AIChat />
      

    </div>
  </div>
</template>

<script setup>
import AIChat from '../components/AIChat.vue'
</script>

<style scoped>
.ai-partner-view {
  padding: 0 var(--spacing-md);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.page-header h2 {
  font-size: var(--font-size-2xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.page-header p {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

.usage-tips {
  margin-top: var(--spacing-lg);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.section-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.tip-icon {
  font-size: var(--font-size-lg);
  min-width: 24px;
  margin-top: -2px;
}

.tip-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tips-list {
    grid-template-columns: 1fr;
  }
}
</style>