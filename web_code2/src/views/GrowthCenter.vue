<template>
  <div class="growth-center-view">
    <div class="container">
      <div class="page-header">
        <h2>成长中心</h2>
        <p>将“推演”转化为“真实行动”，形成正循环</p>
      </div>
      
      <!-- 当前激活路径展示 -->
      <div v-if="currentPath" class="current-path-section">
        <div class="current-path-card">
          <div class="path-header">
            <div class="path-info">
              <h3 class="path-title">当前路径：{{ currentPath.title }}</h3>
              <div class="path-meta">
                <span class="path-meta-item">
                  <span class="meta-icon">📅</span>
                  <span class="meta-text">开始时间：{{ formatDate(currentPath.startTime) }}</span>
                </span>
                <span class="path-meta-item">
                  <span class="meta-icon">🎯</span>
                  <span class="meta-text">目标：{{ currentPath.title }}</span>
                </span>
              </div>
            </div>
            <div class="path-progress">
              <div class="progress-info">
                <span class="progress-label">完成进度</span>
                <span class="progress-value">{{ pathProgress }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: pathProgress + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 成长任务组件 -->
      <GrowthTasks />
      
      <!-- 成长数据概览 -->
      <div class="growth-stats-section">
        <h3 class="section-title">成长数据概览</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <div class="stat-value">3</div>
              <div class="stat-label">正在学习的课程</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <div class="stat-value">5</div>
              <div class="stat-label">已完成的任务</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-value">3</div>
              <div class="stat-label">获得的成就</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-content">
              <div class="stat-value">67%</div>
              <div class="stat-label">目标完成度</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 成就墙 -->
      <div class="achievement-wall">
        <h3 class="section-title">成就墙</h3>
        <div class="achievements-showcase">
          <div class="achievement-item" v-for="i in 6">
            <div class="achievement-badge">🏅</div>
            <div class="achievement-name">成长先锋{{ i }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GrowthTasks from '../components/GrowthTasks.vue'

// 当前激活的路径信息
const currentPath = ref(null)
// 路径完成进度（模拟数据）
const pathProgress = ref(10)

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 组件挂载时从localStorage读取当前路径
onMounted(() => {
  const storedPath = localStorage.getItem('currentPath')
  if (storedPath) {
    currentPath.value = JSON.parse(storedPath)
    // 模拟计算进度（实际应该从任务完成情况计算）
    pathProgress.value = 10 // 初始进度为10%
  }
})
</script>

<style scoped>
.growth-center-view {
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

/* 当前激活路径样式 */
.current-path-section {
  margin-bottom: var(--spacing-xl);
}

.current-path-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.current-path-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.path-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.path-info {
  flex: 1;
  min-width: 300px;
}

.path-title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-xl);
  color: var(--primary-color);
}

.path-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.path-meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.meta-icon {
  font-size: var(--font-size-md);
}

.meta-text {
  color: var(--text-primary);
}

.path-progress {
  flex: 0 0 300px;
  text-align: center;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.progress-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.progress-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--primary-color);
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
}

.growth-stats-section {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  font-size: var(--font-size-2xl);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.achievement-wall {
  margin-bottom: var(--spacing-xl);
}

.achievements-showcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-lg);
}

.achievement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.achievement-badge {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-xs);
}

.achievement-name {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .achievements-showcase {
    gap: var(--spacing-md);
  }
}
</style>