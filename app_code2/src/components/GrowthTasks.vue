<template>
  <div class="growth-tasks card">
    <div class="card-header">
      <h3>今日推荐行动 (Growth Tasks)</h3>
    </div>
    <div class="card-content">
      <div class="tasks-container">
        <!-- 技能强化 -->
        <div class="task-card skill-enhancement" @click="handleTaskClick('skill')">
          <div class="task-header">
            <div class="task-icon">⚡</div>
            <h4>技能强化</h4>
            <div class="task-arrow">→</div>
          </div>
          <div class="task-body">
            <p class="task-description">在 GitHub 上提交 1 个 PR 修复开源项目漏洞</p>
            <div class="task-rewards">
              <span class="reward">+50 经验</span>
              <span class="reward">+12 技术分</span>
            </div>
          </div>
        </div>
        
        <!-- 人脉连接 -->
        <div class="task-card network-connection" @click="handleTaskClick('network')">
          <div class="task-header">
            <div class="task-icon">🤝</div>
            <h4>人脉连接</h4>
            <div class="task-arrow">→</div>
          </div>
          <div class="task-body">
            <p class="task-description">与 3 位 Web3 领域的开发者建立深度联系</p>
            <div class="task-rewards">
              <span class="reward">+30 经验</span>
              <span class="reward">+20 社交智能</span>
            </div>
          </div>
        </div>
        
        <!-- 价值变现 -->
        <div class="task-card value-realization" @click="handleTaskClick('value')">
          <div class="task-header">
            <div class="task-icon">💰</div>
            <h4>价值变现</h4>
            <div class="task-arrow">→</div>
          </div>
          <div class="task-body">
            <p class="task-description">更新你的数字作品集，AI将自动推送给3个匹配岗位</p>
            <div class="task-rewards">
              <span class="reward">潜在收益提升: 15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 处理任务点击
const handleTaskClick = (taskType) => {
  // 这里可以添加任务点击的处理逻辑
  console.log('点击了任务:', taskType)
  // 例如导航到任务详情页或触发任务开始
}
</script>

<style scoped>
.growth-tasks {
  margin-bottom: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.card-header h3::before {
  content: "⚡";
  font-size: var(--font-size-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--radius-md);
}

.tasks-container {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.task-card {
  flex: 1;
  min-width: 280px;
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  user-select: none;
  touch-action: manipulation;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.task-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

/* 点击反馈效果 */
.task-card:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

/* 不同类型任务卡的边框颜色 */
.skill-enhancement::before {
  background-color: var(--primary-color);
}

.network-connection::before {
  background-color: #8b5cf6;
}

.value-realization::before {
  background-color: var(--success-color);
}

.task-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
}

.task-icon {
  font-size: var(--font-size-xl);
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.task-header h4 {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.skill-enhancement .task-header h4 {
  color: var(--primary-color);
}

.network-connection .task-header h4 {
  color: #8b5cf6;
}

.value-realization .task-header h4 {
  color: var(--success-color);
}

.task-arrow {
  font-size: var(--font-size-xl);
  font-weight: bold;
  opacity: 0.6;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
}

.task-card:hover .task-arrow {
  transform: translateX(4px);
  opacity: 1;
  color: var(--primary-color);
}

.task-body {
  flex: 1;
}

.task-description {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  line-height: 1.5;
  font-weight: 400;
}

.task-rewards {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.reward {
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full, 9999px);
  background-color: var(--bg-tertiary);
  transition: all var(--transition-fast);
}

.task-card:hover .reward {
  transform: translateY(-1px);
}

.skill-enhancement .reward {
  color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.15);
  border: 1px solid rgba(24, 144, 255, 0.2);
}

.network-connection .reward {
  color: #8b5cf6;
  background-color: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.value-realization .reward {
  color: var(--success-color);
  background-color: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .growth-tasks {
    padding: var(--spacing-lg);
  }
  
  .card-header h3 {
    font-size: var(--font-size-lg);
  }
  
  .card-header h3::before {
    width: 28px;
    height: 28px;
    font-size: var(--font-size-md);
  }
  
  .tasks-container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .task-card {
    min-width: auto;
    padding: var(--spacing-md);
  }
  
  .task-icon {
    font-size: var(--font-size-lg);
    min-width: 32px;
    height: 32px;
  }
  
  .task-header h4 {
    font-size: var(--font-size-md);
  }
  
  .task-description {
    font-size: var(--font-size-sm);
    line-height: 1.3;
    margin-bottom: var(--spacing-sm);
  }
  
  .task-rewards {
    gap: var(--spacing-xs);
  }
  
  .reward {
    font-size: var(--font-size-xs);
    padding: 2px 8px;
  }
}
</style>