<template>
  <div class="growth-tasks card">
    <div class="card-header">
      <h3>成长中心</h3>
    </div>
    <div class="card-content">
      <!-- 标签页切换 -->
      <div class="tabs" role="tablist" aria-label="成长中心标签页">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'courses' }" 
          @click="activeTab = 'courses'"
          @keydown.right="activeTab = 'tasks'"
          @keydown.left="activeTab = 'achievements'"
          role="tab"
          :aria-selected="activeTab === 'courses'"
          :aria-controls="'courses-content'"
          :id="'courses-tab'"
          tabindex="0"
        >
          学习课程
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'tasks' }" 
          @click="activeTab = 'tasks'"
          @keydown.right="activeTab = 'achievements'"
          @keydown.left="activeTab = 'courses'"
          role="tab"
          :aria-selected="activeTab === 'tasks'"
          :aria-controls="'tasks-content'"
          :id="'tasks-tab'"
          tabindex="0"
        >
          微任务
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'achievements' }" 
          @click="activeTab = 'achievements'"
          @keydown.right="activeTab = 'courses'"
          @keydown.left="activeTab = 'tasks'"
          role="tab"
          :aria-selected="activeTab === 'achievements'"
          :aria-controls="'achievements-content'"
          :id="'achievements-tab'"
          tabindex="0"
        >
          成就
        </button>
      </div>
      
      <!-- 能力提升动画 -->
      <AbilityBoost :show="showAbilityBoost" @hide="showAbilityBoost = false" />
      
      <!-- 自动归档提示 -->
      <div class="auto-archive-section" v-if="showArchivePrompt">
        <div class="archive-prompt">
          <div class="prompt-icon">📅</div>
          <div class="prompt-content">
            <h5 class="prompt-title">检测到项目结束会议</h5>
            <p class="prompt-text">是否归档本次项目成果？</p>
          </div>
          <div class="prompt-actions">
            <button class="btn btn-secondary" @click="showArchivePrompt = false">稍后处理</button>
            <button class="btn btn-primary" @click="archiveAchievement">立即归档</button>
          </div>
        </div>
      </div>
      
      <!-- 学习课程 -->
      <div 
        class="courses-section" 
        v-if="activeTab === 'courses'"
        role="tabpanel"
        :aria-labelledby="'courses-tab'"
        id="courses-content"
        tabindex="0"
      >
        <div class="section-header">
          <h5 class="section-title">我的学习课程</h5>
          <div class="section-actions">
            <button class="view-all-btn" aria-label="查看全部课程">查看全部</button>
            <button class="calendar-btn" @click="connectCalendar" aria-label="接入日历">📅 接入日历</button>
          </div>
        </div>
        <div class="courses-list">
          <div 
            class="course-card" 
            v-for="course in coursesData" 
            :key="course.id"
            tabindex="0"
            aria-label="课程：{{ course.title }}，进度{{ course.progress }}%"
          >
            <img :src="course.image" :alt="`${course.title} 课程封面`" class="course-image" />
            <div class="course-content">
              <div class="course-info">
                <h6 class="course-title">{{ course.title }}</h6>
                <div class="course-category">{{ course.category }}</div>
              </div>
              <div class="course-meta">
                <div class="meta-item">
                  <span class="meta-label">时长</span>
                  <span class="meta-value">{{ course.duration }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">课时</span>
                  <span class="meta-value">{{ course.lectures }}节</span>
                </div>
              </div>
              <div class="course-progress" role="progressbar" aria-valuenow="{{ course.progress }}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
                </div>
                <div class="progress-text">{{ course.progress }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 微任务 -->
      <div 
        class="tasks-section" 
        v-if="activeTab === 'tasks'"
        role="tabpanel"
        :aria-labelledby="'tasks-tab'"
        id="tasks-content"
        tabindex="0"
      >
        <div class="section-header">
          <h5 class="section-title">推荐任务</h5>
          <button class="view-all-btn" aria-label="查看全部任务">查看全部</button>
        </div>
        <div class="tasks-list">
          <div 
            class="task-card" 
            v-for="task in tasksData" 
            :key="task.id"
            tabindex="0"
            aria-label="任务：{{ task.title }}，难度{{ task.difficulty }}，奖励{{ task.reward }}"
          >
            <div class="task-header">
              <img :src="task.image" :alt="`${task.title} 任务图标`" class="task-image" />
              <div class="task-info">
                <h6 class="task-title">{{ task.title }}</h6>
                <div class="task-type">{{ task.type }}</div>
              </div>
            </div>
            <div class="task-meta">
              <div class="meta-item">
                <span class="meta-label">难度</span>
                <span class="meta-value difficulty-{{ task.difficulty }}">{{ task.difficulty }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">奖励</span>
                <span class="meta-value reward">{{ task.reward }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">截止</span>
                <span class="meta-value">{{ task.deadline }}</span>
              </div>
            </div>
            <div class="task-footer">
              <button class="accept-btn" @click="acceptTask(task.id)" aria-label="接受任务：{{ task.title }}">接受任务</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 成就 -->
      <div 
        class="achievements-section" 
        v-if="activeTab === 'achievements'"
        role="tabpanel"
        :aria-labelledby="'achievements-tab'"
        id="achievements-content"
        tabindex="0"
      >
        <div class="section-header">
          <h5 class="section-title">我的成就</h5>
          <button class="view-all-btn" aria-label="查看全部成就">查看全部</button>
        </div>
        <div class="achievements-grid">
          <div 
            class="achievement-card" 
            v-for="achievement in growthCenterData.achievements" 
            :key="achievement.id"
            tabindex="0"
            aria-label="成就：{{ achievement.title }}，类型{{ achievement.type }}"
          >
            <img :src="achievement.image" :alt="`${achievement.title} 成就图标`" class="achievement-image" />
            <div class="achievement-content">
              <h6 class="achievement-title">{{ achievement.title }}</h6>
              <div class="achievement-type">{{ achievement.type }}</div>
              <div class="achievement-date">{{ achievement.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { growthCenterData } from '../assets/mock/data'
import AbilityBoost from './AbilityBoost.vue'

const activeTab = ref('courses')
const showAbilityBoost = ref(false)
// 自动归档相关状态
const showArchivePrompt = ref(false)
const showCalendarConnected = ref(false)
const showAchievementArchived = ref(false)

// 从localStorage读取生成的数据，如果没有则使用默认数据
const storedCourses = JSON.parse(localStorage.getItem('generatedCourses') || '[]')
const storedTasks = JSON.parse(localStorage.getItem('generatedTasks') || '[]')
const currentPath = JSON.parse(localStorage.getItem('currentPath') || 'null')

// 使用生成的数据或默认数据
const coursesData = ref(storedCourses.length > 0 ? storedCourses : JSON.parse(JSON.stringify(growthCenterData.courses)))
const tasksData = ref(storedTasks.length > 0 ? storedTasks : JSON.parse(JSON.stringify(growthCenterData.tasks)))

// 组件挂载时检查是否有生成的数据
onMounted(() => {
  if (currentPath) {
    console.log('当前激活的路径:', currentPath.title)
    // 可以在这里添加路径激活提示
  }
})

// 处理接受任务
const acceptTask = (taskId) => {
  console.log('接受任务:', taskId)
  // 模拟任务完成
  setTimeout(() => {
    showAbilityBoost.value = true
    // 这里可以添加更新技能标签的逻辑
    console.log('任务完成，能力提升！')
  }, 1000)
}

// 连接日历
const connectCalendar = () => {
  console.log('连接日历')
  // 模拟日历连接成功
  showCalendarConnected.value = true
  // 3秒后模拟检测到项目结束会议
  setTimeout(() => {
    showArchivePrompt.value = true
  }, 3000)
}

// 归档成果
const archiveAchievement = () => {
  console.log('归档成果')
  showArchivePrompt.value = false
  // 模拟归档成功，显示成就
  setTimeout(() => {
    showAchievementArchived.value = true
    showAbilityBoost.value = true
    // 这里可以添加更新技能标签的逻辑
    console.log('成果归档成功，更新能力标签！')
    // 3秒后隐藏提示
    setTimeout(() => {
      showAchievementArchived.value = false
    }, 3000)
  }, 1000)
}
</script>

<style scoped>
.growth-tasks {
  margin-bottom: var(--spacing-lg);
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

/* 标签页样式 */
.tabs {
  display: flex;
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: none;
  border: none;
  font-size: var(--font-size-md);
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

/* 通用章节样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.section-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.calendar-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.calendar-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
}

/* 自动归档样式 */
.auto-archive-section {
  margin-bottom: var(--spacing-lg);
}

.archive-prompt {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: rgba(24, 144, 255, 0.1);
  border: 1px solid rgba(24, 144, 255, 0.2);
  border-radius: var(--radius-lg);
  animation: slideIn 0.5s ease-out;
}

.prompt-icon {
  font-size: var(--font-size-xl);
  min-width: 24px;
  margin-top: -2px;
}

.prompt-content {
  flex: 1;
}

.prompt-title {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-md);
  color: var(--primary-color);
}

.prompt-text {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.prompt-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.btn {
  padding: var(--spacing-xs) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-1px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-weight: 600;
}

.view-all-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.view-all-btn:hover {
  text-decoration: underline;
  transform: translateY(-1px);
}

/* 课程样式 */
.courses-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.course-card {
  display: flex;
  gap: var(--spacing-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.course-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
}

.course-content {
  flex: 1;
  padding: var(--spacing-sm) 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-info {
  margin-bottom: var(--spacing-sm);
}

.course-title {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.course-category {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.course-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.meta-value {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.course-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.progress-bar {
  flex: 1;
  height: 6px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--radius-full, 9999px);
  transition: width var(--transition-normal);
}

.progress-text {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 35px;
  text-align: right;
}

/* 任务样式 */
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.task-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  transition: all var(--transition-fast);
  gap: var(--spacing-md);
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.task-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.task-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.task-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.task-title {
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-weight: 600;
}

.task-type {
  font-size: var(--font-size-xs);
  color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.1);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full, 9999px);
  white-space: nowrap;
  align-self: flex-start;
}

.task-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  border-top: 1px solid var(--border-color);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.meta-value {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.meta-value.difficulty-初级 {
  color: var(--success-color);
}

.meta-value.difficulty-中级 {
  color: var(--warning-color);
}

.meta-value.difficulty-高级 {
  color: var(--error-color);
}

.meta-value.reward {
  color: var(--success-color);
  font-weight: 600;
}

.task-footer {
  display: flex;
  justify-content: flex-end;
}

.accept-btn {
  width: 100%;
  max-width: 200px;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.accept-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

/* 成就样式 */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.achievement-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all var(--transition-fast);
}

.achievement-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.achievement-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-full, 9999px);
  margin-bottom: var(--spacing-sm);
}

.achievement-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.achievement-title {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.achievement-type {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.achievement-date {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .course-card {
    flex-direction: column;
  }
  
  .course-image {
    width: 100%;
    height: auto;
  }
  
  .task-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-sm);
  }
  
  .task-image {
    width: 100px;
    height: 100px;
  }
  
  .task-info {
    align-items: center;
    width: 100%;
  }
  
  .task-type {
    align-self: center;
  }
  
  .task-meta {
    grid-template-columns: 1fr;
    gap: var(--spacing-xs);
  }
  
  .meta-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .meta-item:last-child {
    border-bottom: none;
  }
  
  .accept-btn {
    max-width: none;
  }
  
  .achievements-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>