<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="logo-text" @click="router.push('/')" style="cursor: pointer; user-select: none;">MyCareer OS</h1>
        </div>
        
        <div class="header-actions">
          <!-- 主题切换按钮 -->
          <button 
            class="action-btn" 
            @click="handleThemeChange" 
            :aria-label="getThemeLabel()"
            title="切换主题"
          >
            <span v-if="currentTheme === 'light'">🌙</span>
            <span v-else>☀️</span>
          </button>
          
          <!-- 通知按钮和面板 -->
          <div class="notification-container">
            <button 
              class="action-btn" 
              :aria-label="'通知'" 
              title="通知"
              @click="toggleNotifications"
            >
              🔔
              <span v-if="notifications.length > 0" class="notification-badge">{{ notifications.length }}</span>
            </button>
            <!-- 通知面板 -->
            <div 
              class="notification-panel" 
              v-if="showNotifications"
              @click.stop
              role="dialog"
              aria-modal="true"
              aria-labelledby="notification-title"
            >
              <div class="panel-header">
                <h3 id="notification-title" class="panel-title">通知中心</h3>
                <button class="close-btn" @click="showNotifications = false" aria-label="关闭通知面板">×</button>
              </div>
              <div class="panel-content">
                <div class="notification-item" v-for="(notification, index) in notifications" :key="index">
                  <div class="notification-icon">{{ notification.icon }}</div>
                  <div class="notification-content">
                    <div class="notification-title">{{ notification.title }}</div>
                    <div class="notification-time">{{ notification.time }}</div>
                  </div>
                </div>
                <div class="no-notifications" v-if="notifications.length === 0">
                  <div class="no-notifications-icon">📭</div>
                  <div class="no-notifications-text">暂无新通知</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 任务按钮和面板 -->
          <div class="tasks-container">
            <button 
              class="action-btn" 
              :aria-label="'任务'" 
              title="任务"
              @click="toggleTasks"
            >
              📋
              <span v-if="tasks.length > 0" class="task-badge">{{ tasks.length }}</span>
            </button>
            <!-- 任务面板 -->
            <div 
              class="task-panel" 
              v-if="showTasks"
              @click.stop
              role="dialog"
              aria-modal="true"
              aria-labelledby="task-title"
            >
              <div class="panel-header">
                <h3 id="task-title" class="panel-title">任务中心</h3>
                <button class="close-btn" @click="showTasks = false" aria-label="关闭任务面板">×</button>
              </div>
              <div class="panel-content">
                <div class="task-item" v-for="(task, index) in tasks" :key="index">
                  <div class="task-checkbox">
                    <input type="checkbox" :id="'task-' + index" v-model="task.completed" />
                    <label :for="'task-' + index"></label>
                  </div>
                  <div class="task-content">
                    <div class="task-title">{{ task.title }}</div>
                    <div class="task-due">{{ task.due }}</div>
                  </div>
                </div>
                <div class="no-tasks" v-if="tasks.length === 0">
                  <div class="no-tasks-icon">✅</div>
                  <div class="no-tasks-text">暂无待办任务</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router' 

// 创建router实例
const router = useRouter()

// 定义props和emit
const props = defineProps({
  currentTheme: {
    type: String,
    default: 'light'
  }
})

const emit = defineEmits(['theme-change'])

// 通知和任务状态
const showNotifications = ref(false)
const showTasks = ref(false)

// 模拟通知数据
const notifications = ref([
  { icon: '📚', title: '新的课程已发布：Tableau高级可视化', time: '5分钟前' },
  { icon: '✅', title: '你完成的任务已获得积分', time: '2小时前' },
  { icon: '🎯', title: '你的成长进度已更新', time: '1天前' }
])

// 模拟任务数据
const tasks = ref([
  { title: '完成电商用户分析微任务', due: '今天截止', completed: false },
  { title: '学习Tableau可视化课程', due: '3天后截止', completed: false },
  { title: '更新职业倾向评估', due: '7天后截止', completed: true }
])

// 处理主题切换
const handleThemeChange = () => {
  emit('theme-change')
}

// 获取主题标签
const getThemeLabel = () => {
  switch (props.currentTheme) {
    case 'light':
      return '浅色模式'
    case 'dark':
      return '深色模式'
    default:
      return '切换主题'
  }
}

// 切换通知面板显示
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    showTasks.value = false
  }
}

// 切换任务面板显示
const toggleTasks = () => {
  showTasks.value = !showTasks.value
  if (showTasks.value) {
    showNotifications.value = false
  }
}
</script>

<style scoped>
.header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-xl);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

/* 通知和任务容器 */
.notification-container,
.tasks-container {
  position: relative;
  display: inline-block;
}

.action-btn {
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  cursor: pointer;
  border-radius: var(--radius-full, 9999px);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.action-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transform: translateY(-1px);
}

/* 通知和任务徽章 */
.notification-badge,
.task-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: var(--error-color);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 700;
  border-radius: var(--radius-full, 9999px);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 面板通用样式 */
.notification-panel,
.task-panel {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: var(--spacing-sm);
}

/* 面板头部样式 */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.panel-title {
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full, 9999px);
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

/* 面板内容样式 */
.panel-content {
  padding: var(--spacing-md);
}

/* 通知项样式 */
.notification-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  cursor: pointer;
  margin-bottom: var(--spacing-xs);
}

.notification-item:hover {
  background-color: var(--bg-secondary);
}

.notification-icon {
  font-size: var(--font-size-lg);
  min-width: 24px;
  margin-top: -2px;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.notification-time {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* 任务项样式 */
.task-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.task-item:hover {
  background-color: var(--bg-secondary);
}

.task-checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.task-due {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* 空状态样式 */
.no-notifications,
.no-tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--text-tertiary);
  text-align: center;
}

.no-notifications-icon,
.no-tasks-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.no-notifications-text,
.no-tasks-text {
  font-size: var(--font-size-sm);
}

/* 自定义滚动条 */
.notification-panel::-webkit-scrollbar,
.task-panel::-webkit-scrollbar {
  width: 6px;
}

.notification-panel::-webkit-scrollbar-track,
.task-panel::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.notification-panel::-webkit-scrollbar-thumb,
.task-panel::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.notification-panel::-webkit-scrollbar-thumb:hover,
.task-panel::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .logo-text {
    font-size: var(--font-size-lg);
  }
  
  .action-btn {
    width: 36px;
    height: 36px;
    font-size: var(--font-size-md);
  }
  
  .notification-panel,
  .task-panel {
    width: calc(100vw - 32px);
    max-width: 320px;
  }
}
</style>