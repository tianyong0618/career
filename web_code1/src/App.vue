<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import IdentityCard from './components/IdentityCard.vue'
import RadarChart from './components/RadarChart.vue'
import SkillCloud from './components/SkillCloud.vue'
import GrowthProgress from './components/GrowthProgress.vue'
import PathSimulator from './components/PathSimulator.vue'
import ChatInterface from './components/ChatInterface.vue'
import GrowthHub from './components/GrowthHub.vue'
import OnboardingModule from './components/OnboardingModule.vue'

// 页面状态管理
const currentPage = ref('profile')

// 切换页面
const switchPage = (pageName) => {
  currentPage.value = pageName
}
</script>

<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <Navbar />
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 侧边栏 -->
      <Sidebar @switch-menu="switchPage" />
      
      <!-- 内容区域 -->
      <main class="content">
        <!-- 我的职业镜像页面 -->
        <div v-if="currentPage === 'profile'">
          <div class="page-header">
            <h2>我的职业镜像</h2>
            <p>一眼看清当前状态与潜力</p>
          </div>
          
          <!-- 职业身份卡 -->
          <IdentityCard />
          
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
          
          <!-- 冷启动模块 -->
          <OnboardingModule />
        </div>
        
        <!-- 路径沙盒页面 -->
        <div v-else-if="currentPage === 'path'">
          <div class="page-header">
            <h2>路径沙盒</h2>
            <p>让用户"试错人生"，降低决策焦虑</p>
          </div>
          
          <!-- 路径模拟器 -->
          <PathSimulator />
        </div>
        
        <!-- AI合伙人页面 -->
        <div v-else-if="currentPage === 'ai'">
          <div class="page-header">
            <h2>AI 合伙人</h2>
            <p>7×24 小时职业顾问，替代传统客服</p>
          </div>
          
          <!-- 对话界面 -->
          <ChatInterface />
        </div>
        
        <!-- 成长中心页面 -->
        <div v-else-if="currentPage === 'growth'">
          <div class="page-header">
            <h2>成长中心</h2>
            <p>将“推演”转化为“行动”</p>
          </div>
          
          <!-- 成长中心 -->
          <GrowthHub />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: var(--spacing-xl);
  overflow-y: auto;
  background-color: var(--bg-color);
}

.page-header {
  margin-bottom: var(--spacing-xl);
}

.page-header h2 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-xlarge);
}

.page-header p {
  color: var(--text-secondary);
  font-size: var(--font-size-medium);
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.grid-item {
  width: 100%;
}

@media (max-width: 768px) {
  .content {
    padding: var(--spacing-md);
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .page-header h2 {
    font-size: var(--font-size-large);
  }
}
</style>
