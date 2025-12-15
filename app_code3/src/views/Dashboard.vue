<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userProfile } from '../data/mockData.js'

const router = useRouter()

// 快捷行动按钮配置
const quickActions = [
  {
    icon: '📄',
    title: '生成BP',
    description: '快速生成商业计划书',
    path: '/biz-plan-gen'
  },
  {
    icon: '🏛️',
    title: '政策匹配',
    description: '查看可申报的补贴与优惠政策',
    path: '/policy-match'
  },
  {
    icon: '⚠️',
    title: '风险预警',
    description: '实时监测并预警潜在风险',
    path: '/risk-alert'
  },
  {
    icon: '💼',
    title: '资源撮合',
    description: '寻找潜在合伙人、投资人或供应商',
    path: '/resource-hub'
  }
]

// 成就+1动画
const showAchievement = ref(false)
const achievementCount = ref(0)

// 跳转到对应页面
const navigateTo = (path) => {
  router.push(path)
  
  // 触发成就+1动画
  showAchievement.value = true
  achievementCount.value++
  setTimeout(() => {
    showAchievement.value = false
  }, 1500)
}
</script>

<template>
  <div class="dashboard">
    <!-- 成就+1动画 -->
    <div class="achievement-animation" v-if="showAchievement">
      <div class="achievement-content">
        <span class="achievement-icon">🏆</span>
        <span class="achievement-text">成就+{{ achievementCount }}</span>
      </div>
    </div>
    
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>我的创业概况</h1>
      <button class="secondary" @click="navigateTo('/ai-tutor')">
        🤖 AI导师
      </button>
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
          <div class="milestone">
            <h3>当前里程碑</h3>
            <ul>
              <li v-for="(item, index) in userProfile.currentMilestone" :key="index">
                ✅ {{ item }}
              </li>
            </ul>
          </div>
        </div>
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
          v-for="action in quickActions" 
          :key="action.title"
          @click="navigateTo(action.path)"
        >
          <div class="action-icon">{{ action.icon }}</div>
          <h4 class="action-title">{{ action.title }}</h4>
          <p class="action-desc">{{ action.description }}</p>
        </div>
      </div>
    </div>
    
    <!-- 数据概览卡片 -->
    <div class="stats-section">
      <div class="card fade-in">
        <h3>创业数据概览</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">5</div>
            <div class="stat-label">匹配政策</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">3</div>
            <div class="stat-label">潜在风险</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">8</div>
            <div class="stat-label">可联系资源</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">1</div>
            <div class="stat-label">完成BP</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- AI导师入口 -->
    <div class="ai-tutor-section">
      <div class="card fade-in" @click="navigateTo('/ai-tutor')">
        <div class="ai-tutor-content">
          <div class="ai-icon">🤖</div>
          <div class="ai-info">
            <h3>AI创业导师</h3>
            <p>7×24小时在线，随时为您解答创业疑问</p>
          </div>
          <div class="arrow-icon">→</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 页面标题 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

/* 创业身份卡 */
.profile-section {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
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
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.tags {
  margin-bottom: 1rem;
}

.milestone h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.milestone ul {
  list-style: none;
  padding: 0;
}

.milestone li {
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  color: var(--text-primary);
}

/* 创业进展条 */
.progress-section {
  margin-bottom: 1rem;
}

.progress-item {
  margin-bottom: 1rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.status {
  font-size: 0.8rem;
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
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background-color: rgba(250, 173, 20, 0.1);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--warning-color);
}

.warning-icon {
  font-size: 1rem;
}

/* 快捷行动区 */
.quick-actions {
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  border: 1px solid var(--border-color);
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.action-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.action-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
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

.ai-info h3 {
  margin: 0 0 0.3rem 0;
  font-size: 1.1rem;
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

/* 成就+1动画 */
.achievement-animation {
  position: fixed;
  top: 20%;
  right: 1rem;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.achievement-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--success-color));
  color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  animation: bounce 0.6s ease-in-out;
}

.achievement-icon {
  font-size: 1.5rem;
}

.achievement-text {
  font-size: 1.2rem;
  font-weight: 600;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
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
    grid-template-columns: 1fr;
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
    text-align: center;
  }
  
  .achievement-animation {
    right: 0.5rem;
    left: 0.5rem;
  }
}
</style>