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
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* 页面标题 */
.page-header {
  grid-column: 1 / -1;
  margin-bottom: 0;
  position: static;
  transform: none;
  max-width: 100%;
  box-shadow: none;
  background-color: transparent;
  padding: 0;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  text-align: center;
}

/* 创业身份卡 */
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 0.5rem 0;
  text-align: center;
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
  justify-content: center;
}

.milestone {
  text-align: center;
}

.milestone ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  text-align: left;
  max-width: 300px;
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

/* 快捷行动区 */
.quick-actions {
  grid-column: 1 / -1;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 0.8rem 0.5rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: auto;
  grid-column: span 1;
  min-width: 200px;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}

.action-icon {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.action-title {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 500;
}

.action-desc {
  display: none;
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
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1025px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>