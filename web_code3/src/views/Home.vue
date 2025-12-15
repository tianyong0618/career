<script setup>
// 引入模拟数据
import { mockData } from '../mock/data';

// 引入组件
import StartupCard from '../components/StartupCard.vue';
import ProgressBar from '../components/ProgressBar.vue';
import QuickActions from '../components/QuickActions.vue';
</script>

<template>
  <div class="home-page">
    <!-- 页面标题 -->
    <h1 class="page-title">我的创业概况</h1>
    
    <!-- 创业身份卡 -->
    <StartupCard :profile="mockData.startupProfile" />
    
    <!-- 主要内容区域 -->
    <div class="content-grid">
      <!-- 左侧：创业进展 -->
      <div class="left-column">
        <ProgressBar :progress="mockData.startupProfile.progress" />
      </div>
      
      <!-- 右侧：快捷行动 -->
      <div class="right-column">
        <QuickActions />
      </div>
    </div>
    
    <!-- 底部：系统提示 -->
    <div class="system-tips">
      <div class="tip-card">
        <span class="tip-icon">🤖</span>
        <div class="tip-content">
          <h4 class="tip-title">AI创业导师提醒</h4>
          <p class="tip-text">您的商业计划书需要完善财务预测部分，建议使用商业计划书生成器进行优化。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.left-column {
  display: flex;
  flex-direction: column;
}

.right-column {
  display: flex;
  flex-direction: column;
}

.system-tips {
  margin-top: 24px;
}

.tip-card {
  background-color: rgba(24, 144, 255, 0.05);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-left: 4px solid var(--primary-blue);
}

.tip-icon {
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.tip-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .tip-card {
    padding: 16px;
  }
}
</style>