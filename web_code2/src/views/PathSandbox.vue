<template>
  <div class="path-sandbox-view">
    <div class="full-width-container">
      <div class="page-header">
        <h1 class="page-title">职业路径沙盒 <span class="title-highlight purple">Path Sandbox</span></h1>
        <p class="page-subtitle">模拟未来的1000种可能性</p>
      </div>
      
      <!-- 路径生成器（目标设定） -->
      <div class="goal-section">
        <PathGenerator ref="pathGeneratorRef" />
      </div>
      
      <!-- 路径对比提示 -->
      <div class="comparison-tip" v-if="!showComparison && showPaths">
        <div class="tip-icon">💡</div>
        <div class="tip-content">
          <h4 class="tip-title">提示</h4>
          <p class="tip-text">选择任意两条路径进行对比，了解它们的差异和成功率</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import PathGenerator from '../components/PathGenerator.vue'

const pathGeneratorRef = ref(null)
const showComparison = ref(false)

// 定期获取显示状态
setInterval(() => {
  if (pathGeneratorRef.value && typeof pathGeneratorRef.value.getShowStatus === 'function') {
    const status = pathGeneratorRef.value.getShowStatus()
    showComparison.value = status.showComparison || false
  }
}, 1000)
</script>

<style scoped>
/* 页面标题 */
.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #1e293b;
  text-align: left;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #f8fafc;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.title-highlight {
  font-weight: bold;
}

.title-highlight.purple {
  color: #a78bfa;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #94a3b8;
  margin: 0;
}

/* 响应式标题 */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
}

/* 添加布局样式 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

.path-generator-section,
.knowledge-graph-section {
  width: 100%;
}

.path-sandbox-view {
  padding: var(--spacing-lg);
}

.full-width-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.comparison-tip {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: rgba(24, 144, 255, 0.1);
  border: 1px solid rgba(24, 144, 255, 0.2);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
}

.tip-icon {
  font-size: var(--font-size-xl);
  min-width: 24px;
  margin-top: -2px;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: var(--font-size-lg);
  color: var(--primary-color);
  margin: 0 0 var(--spacing-xs) 0;
}

.tip-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}
</style>