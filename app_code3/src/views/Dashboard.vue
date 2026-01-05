<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userProfile } from '../data/mockData.js'

const router = useRouter()



// 跳转到对应页面
const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="dashboard">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>VenturePilot</h1>
    </header>
    
    <!-- 创业身份卡 -->
    <div class="card fade-in">
      <div class="profile-section">
        <div class="avatar">
          <img :src="userProfile.avatar" alt="创业者头像" />
        </div>
        <div class="profile-info">
          <h2>{{ userProfile.name }}</h2>
          <div class="tags">
            <span class="tag primary" v-for="tag in userProfile.tags" :key="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 当前里程碑 -->
    <div class="card fade-in">
      <div class="milestone">
        <h3>当前里程碑</h3>
        <ul>
          <li v-for="(item, index) in userProfile.currentMilestone" :key="index">
            ✅ {{ item }}
          </li>
        </ul>
      </div>
    </div>
    

    
    <!-- 创业进展条 -->
    <div class="card fade-in">
      <h3>{{ userProfile.mainGoal }}</h3>
      <div class="progress-section">
        <div class="progress-item" v-for="(item, index) in userProfile.progress" :key="index">
          <div class="progress-header">
            <span>{{ item.name }}</span>
            <span class="status" :class="item.completed ? 'completed' : 'pending'">
              {{ item.completed ? '已完成' : '未完成' }}
            </span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: item.completed ? '100%' : '0%' }"></div>
          </div>
        </div>
      </div>
      <div class="hint">
        <span class="warning-icon">⚠️</span>
        <span>{{ userProfile.hint }}</span>
      </div>
    </div>
    
    <!-- 快捷行动区 -->
    <div class="quick-actions">
      <h3>快捷行动</h3>
      <div class="actions-grid">
        <div 
          class="action-card" 
          @click="navigateTo('/biz-plan-gen')"
        >
          <div class="action-icon">📄</div>
          <h4 class="action-title">生成BP</h4>
          <p class="action-desc">快速生成商业计划书</p>
        </div>
        <div 
          class="action-card" 
          @click="navigateTo('/policy-match')"
        >
          <div class="action-icon">🏛️</div>
          <h4 class="action-title">政策匹配</h4>
          <p class="action-desc">查看可申报的补贴与优惠政策</p>
        </div>
        <div 
          class="action-card" 
          @click="navigateTo('/risk-alert')"
        >
          <div class="action-icon">⚠️</div>
          <h4 class="action-title">风险预警</h4>
          <p class="action-desc">实时监测并预警潜在风险</p>
        </div>
        <div 
          class="action-card" 
          @click="navigateTo('/resource-hub')"
        >
          <div class="action-icon">💼</div>
          <h4 class="action-title">资源撮合</h4>
          <p class="action-desc">寻找潜在合伙人、投资人或供应商</p>
        </div>
        <div 
          class="action-card" 
          @click="navigateTo('/financing-path')"
        >
          <div class="action-icon">💰</div>
          <h4 class="action-title">融资路径</h4>
          <p class="action-desc">规划融资路径和股权结构</p>
        </div>
        <div 
          class="action-card" 
          @click="navigateTo('/health-dashboard')"
        >
          <div class="action-icon">📊</div>
          <h4 class="action-title">健康度看板</h4>
          <p class="action-desc">查看创业健康度指标</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 420px;
  margin: 0 auto;
  padding: 80px 1rem 1rem;
}

/* 页面标题 */
.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
}



/* 创业身份卡 */
.profile-section {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  padding: 0.5rem 0;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--primary-color);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0 0 0.3rem 0;
  font-size: 1.2rem;
}

.tags {
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.milestone ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.milestone li {
  margin: 0 0 0.4rem 0;
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.4;
  text-align: left;
}

/* 创业进展条 */
.progress-section {
  margin-bottom: 0.8rem;
}

.progress-item {
  margin-bottom: 0.8rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
}

.status {
  font-size: 0.75rem;
  font-weight: 500;
}

.status.completed {
  color: var(--success-color);
}

.status.pending {
  color: var(--warning-color);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.hint {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  background-color: rgba(250, 173, 20, 0.1);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  color: var(--warning-color);
  margin-top: 0.5rem;
}

.warning-icon {
  font-size: 0.9rem;
}



/* 数据概览卡片 */
.stats-section {
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* AI导师入口 */
.ai-tutor-section {
  margin-bottom: 2rem;
}

.ai-tutor-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.ai-tutor-content:hover {
  transform: translateY(-1px);
}

.ai-icon {
  font-size: 2.5rem;
}

.ai-info {
  flex: 1;
}

.ai-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.arrow-icon {
  font-size: 1.5rem;
  color: var(--text-tertiary);
}

/* 快捷行动区 */
.quick-actions {
  margin: 1rem 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  gap: 0.5rem;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.action-title {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 600;
}

.action-desc {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.3;
}





/* 风险预警闪烁效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 风险卡片闪烁效果 */
.action-card:nth-child(3) {
  animation: pulse 2s infinite;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .milestone {
    text-align: left;
  }
  
  .achievement-animation {
    right: 0.5rem;
    left: 0.5rem;
  }
}
</style>