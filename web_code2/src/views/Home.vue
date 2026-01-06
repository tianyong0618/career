<template>
  <div class="home-view">
    <!-- 顶部信息 -->
    <header class="header-section">
      <div class="header-left">
        <h1 class="header-title">欢迎回来，这是你的 <span class="blue-text">数字职业孪生</span></h1>
        <p class="header-subtitle">AI 已为你同步了昨日的 GitHub 贡献与领英互动数据。</p>
      </div>
      <button class="sync-btn">
        <i class="fas fa-sync-alt mr-2"></i> 同步最新数据
      </button>
    </header>

    <!-- 主内容网格 -->
    <div class="main-grid">
      <!-- 职业能力雷达图 -->
      <div class="radar-section glass-card">
        <h3 class="section-title">能力图谱 (Career Radar)</h3>
        <div class="chart-container">
          <RadarChart />
        </div>
        <div class="score-section">
          <div class="score-item">
            <p class="score-value">88</p>
            <p class="score-label">技术分</p>
          </div>
          <div class="score-item">
            <p class="score-value">72</p>
            <p class="score-label">商业感</p>
          </div>
          <div class="score-item">
            <p class="score-value">95</p>
            <p class="score-label">可靠性</p>
          </div>
        </div>
      </div>

      <!-- 职业路径沙盒 -->
      <div class="path-section glass-card">
        <div class="path-header">
          <h3 class="section-title">路径模拟：向 [架构师] 进发</h3>
          <span class="match-rate">匹配率 78%</span>
        </div>
        <!-- 模拟路径可视化 -->
        <div class="path-timeline">
          <div class="timeline-item">
            <div class="timeline-icon blue-icon"><i class="fas fa-check"></i></div>
            <div class="timeline-content">
              <p class="timeline-title">当前状态：资深全栈工程师</p>
              <div class="progress-bar">
                <div class="progress-fill blue-fill" style="width: 100%"></div>
              </div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon yellow-icon"><i class="fas fa-spinner fa-spin"></i></div>
            <div class="timeline-content">
              <p class="timeline-title yellow-text">挑战中：掌握分布式系统架构设计</p>
              <p class="timeline-subtitle">预计完成时间：14天后 | 推荐课程：DDIA实战</p>
              <div class="progress-bar">
                <div class="progress-fill yellow-fill" style="width: 45%"></div>
              </div>
            </div>
          </div>
          <div class="timeline-item disabled">
            <div class="timeline-icon gray-icon"><i class="fas fa-lock"></i></div>
            <div class="timeline-content">
              <p class="timeline-title">目标：CTO/技术合伙人</p>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 成长中心任务 -->
      <div class="tasks-section glass-card">
        <h3 class="section-title">
          <i class="fas fa-bolt yellow-text mr-2"></i> 今日推荐行动 (Growth Tasks)
        </h3>
        <div class="tasks-grid">
          <div class="task-card hover-neon">
            <p class="task-category blue-text">技能强化</p>
            <p class="task-title">在 GitHub 上提交 1 个 PR 修复开源项目漏洞</p>
            <p class="task-reward">+50 经验 | +12 技术分</p>
          </div>
          <div class="task-card hover-neon">
            <p class="task-category purple-text">人脉连接</p>
            <p class="task-title">与 3 位 Web3 领域的开发者建立深度联系</p>
            <p class="task-reward">+30 经验 | +20 社交智能</p>
          </div>
          <div class="task-card hover-neon">
            <p class="task-category green-text">价值变现</p>
            <p class="task-title">更新你的数字作品集，AI将自动推送给3个匹配岗位</p>
            <p class="task-reward">潜在收益提升: 15%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RadarChart from '../components/RadarChart.vue'
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
/* 主容器 */
.home-view {
  padding: 0;
}

/* 顶部信息 */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.blue-text {
  color: #38bdf8;
}

.header-subtitle {
  color: var(--text-secondary);
}

.sync-btn {
  background-color: var(--blue-600);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
}

.sync-btn:hover {
  background-color: var(--blue-500);
  transform: translateY(-1px);
}

/* 主内容网格 */
.main-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* 雷达图部分 */
.radar-section {
  grid-column: span 12;
  padding: 1.5rem;
  border-radius: 1.5rem;
}

@media (min-width: 1024px) {
  .radar-section {
    grid-column: span 5;
  }
}

/* 路径模拟部分 */
.path-section {
  grid-column: span 12;
  padding: 1.5rem;
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .path-section {
    grid-column: span 7;
  }
}

/* 任务部分 */
.tasks-section {
  grid-column: span 12;
  padding: 1.5rem;
  border-radius: 1.5rem;
}

/* 标题样式 */
.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

/* 图表容器 */
.chart-container {
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

/* 分数部分 */
.score-section {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 1rem;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.score-label {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* 路径头部 */
.path-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.match-rate {
  font-size: 0.875rem;
  background-color: rgba(82, 196, 26, 0.2);
  color: var(--green-400);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

/* 路径时间线 */
.path-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.timeline-item.disabled {
  opacity: 0.4;
}

.timeline-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  border: 2px solid;
}

.blue-icon {
  background-color: rgba(59, 130, 246, 0.2);
  border-color: var(--blue-500);
  color: var(--blue-500);
}

.yellow-icon {
  background-color: rgba(245, 158, 11, 0.2);
  border-color: var(--yellow-500);
  color: var(--yellow-500);
}

.gray-icon {
  background-color: rgba(107, 114, 128, 0.2);
  border-color: var(--border-color);
  color: var(--text-tertiary);
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.yellow-text {
  color: var(--yellow-500);
}

.timeline-subtitle {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: var(--bg-tertiary);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
}

.blue-fill {
  background-color: var(--blue-500);
  width: 100%;
}

.yellow-fill {
  background-color: var(--yellow-500);
  width: 45%;
}

/* 任务网格 */
.tasks-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .tasks-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.task-card {
  background-color: rgba(30, 41, 59, 0.5);
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hover-neon:hover {
  border: 1px solid #38bdf8;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
}

.task-category {
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.purple-text {
  color: var(--purple-400);
}

.green-text {
  color: var(--green-400);
}

.task-title {
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.task-reward {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}
</style>