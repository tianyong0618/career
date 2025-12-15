<template>
  <div class="ai-assessment-view">
    <div class="container">
      <div class="page-header">
        <h2>AI职业测评</h2>
        <p>通过科学的测评，帮助您更了解自己的职业倾向</p>
      </div>
      
      <!-- 测评进度 -->
      <div class="assessment-progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: assessmentProgress + '%' }"></div>
        </div>
        <div class="progress-text">{{ assessmentProgress }}% 完成</div>
        <div class="question-counter">
          第 {{ currentQuestionIndex + 1 }} / {{ aiQuestions.length }} 题
        </div>
      </div>
      
      <!-- 测评题目 -->
      <div class="assessment-question" v-if="!isCompleted">
        <h3 class="question-text">
          {{ aiQuestions[currentQuestionIndex].question }}
        </h3>
        <div class="options-list">
          <div 
            class="option-item" 
            v-for="option in aiQuestions[currentQuestionIndex].options" 
            :key="option.value"
            @click="answerQuestion(option)"
            :class="{ selected: selectedAnswers[currentQuestionIndex]?.answer === option.value }"
          >
            <div class="option-radio"></div>
            <div class="option-text">{{ option.text }}</div>
          </div>
        </div>
      </div>
      
      <!-- 测评完成提示 -->
      <div class="assessment-completing" v-if="isCompleting">
        <div class="loading-spinner"></div>
        <div class="completing-text">正在生成测评结果...</div>
      </div>
      
      <!-- 测评结果 -->
      <div class="assessment-results" v-if="isCompleted">
        <h3 class="results-title">测评结果</h3>
        <div class="results-content">
          <div class="result-card">
            <div class="result-icon">📊</div>
            <div class="result-info">
              <div class="result-name">职业倾向</div>
              <div class="result-value">{{ assessmentResult?.tendency || '技术型' }}</div>
            </div>
          </div>
          <div class="result-card">
            <div class="result-icon">💼</div>
            <div class="result-info">
              <div class="result-name">推荐岗位</div>
              <div class="result-value">{{ assessmentResult?.recommendedJob || '数据分析师' }}</div>
            </div>
          </div>
          <div class="result-card">
            <div class="result-icon">🎯</div>
            <div class="result-info">
              <div class="result-name">核心优势</div>
              <div class="result-value">{{ assessmentResult?.strengths || '逻辑思维强' }}</div>
            </div>
          </div>
        </div>
        <div class="result-actions">
          <button class="action-btn" @click="startNewAssessment">重新测评</button>
          <button class="action-btn primary" @click="router.push('/onboarding?step=3')">生成镜像</button>
        </div>
      </div>
      
      <!-- 导航按钮 -->
      <div class="nav-buttons" v-if="!isCompleted && !isCompleting">
        <button 
          class="nav-btn back-btn" 
          @click="previousQuestion" 
          :disabled="currentQuestionIndex === 0"
        >
          上一题
        </button>
        <button 
          class="nav-btn next-btn" 
          @click="nextQuestion" 
          :disabled="!selectedAnswers[currentQuestionIndex]"
        >
          {{ currentQuestionIndex === aiQuestions.length - 1 ? '完成' : '下一步' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// AI测评相关状态
const currentQuestionIndex = ref(0)
const assessmentProgress = ref(0)
const isCompleting = ref(false)
const isCompleted = ref(false)
const selectedAnswers = ref([])
const assessmentResult = ref(null)

// AI测评题目
const aiQuestions = reactive([
  {
    id: 1,
    type: 'radio',
    question: '你更倾向于哪种工作方式？',
    options: [
      { value: 'individual', text: '独立完成任务' },
      { value: 'team', text: '团队协作' },
      { value: 'hybrid', text: '混合方式' }
    ]
  },
  {
    id: 2,
    type: 'radio',
    question: '你更感兴趣的职业方向是？',
    options: [
      { value: 'tech', text: '技术研发' },
      { value: 'product', text: '产品设计' },
      { value: 'business', text: '商业运营' }
    ]
  },
  {
    id: 3,
    type: 'radio',
    question: '你学习新技能的主要方式是？',
    options: [
      { value: 'courses', text: '在线课程' },
      { value: 'projects', text: '实战项目' },
      { value: 'books', text: '书籍学习' }
    ]
  }
])

// 回答问题
const answerQuestion = (option) => {
  // 保存答案
  selectedAnswers.value[currentQuestionIndex.value] = {
    questionId: aiQuestions[currentQuestionIndex.value].id,
    answer: option.value
  }
}

// 下一题
const nextQuestion = () => {
  if (currentQuestionIndex.value < aiQuestions.length - 1) {
    currentQuestionIndex.value++
    updateProgress()
  } else {
    completeAssessment()
  }
}

// 上一题
const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    updateProgress()
  }
}

// 更新进度
const updateProgress = () => {
  const answeredCount = selectedAnswers.value.filter(answer => answer).length
  assessmentProgress.value = Math.round(((answeredCount + 1) / aiQuestions.length) * 100)
}

// 完成测评
const completeAssessment = () => {
  isCompleting.value = true
  
  // 模拟生成测评结果
  setTimeout(() => {
    generateAssessmentResult()
    isCompleting.value = false
    isCompleted.value = true
  }, 2000)
}

// 生成测评结果
const generateAssessmentResult = () => {
  // 基于用户回答生成简单的测评结果
  const answers = selectedAnswers.value
  
  // 简单的结果生成逻辑
  const jobPreferences = answers.filter(a => a.questionId === 2).map(a => a.answer)
  const workStyle = answers.filter(a => a.questionId === 1).map(a => a.answer)[0]
  
  let tendency = '技术型'
  let recommendedJob = '数据分析师'
  let strengths = '逻辑思维强'
  
  if (jobPreferences.includes('product')) {
    tendency = '产品型'
    recommendedJob = '产品经理'
    strengths = '用户思维强'
  } else if (jobPreferences.includes('business')) {
    tendency = '商业型'
    recommendedJob = '运营经理'
    strengths = '沟通能力强'
  }
  
  // 保存测评结果到localStorage
  const result = {
    tendency,
    recommendedJob,
    strengths,
    answers: selectedAnswers.value,
    completedAt: new Date().toISOString()
  }
  
  assessmentResult.value = result
  localStorage.setItem('lastAssessmentResult', JSON.stringify(result))
}

// 开始新的测评
const startNewAssessment = () => {
  currentQuestionIndex.value = 0
  assessmentProgress.value = 0
  isCompleting.value = false
  isCompleted.value = false
  selectedAnswers.value = []
  assessmentResult.value = null
  updateProgress()
}

// 初始化
updateProgress()
</script>

<style scoped>
.ai-assessment-view {
  padding: var(--spacing-lg) var(--spacing-md);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-header h2 {
  font-size: var(--font-size-2xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.page-header p {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

/* 测评进度 */
.assessment-progress-section {
  margin: var(--spacing-lg) 0;
  text-align: center;
}

.progress-bar {
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--radius-full, 9999px);
  transition: width var(--transition-fast);
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.question-counter {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* 测评题目 */
.assessment-question {
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.question-text {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  line-height: 1.5;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.option-item:hover {
  background-color: rgba(24, 144, 255, 0.05);
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.option-item.selected {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: var(--primary-color);
}

.option-radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.option-item:hover .option-radio {
  border-color: var(--primary-color);
}

.option-item.selected .option-radio {
  border-color: var(--primary-color);
}

.option-item.selected .option-radio::after {
  content: '';
  width: 10px;
  height: 10px;
  background-color: var(--primary-color);
  border-radius: 50%;
}

.option-text {
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

/* 测评完成提示 */
.assessment-completing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-xl);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 6px solid var(--bg-primary);
  border-top: 6px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.completing-text {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  font-weight: 500;
}

/* 测评结果 */
.assessment-results {
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.results-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.results-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.result-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.result-info {
  text-align: center;
}

.result-name {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.result-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.result-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn.primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.action-btn.primary:hover {
  background-color: #40a9ff;
}

/* 导航按钮 */
.nav-buttons {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.nav-btn {
  padding: var(--spacing-sm) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex: 1;
}

.back-btn {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.next-btn {
  background-color: var(--primary-color);
  color: white;
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .results-content {
    grid-template-columns: 1fr;
  }
  
  .nav-buttons {
    flex-direction: column;
  }
  
  .assessment-question {
    padding: var(--spacing-lg);
  }
  
  .question-text {
    font-size: var(--font-size-lg);
  }
}
</style>