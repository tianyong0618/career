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
      

    </div>
  </div>
</template>

<script setup>
import CareerIdentityCard from '../components/CareerIdentityCard.vue'
import RadarChart from '../components/RadarChart.vue'
import SkillCloud from '../components/SkillCloud.vue'
import GrowthProgress from '../components/GrowthProgress.vue'
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

.section-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-grid {
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