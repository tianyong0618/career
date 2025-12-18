<template>
  <div class="skill-cloud card">
    <div class="card-header">
      <h3>能力云图</h3>
      <span class="skill-count">{{ totalSkills }} 项技能</span>
    </div>
    <div class="card-content">
      <!-- 技能类型切换 -->
      <div class="skill-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'hard' }" 
          @click="activeTab = 'hard'"
        >
          硬技能
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'soft' }" 
          @click="activeTab = 'soft'"
        >
          软技能
        </button>
      </div>
      
      <!-- 技能云展示 -->
      <div class="cloud-container">
        <div 
          class="skill-item" 
          v-for="(skill, index) in currentSkills" 
          :key="skill.name"
          :style="{
            fontSize: getFontSize(skill.level),
            opacity: getOpacity(skill.level)
          }"
          @click="showSkillDetail(skill)"
        >
          <div class="skill-name">{{ skill.name }}</div>
          <div class="skill-level">{{ skill.level }}</div>
        </div>
      </div>
      
      <!-- 技能详情弹窗 -->
      <div class="skill-detail-modal" v-if="showDetail" @click="closeDetail">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h4>{{ selectedSkill.name }}</h4>
            <button class="close-btn" @click="closeDetail">×</button>
          </div>
          <div class="modal-body">
            <div class="detail-item">
              <span class="detail-label">技能类型：</span>
              <span class="detail-value">{{ activeTab === 'hard' ? '硬技能' : '软技能' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">熟练度：</span>
              <span class="detail-value">{{ selectedSkill.level }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">来源：</span>
              <span class="detail-value">{{ selectedSkill.source }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { skillCloud } from '../assets/mock/data'

const activeTab = ref('hard')
const showDetail = ref(false)
const selectedSkill = ref(null)

// 计算当前显示的技能
const currentSkills = computed(() => {
  return activeTab.value === 'hard' ? skillCloud.hardSkills : skillCloud.softSkills
})

// 计算总技能数
const totalSkills = computed(() => {
  return skillCloud.hardSkills.length + skillCloud.softSkills.length
})

// 根据技能等级获取字体大小
const getFontSize = (level) => {
  const sizeMap = {
    '熟练': '1.8rem',
    '掌握': '1.5rem',
    '入门': '1.2rem',
    '强': '1.8rem',
    '中': '1.5rem',
    '待验证': '1.2rem'
  }
  return sizeMap[level] || '1.2rem'
}

// 根据技能等级获取透明度
const getOpacity = (level) => {
  const opacityMap = {
    '熟练': '1',
    '掌握': '0.85',
    '入门': '0.7',
    '强': '1',
    '中': '0.85',
    '待验证': '0.7'
  }
  return opacityMap[level] || '0.8'
}

// 显示技能详情
const showSkillDetail = (skill) => {
  selectedSkill.value = skill
  showDetail.value = true
}

// 关闭技能详情
const closeDetail = () => {
  showDetail.value = false
  selectedSkill.value = null
}
</script>

<style scoped>
.skill-cloud {
  margin-bottom: var(--spacing-lg);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

.skill-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.skill-tabs {
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

.cloud-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  animation: breathe 4s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
}

/* 技能项动态效果 */
.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  animation: float 6s ease-in-out infinite, fadeInUp 1s ease-out;
  animation-delay: calc(var(--index) * 0.5s);
  min-width: 80px;
  text-align: center;
  gap: var(--spacing-xs);
}

/* 入场动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 使用CSS变量为每个技能项设置不同的动画延迟 */
.skill-item:nth-child(1) { --index: 1; }
.skill-item:nth-child(2) { --index: 2; }
.skill-item:nth-child(3) { --index: 3; }
.skill-item:nth-child(4) { --index: 4; }
.skill-item:nth-child(5) { --index: 5; }
.skill-item:nth-child(6) { --index: 6; }
.skill-item:nth-child(7) { --index: 7; }
.skill-item:nth-child(8) { --index: 8; }
.skill-item:nth-child(9) { --index: 9; }
.skill-item:nth-child(10) { --index: 10; }
.skill-item:nth-child(11) { --index: 11; }
.skill-item:nth-child(12) { --index: 12; }

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.skill-item:hover {
  transform: translateY(-12px) scale(1.05);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  z-index: 10;
}

.skill-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.skill-level {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* 技能详情弹窗 */
.skill-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn var(--transition-normal);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  animation: slideUp var(--transition-normal);
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.modal-header h4 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
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

.modal-body {
  padding: var(--spacing-lg);
}

.detail-item {
  display: flex;
  margin-bottom: var(--spacing-md);
}

.detail-label {
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 80px;
}

.detail-value {
  color: var(--text-primary);
  flex: 1;
}

/* 响应式设计 - 保持按钮大小协调 */
@media (max-width: 768px) {
  .cloud-container {
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
  }
  
  .skill-item {
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  /* 保持技能名称和等级的大小协调 */
  .skill-name {
    font-size: 1rem;
  }
  
  .skill-level {
    font-size: 0.8rem;
  }
}

/* 小屏设备优化 - 确保按钮大小合适 */
@media (max-width: 480px) {
  .cloud-container {
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
  }
  
  .skill-item {
    padding: var(--spacing-md) var(--spacing-lg);
    min-width: 70px;
  }
  
  /* 保持技能名称和等级的大小协调 */
  .skill-name {
    font-size: 1rem;
  }
  
  .skill-level {
    font-size: 0.8rem;
  }
  
  /* 调整卡片内边距 */
  .skill-cloud {
    padding: var(--spacing-md);
  }
  
  /* 简化标题 */
  .card-header h3 {
    font-size: var(--font-size-lg);
  }
}
</style>