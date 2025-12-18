<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { industries, startupStages } from '../mock/data.js'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = ref(3)

// 表单数据
const formData = ref({
  industry: '',
  stage: '',
  goals: ''
})

// 下一步
const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
  }
}

// 上一步
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// 完成引导
const completeOnboarding = () => {
  // 保存到localStorage
  localStorage.setItem('onboardingCompleted', 'true')
  localStorage.setItem('userPreferences', JSON.stringify(formData.value))
  
  // 跳转到首页
  router.push('/')
}
</script>

<template>
  <div class="onboarding">
    <!-- 引导容器 -->
    <div class="onboarding-container">
      <!-- 进度条 -->
      <div class="progress-container">
        <div class="progress-steps">
          <div 
            class="progress-step" 
            :class="{ active: currentStep >= 1, completed: currentStep > 1 }"
          >
            <span class="step-number">{{ currentStep >= 1 ? '✓' : '1' }}</span>
            <span class="step-label">行业选择</span>
          </div>
          <div class="progress-line" :class="{ completed: currentStep > 1 }"></div>
          <div 
            class="progress-step" 
            :class="{ active: currentStep >= 2, completed: currentStep > 2 }"
          >
            <span class="step-number">{{ currentStep >= 2 ? '✓' : '2' }}</span>
            <span class="step-label">阶段选择</span>
          </div>
          <div class="progress-line" :class="{ completed: currentStep > 2 }"></div>
          <div 
            class="progress-step" 
            :class="{ active: currentStep >= 3 }"
          >
            <span class="step-number">{{ currentStep >= 3 ? '✓' : '3' }}</span>
            <span class="step-label">目标设置</span>
          </div>
        </div>
      </div>
      
      <!-- 引导内容 -->
      <div class="onboarding-content">
        <!-- 步骤1：行业选择 -->
        <div v-if="currentStep === 1" class="step-content">
          <h2>您的创业行业是？</h2>
          <p>选择您的创业行业，我们将为您提供更精准的服务</p>
          
          <div class="industry-grid">
            <button 
              class="industry-btn" 
              v-for="industry in industries" 
              :key="industry"
              :class="{ active: formData.industry === industry }"
              @click="formData.industry = industry"
            >
              {{ industry }}
            </button>
          </div>
        </div>
        
        <!-- 步骤2：阶段选择 -->
        <div v-if="currentStep === 2" class="step-content">
          <h2>您的创业处于哪个阶段？</h2>
          <p>选择您的创业阶段，我们将为您匹配相应的资源</p>
          
          <div class="stage-grid">
            <button 
              class="stage-btn" 
              v-for="stage in startupStages" 
              :key="stage"
              :class="{ active: formData.stage === stage }"
              @click="formData.stage = stage"
            >
              {{ stage }}
            </button>
          </div>
        </div>
        
        <!-- 步骤3：目标设置 -->
        <div v-if="currentStep === 3" class="step-content">
          <h2>您的主要创业目标是什么？</h2>
          <p>设置您的目标，我们将为您制定个性化的创业计划</p>
          
          <textarea 
            v-model="formData.goals" 
            class="goals-input"
            placeholder="请输入您的创业目标，例如：完成首轮融资、开设第一家门店等"
            rows="5"
          ></textarea>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button 
          class="btn secondary" 
          @click="prevStep"
          v-if="currentStep > 1"
        >
          上一步
        </button>
        
        <div class="spacer" v-if="currentStep > 1"></div>
        
        <button 
          class="btn primary" 
          @click="currentStep < totalSteps ? nextStep() : completeOnboarding()"
          :disabled="(currentStep === 1 && !formData.industry) || (currentStep === 2 && !formData.stage)"
        >
          {{ currentStep < totalSteps ? '下一步' : '完成' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.onboarding {
  margin: 0 auto;
  padding: 80px 1rem 1rem;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
}

/* 页面标题 */
.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  text-align: center;
}

/* 引导容器 */
.onboarding-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

/* 进度条 */
.progress-container {
  margin-bottom: 1rem;
}

.progress-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
  margin-bottom: 0.5rem;
}

.progress-step.active .step-number {
  background-color: var(--primary-color);
  color: white;
}

.progress-step.completed .step-number {
  background-color: var(--success-color);
  color: white;
}

.step-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.progress-step.active .step-label,
.progress-step.completed .step-label {
  color: var(--text-primary);
  font-weight: 500;
}

.progress-line {
  flex: 1;
  height: 2px;
  background-color: var(--bg-secondary);
  position: absolute;
  top: 18px;
  z-index: 0;
  transition: all 0.3s;
}

.progress-line:nth-child(2) {
  left: 18px;
  right: 18px;
  margin: 0 50px;
}

.progress-line:nth-child(4) {
  left: calc(50% + 18px);
  right: 18px;
  margin: 0 50px 0 0;
}

.progress-line.completed {
  background-color: var(--primary-color);
}

/* 引导内容 */
.onboarding-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.step-content {
  text-align: center;
}

.step-content h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  color: var(--text-primary);
}

.step-content p {
  margin: 0 0 2rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* 行业选择网格 */
.industry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.industry-btn {
  padding: 1rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.industry-btn:hover {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: var(--primary-color);
}

.industry-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* 阶段选择网格 */
.stage-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.stage-btn {
  padding: 1.2rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  text-align: left;
}

.stage-btn:hover {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: var(--primary-color);
}

.stage-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}

/* 目标输入框 */
.goals-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  resize: none;
  outline: none;
  transition: all 0.3s;
  font-family: inherit;
}

.goals-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.spacer {
  flex: 1;
}

/* 按钮样式 */
.btn {
  padding: 0.9rem 2rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn.primary {
  background-color: var(--primary-color);
  color: white;
}

.btn.primary:hover:not(:disabled) {
  background-color: #40a9ff;
}

.btn.primary:active:not(:disabled) {
  background-color: #096dd9;
}

.btn.primary:disabled {
  background-color: var(--bg-secondary);
  color: var(--text-tertiary);
  cursor: not-allowed;
}

.btn.secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn.secondary:hover {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .industry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .onboarding-container {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .onboarding {
    padding: 60px 0.5rem 0.5rem;
  }
  
  .industry-grid {
    grid-template-columns: 1fr;
  }
  
  .onboarding-container {
    max-width: 100%;
  }
}
</style>
