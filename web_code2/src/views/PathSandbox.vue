<template>
  <div class="path-sandbox-view">
    <div class="container">
      <div class="page-header">
        <h2>路径沙盒</h2>
        <p>安全试错人生，降低重大决策焦虑</p>
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