<template>
  <div class="home-view">
    <div class="container">
      <div class="page-header">
        <h2>我的职业镜像</h2>
        <p>一眼看清当前状态与潜力</p>
      </div>
      
      <!-- 职业身份卡 -->
      <CareerIdentityCard />
      
      <!-- 雷达图和技能云图 -->
      <div class="content-grid">
        <div class="grid-item">
          <RadarChart />
        </div>
        <div class="grid-item">
          <SkillCloud />
        </div>
      </div>
      
      <!-- 成长进度 -->
      <GrowthProgress />
      
      <!-- 今日推荐 -->
      <div class="recommendations-section">
        <h3 class="section-title">今日推荐</h3>
        <div class="recommendations-list">
          <div 
            class="recommendation-card" 
            v-for="item in todayRecommendations" 
            :key="item.id"
          >
            <div class="recommendation-content">
              <div class="recommendation-header">
                <h4 class="recommendation-title">{{ item.title }}</h4>
                <div class="recommendation-type" :class="item.priority">
                  {{ item.type }}
                </div>
              </div>
              <p class="recommendation-description">{{ item.description }}</p>
            </div>
            <button 
              class="recommendation-action-btn"
              @click="handleRecommendationClick(item)"
              :aria-label="'查看' + item.title"
            >
              立即查看
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CareerIdentityCard from '../components/CareerIdentityCard.vue'
import RadarChart from '../components/RadarChart.vue'
import SkillCloud from '../components/SkillCloud.vue'
import GrowthProgress from '../components/GrowthProgress.vue'
import { todayRecommendations } from '../assets/mock/data'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

// 页面加载时检查是否已生成用户镜像
onMounted(() => {
  // 检查是否已完成onboarding和生成用户镜像
  const onboardingCompleted = localStorage.getItem('onboardingCompleted')
  const userProfile = localStorage.getItem('userProfile')
  
  // 如果没有完成onboarding或没有生成用户镜像，默认进入onboarding
  if (!onboardingCompleted || !userProfile) {
    router.push('/onboarding')
  }
})

// 处理推荐项点击事件
const handleRecommendationClick = (item) => {
  if (item.link && item.link.startsWith('/')) {
    router.push(item.link)
  } else {
    // 处理其他类型的链接或显示提示
    alert(`正在跳转到: ${item.title}`)
  }
}
</script>

<style scoped>
.home-view {
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.recommendations-section {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.recommendations-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.recommendation-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: all var(--transition-fast);
}

.recommendation-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xs);
}

.recommendation-title {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  margin: 0;
  flex: 1;
  margin-right: var(--spacing-md);
}

.recommendation-type {
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full, 9999px);
  white-space: nowrap;
}

.recommendation-type.高 {
  background-color: rgba(245, 34, 45, 0.1);
  color: var(--error-color);
}

.recommendation-type.中 {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--warning-color);
}

.recommendation-type.低 {
  background-color: rgba(82, 196, 26, 0.1);
  color: var(--success-color);
}

.recommendation-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.recommendation-action-btn {
  align-self: flex-start;
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.recommendation-action-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .recommendations-list {
    grid-template-columns: 1fr;
  }
  
  .page-header h2 {
    font-size: var(--font-size-xl);
  }
  
  .section-title {
    font-size: var(--font-size-lg);
  }
}
</style>