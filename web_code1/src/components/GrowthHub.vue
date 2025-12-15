<script setup>
// 成长中心-行动执行场组件
import { ref } from 'vue'

// 标签页状态管理
const activeTab = ref('learning')

const switchTab = (tabName) => {
  activeTab.value = tabName
}
</script>

<template>
  <div class="growth-hub-card card">
    <div class="card-header">
      <h3>成长中心：行动执行场</h3>
      <p>将“推演”转化为“行动”</p>
    </div>
    <div class="card-content">
      <!-- 标签页导航 -->
      <div class="tabs-nav">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'learning' }" 
          @click="switchTab('learning')"
        >
          学习
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'tasks' }" 
          @click="switchTab('tasks')"
        >
          任务
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'achievements' }" 
          @click="switchTab('achievements')"
        >
          成就
        </button>
      </div>
      
      <!-- 标签页内容 -->
      <div class="tabs-content">
        <!-- 学习模块 -->
        <div 
          class="tab-panel" 
          :class="{ active: activeTab === 'learning' }" 
          id="learning"
        >
          <div class="panel-header">
            <h4>个性化课程包</h4>
            <a href="#" class="view-all">查看全部</a>
          </div>
          <div class="course-list">
            <div class="course-item">
              <div class="course-icon">📚</div>
              <div class="course-info">
                <h5>30天成为数据分析师</h5>
                <p>超级学院平台</p>
                <div class="course-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 60%"></div>
                  </div>
                  <span class="progress-text">60%</span>
                </div>
              </div>
              <button class="btn-primary">继续学习</button>
            </div>
            
            <div class="course-item">
              <div class="course-icon">🤖</div>
              <div class="course-info">
                <h5>AI提示工程实战</h5>
                <p>超级学院平台</p>
                <div class="course-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 25%"></div>
                  </div>
                  <span class="progress-text">25%</span>
                </div>
              </div>
              <button class="btn-primary">继续学习</button>
            </div>
          </div>
        </div>
        
        <!-- 任务模块 -->
        <div 
          class="tab-panel" 
          :class="{ active: activeTab === 'tasks' }" 
          id="tasks"
        >
          <div class="panel-header">
            <h4>企业真实微任务</h4>
            <a href="#" class="view-all">查看全部</a>
          </div>
          <div class="task-list">
            <div class="task-item">
              <div class="task-icon">💼</div>
              <div class="task-info">
                <h5>标注医疗文本</h5>
                <p>合作企业：某医疗科技公司</p>
                <div class="task-reward">
                  <span class="reward-text">奖励：¥100</span>
                  <span class="reward-badge">技能提升：数据标注</span>
                </div>
              </div>
              <button class="btn-secondary">立即参与</button>
            </div>
            
            <div class="task-item">
              <div class="task-icon">📊</div>
              <div class="task-info">
                <h5>数据分析报告撰写</h5>
                <p>合作企业：某电商平台</p>
                <div class="task-reward">
                  <span class="reward-text">奖励：¥200</span>
                  <span class="reward-badge">技能提升：数据分析</span>
                </div>
              </div>
              <button class="btn-secondary">立即参与</button>
            </div>
          </div>
        </div>
        
        <!-- 成就模块 -->
        <div 
          class="tab-panel" 
          :class="{ active: activeTab === 'achievements' }" 
          id="achievements"
        >
          <div class="panel-header">
            <h4>我的成就</h4>
            <a href="#" class="view-all">查看全部</a>
          </div>
          <div class="achievements-grid">
            <div class="achievement-item">
              <div class="achievement-icon">🏆</div>
              <h5>初级数据分析师</h5>
              <p>已获证书</p>
            </div>
            
            <div class="achievement-item">
              <div class="achievement-icon">📋</div>
              <h5>Python基础实战</h5>
              <p>完成项目</p>
            </div>
            
            <div class="achievement-item">
              <div class="achievement-icon">🌟</div>
              <h5>数据分析技能</h5>
              <p>技能徽章</p>
            </div>
            
            <div class="achievement-item">
              <div class="achievement-icon">🏆</div>
              <h5>SQL数据分析</h5>
              <p>已获证书</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.growth-hub-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-large);
}

.card-header p {
  margin: var(--spacing-xs) 0 0 0;
  color: var(--text-secondary);
  font-size: var(--font-size-medium);
}

/* 标签页导航 */
.tabs-nav {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--spacing-xl);
}

.tab-btn {
  background: none;
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-medium);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  color: var(--primary-color);
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

/* 标签页内容 */
.tabs-content {
  position: relative;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
  animation: fadeIn var(--transition-normal) ease-out;
}

/* 面板头部 */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.panel-header h4 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.view-all {
  color: var(--primary-color);
  font-size: var(--font-size-small);
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

/* 课程列表 */
.course-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.course-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  background-color: #fafafa;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.course-item:hover {
  box-shadow: var(--shadow-sm);
  border-color: var(--primary-color);
}

.course-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-md);
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xlarge);
  flex-shrink: 0;
}

.course-info {
  flex: 1;
}

.course-info h5 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.course-info p {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-small);
}

.course-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.course-progress .progress-bar {
  flex: 1;
  height: 8px;
  background-color: var(--bg-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.course-progress .progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-lg);
}

.progress-text {
  font-size: var(--font-size-small);
  color: var(--text-secondary);
  font-weight: 500;
}

/* 任务列表 */
.task-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.task-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  background-color: #fafafa;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.task-item:hover {
  box-shadow: var(--shadow-sm);
  border-color: var(--secondary-color);
}

.task-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-md);
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xlarge);
  flex-shrink: 0;
}

.task-info {
  flex: 1;
}

.task-info h5 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.task-info p {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-small);
}

.task-reward {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.reward-text {
  font-size: var(--font-size-small);
  font-weight: 500;
  color: var(--success-color);
}

.reward-badge {
  font-size: var(--font-size-small);
  background-color: #f6ffed;
  color: var(--success-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

/* 成就网格 */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.achievement-item {
  background-color: #fafafa;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all var(--transition-fast);
}

.achievement-item:hover {
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.achievement-icon {
  font-size: var(--font-size-xlarge);
  margin-bottom: var(--spacing-md);
}

.achievement-item h5 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.achievement-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-small);
}

@media (max-width: 768px) {
  .tabs-nav {
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .tab-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-small);
  }
  
  .course-item,
  .task-item {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .course-progress {
    margin-bottom: var(--spacing-md);
  }
  
  .achievements-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>