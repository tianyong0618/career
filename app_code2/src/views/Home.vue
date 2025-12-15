<template>
  <div class="home-container">
    <div class="container">
      <!-- 欢迎区域 -->
      <section class="welcome-section">
        <div class="welcome-card">
          <h2 class="welcome-title">欢迎回来！</h2>
          <p class="welcome-subtitle">让我们继续你的职业成长之旅</p>
        </div>
      </section>

      <!-- 职业镜像概览 -->
      <section class="overview-section">
        <h3 class="section-title">职业镜像概览</h3>
        <div class="overview-cards">
          <!-- 成长进度卡片 -->
          <div class="overview-card">
            <div class="card-header">
              <div class="card-icon">📈</div>
              <h4 class="card-title">成长进度</h4>
            </div>
            <div class="card-content">
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: '65%' }"></div>
                </div>
                <span class="progress-text">65%</span>
              </div>
              <p class="progress-desc">已完成13/20个成长任务</p>
            </div>
          </div>

          <!-- 技能评分卡片 -->
          <div class="overview-card">
            <div class="card-header">
              <div class="card-icon">🎯</div>
              <h4 class="card-title">技能评分</h4>
            </div>
            <div class="card-content">
              <div class="skill-score">85</div>
              <p class="skill-desc">基于最近评估的综合评分</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 推荐内容 -->
      <section class="recommendations-section">
        <h3 class="section-title">为你推荐</h3>
        <div class="recommendation-list">
          <!-- 推荐课程 -->
          <div class="recommendation-card">
            <div class="card-icon-large">📚</div>
            <div class="card-info">
              <h4 class="card-title">数据分析进阶课程</h4>
              <p class="card-desc">提升你的数据分析能力，掌握SQL高级技巧</p>
              <div class="card-meta">
                <span class="meta-tag">推荐</span>
                <span class="meta-time">4周课程</span>
              </div>
            </div>
            <button class="card-btn">查看</button>
          </div>

          <!-- 推荐任务 -->
          <div class="recommendation-card">
            <div class="card-icon-large">✅</div>
            <div class="card-info">
              <h4 class="card-title">完成职业倾向评估</h4>
              <p class="card-desc">了解你的职业偏好，获得个性化建议</p>
              <div class="card-meta">
                <span class="meta-tag">任务</span>
                <span class="meta-time">15分钟</span>
              </div>
            </div>
            <button class="card-btn primary">开始</button>
          </div>
        </div>
      </section>

      <!-- 最近活动 -->
      <section class="activity-section">
        <h3 class="section-title">最近活动</h3>
        <div class="activity-list">
          <div class="activity-item" v-for="(activity, index) in activities" :key="index">
            <div class="activity-icon">{{ activity.icon }}</div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟活动数据
const activities = ref([
  { icon: '🎯', title: '完成了"数据分析基础"课程', time: '2小时前' },
  { icon: '💡', title: '获得了新的学习建议', time: '1天前' },
  { icon: '📊', title: '更新了职业档案', time: '2天前' },
  { icon: '🤝', title: '与AI合伙人进行了职业咨询', time: '3天前' }
])
</script>

<style scoped>
.home-container {
  padding: var(--spacing-lg) 0;
}

/* 欢迎区域 */
.welcome-section {
  margin-bottom: var(--spacing-xl);
}

.welcome-card {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
}

.welcome-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xs);
  color: white;
}

.welcome-subtitle {
  font-size: var(--font-size-md);
  opacity: 0.9;
  margin: 0;
}

/* 概览区域 */
.overview-section {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.overview-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.overview-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.overview-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.card-icon {
  font-size: var(--font-size-xl);
}

.card-title {
  font-size: var(--font-size-md);
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* 进度条样式 */
.progress-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
}

.progress-text {
  font-weight: 600;
  color: var(--text-primary);
  min-width: 40px;
  text-align: right;
}

.progress-desc, .skill-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* 技能评分样式 */
.skill-score {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

/* 推荐内容 */
.recommendations-section {
  margin-bottom: var(--spacing-xl);
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.recommendation-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.recommendation-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.card-icon-large {
  font-size: var(--font-size-2xl);
  min-width: 48px;
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.card-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.card-meta {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
}

.meta-tag {
  background-color: var(--bg-secondary);
  color: var(--text-tertiary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.meta-time {
  color: var(--text-tertiary);
  font-size: var(--font-size-xs);
}

.card-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.card-btn.primary {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.card-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 最近活动 */
.activity-section {
  margin-bottom: var(--spacing-xl);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.activity-item:hover {
  background-color: var(--bg-secondary);
}

.activity-icon {
  font-size: var(--font-size-lg);
  margin-top: 2px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.activity-time {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .home-container {
    padding-bottom: 80px;
  }
  
  .welcome-title {
    font-size: var(--font-size-xl);
  }
  
  .section-title {
    font-size: var(--font-size-lg);
  }
  
  .overview-cards {
    grid-template-columns: 1fr;
  }
  
  .recommendation-card {
    padding: var(--spacing-md);
  }
  
  .card-icon-large {
    font-size: var(--font-size-xl);
  }
}
</style>