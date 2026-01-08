<template>
  <div class="path-simulator card">
    <div class="card-content">
      <!-- 路径模拟展示 -->
      <div class="simulation-container">
        <div class="simulation-header">
          <h3 class="simulation-title">路径模拟：向 [{{ targetCareer }}] 进发</h3>
          <div class="match-rate">
            匹配率 {{ matchRate }}%
          </div>
        </div>
        
        <!-- 路径状态 -->
        <div class="path-statuses">
          <!-- 当前状态 -->
          <div class="status-item current">
            <div class="status-icon">
              <span class="icon">✅</span>
            </div>
            <div class="status-content">
              <div class="status-main">
                <span class="status-title">当前状态：</span>
                <span class="status-value">{{ currentStatus }}</span>
              </div>
              <div class="status-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 100%;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 挑战中 -->
          <div class="status-item challenging">
            <div class="status-icon">
              <span class="icon">⏳</span>
            </div>
            <div class="status-content">
              <div class="status-main">
                <span class="status-title">挑战中：</span>
                <span class="status-value">{{ currentChallenge }}</span>
              </div>
              <div class="challenge-info">
                预计完成时间：{{ estimatedCompletionTime }} | 推荐课程：{{ recommendedCourse }}
              </div>
              <div class="status-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: challengeProgress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 目标 -->
          <div class="status-item target">
            <div class="status-icon">
              <span class="icon">🔒</span>
            </div>
            <div class="status-content">
              <div class="status-main">
                <span class="status-title">目标：</span>
                <span class="status-value">{{ finalGoal }}</span>
              </div>
              <div class="status-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 0%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟数据
const targetCareer = ref('架构师')
const matchRate = ref(78)
const currentStatus = ref('资深全栈工程师')
const currentChallenge = ref('掌握分布式系统架构设计')
const estimatedCompletionTime = ref('14天后')
const recommendedCourse = ref('DDIA实战')
const challengeProgress = ref(65)
const finalGoal = ref('CTO/技术合伙人')

// 开始挑战
const startChallenge = () => {
  console.log('开始挑战:', currentChallenge.value)
  // 跳转到成长中心或相关页面
  router.push('/growth-center')
}
</script>

<style scoped>
.path-simulator {
  margin-bottom: var(--spacing-lg);
}

.simulation-container {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.simulation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.simulation-title {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.match-rate {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--success-color);
  border-radius: var(--radius-full, 9999px);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: white;
}

.path-statuses {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.status-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.status-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 2px;
}

.status-item.current .status-icon {
  background-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.2);
}

.status-item.challenging .status-icon {
  background-color: var(--warning-color);
  box-shadow: 0 0 0 4px rgba(250, 173, 20, 0.2);
}

.status-item.target .status-icon {
  background-color: var(--text-secondary);
  box-shadow: 0 0 0 4px rgba(148, 163, 184, 0.2);
}

.icon {
  font-size: var(--font-size-lg);
  color: white;
}

.status-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.status-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.status-item.current .status-title,
.status-item.target .status-title {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-primary);
}

.status-item.challenging .status-title {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--warning-color);
}

.status-item.current .status-value,
.status-item.target .status-value {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
}

.status-item.challenging .status-value {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--warning-color);
}

.challenge-info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-left: 0;
}

.status-progress {
  width: 100%;
  margin-top: var(--spacing-xs);
}

.progress-bar {
  height: 8px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.status-item.current .progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--radius-full, 9999px);
  transition: width var(--transition-normal);
}

.status-item.challenging .progress-fill {
  height: 100%;
  background-color: var(--warning-color);
  border-radius: var(--radius-full, 9999px);
  transition: width var(--transition-normal);
}

.status-item.target .progress-fill {
  height: 100%;
  background-color: var(--text-secondary);
  border-radius: var(--radius-full, 9999px);
  transition: width var(--transition-normal);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .simulation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .match-rate {
    align-self: flex-start;
  }
  
  .status-icon {
    width: 40px;
    height: 40px;
  }
  
  .status-main {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
  
  .status-title {
    font-size: var(--font-size-sm);
  }
  
  .status-value {
    font-size: var(--font-size-sm);
  }
  
  .challenge-info {
    font-size: var(--font-size-xs);
  }
}
</style>
