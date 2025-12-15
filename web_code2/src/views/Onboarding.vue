<template>
  <div class="onboarding-view">
    <div class="container">
      <!-- 进度指示器 -->
      <div class="progress-container">
        <div class="progress-steps">
          <div class="progress-step" :class="{ active: step === 1, completed: step > 1 }">
            <span class="step-number">1</span>
            <span class="step-text">选择身份</span>
          </div>
          <div class="progress-step" :class="{ active: step === 2, completed: step > 2 }">
            <span class="step-number">2</span>
            <span class="step-text">快速画像</span>
          </div>
          <div class="progress-step" :class="{ active: step === 3, completed: step > 3 }">
            <span class="step-number">3</span>
            <span class="step-text">生成镜像</span>
          </div>
        </div>
      </div>
      
      <!-- 主内容区域 -->
      <div class="onboarding-content">
        <!-- 步骤1：选择身份 -->
        <div v-if="step === 1" class="step-content">
          <h2>欢迎加入MyCareer OS</h2>
          <p>请选择您的当前身份，我们将为您提供更精准的职业建议</p>
          
          <div class="identity-options">
            <div 
              class="identity-card" 
              v-for="identity in identityOptions" 
              :key="identity.value"
              @click="selectIdentity(identity)"
              :class="{ selected: selectedIdentity === identity.value }"
            >
              <div class="identity-icon">{{ identity.icon }}</div>
              <div class="identity-name">{{ identity.name }}</div>
              <div class="identity-desc">{{ identity.description }}</div>
            </div>
          </div>
        </div>
        
        <!-- 步骤2：快速画像 -->
        <div v-if="step === 2" class="step-content">
          <h2>创建您的职业画像</h2>
          <p>选择一种方式快速生成您的初始职业镜像</p>
          
          <div class="profile-options">
            <div class="profile-card" @click="selectProfileMethod('upload')" :class="{ selected: profileMethod === 'upload' }">
              <div class="profile-icon">📁</div>
              <div class="profile-name">上传简历</div>
              <div class="profile-desc">上传PDF/Word格式简历，AI自动解析</div>
              <div class="profile-duration">约1分钟</div>
            </div>
            
            <div class="profile-card" @click="selectProfileMethod('assessment')" :class="{ selected: profileMethod === 'assessment' }">
              <div class="profile-icon">📝</div>
              <div class="profile-name">AI测评</div>
              <div class="profile-desc">10分钟情景题+语音面试，深度了解您</div>
              <div class="profile-duration">约10分钟</div>
            </div>
            
            <div class="profile-card" @click="selectProfileMethod('authorize')" :class="{ selected: profileMethod === 'authorize' }">
              <div class="profile-icon">🔗</div>
              <div class="profile-name">授权平台</div>
              <div class="profile-desc">授权飞书/钉钉，仅读取日历与文档标题</div>
              <div class="profile-duration">约30秒</div>
            </div>
          </div>
        </div>
        

        
        <!-- 步骤3：生成镜像 -->
        <div v-if="step === 3" class="step-content compact-step">
          <div class="loading-container">
            <div class="loading-animation">
              <div class="loading-spinner"></div>
              <div class="loading-text">正在生成您的职业镜像...</div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: Math.floor(progress) + '%' }"></div>
            </div>
            <div class="progress-text">{{ Math.floor(progress) }}% 完成</div>
          </div>
          
          <!-- 数据融合进度 -->
          <div class="data-fusion-section" v-if="progress > 0">
            <h3>数据融合中...</h3>
            <div class="fusion-progress-container">
              <div 
                class="fusion-item" 
                v-for="source in dataSources" 
                :key="source.id"
              >
                <div class="fusion-header">
                  <div class="fusion-icon">{{ source.icon }}</div>
                  <div class="fusion-info">
                    <div class="fusion-name">{{ source.name }}</div>
                    <div class="fusion-status" :class="source.status">
                      {{ source.statusText }}
                    </div>
                  </div>
                </div>
                <div class="fusion-progress-bar">
                  <div 
                    class="fusion-progress-fill" 
                    :class="source.status"
                    :style="{ width: source.progress + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 导航按钮 -->
      <div class="nav-buttons">
        <button 
          class="nav-btn back-btn" 
          @click="previousStep"
          v-if="step > 1"
        >
          上一步
        </button>
        
        <button 
          class="nav-btn return-btn" 
          @click="returnToProfile"
          v-if="step < 3 && route.query.from === 'profile'"
        >
          返回
        </button>
      </div>
      
      <!-- 文件上传区域 -->
      <div class="file-upload-modal" v-if="showFileUpload">
        <div class="modal-content">
          <h3>上传简历</h3>
          <div class="file-drop-area" @dragover.prevent @drop.prevent="handleFileDrop">
            <div class="drop-icon">📁</div>
            <div class="drop-text">拖放文件到此处，或</div>
            <label class="file-input-label">
              <input 
                type="file" 
                class="file-input" 
                @change="handleFileSelect"
                accept=".pdf,.doc,.docx"
              />
              选择文件
            </label>
            <div class="file-requirements">支持PDF、Word文档，最大10MB</div>
          </div>
          
          <div class="uploaded-file" v-if="uploadedFile">
            <div class="file-info">
              <div class="file-name">{{ uploadedFile.name }}</div>
              <div class="file-size">{{ formatFileSize(uploadedFile.size) }}</div>
            </div>
            <button class="remove-file-btn" @click="removeFile">删除</button>
          </div>
          
          <div class="modal-actions">
            <button class="modal-btn cancel-btn" @click="showFileUpload = false">取消</button>
            <button class="modal-btn upload-btn" @click="uploadFile" :disabled="!uploadedFile">
              开始解析
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 冷启动步骤
const step = ref(1)
const selectedIdentity = ref('')
const profileMethod = ref('')
const isLoading = ref(false)
const progress = ref(0)
const showFileUpload = ref(false)
const uploadedFile = ref(null)

// 身份选项
const identityOptions = [
  { value: 'student', name: '学生', icon: '🎓', description: '高校大三/大四学生' },
  { value: 'professional', name: '在职', icon: '💼', description: '毕业1-3年职场新人' },
  { value: 'freelancer', name: '自由职业', icon: '🔑', description: '自由职业探索者' }
]

// 数据来源状态
const dataSources = ref([
  { id: 1, name: '结构化经历', icon: '📝', status: 'pending', statusText: '待处理' },
  { id: 2, name: '行为数据', icon: '📊', status: 'pending', statusText: '待处理' },
  { id: 3, name: '工作成果', icon: '📋', status: 'pending', statusText: '待处理' },
  { id: 4, name: '任务交付', icon: '✅', status: 'pending', statusText: '待处理' },
  { id: 5, name: '外部信号', icon: '🌐', status: 'pending', statusText: '待处理' }
])

// 选择身份
const selectIdentity = (identity) => {
  selectedIdentity.value = identity.value
  // 自动进入下一步
  nextStep()
}

// 选择画像生成方式
const selectProfileMethod = (method) => {
  profileMethod.value = method
  // 立即保存到localStorage，确保跳转前已保存
  localStorage.setItem('profileMethod', method)
  
  if (method === 'upload') {
    showFileUpload.value = true
  } else if (method === 'assessment') {
    // 跳转到单独的AI测评页面，传递来源参数
    router.push({
      path: '/ai-assessment',
      query: { from: route.query.from }
    })
  } else if (method === 'authorize') {
    // 跳转到授权平台页面，传递来源参数
    router.push({
      path: '/authorization-platform',
      query: { from: route.query.from }
    })
  }
}



// 文件拖放处理
const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    uploadedFile.value = file
  }
}

// 文件选择处理
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFile.value = file
  }
}

// 删除文件
const removeFile = () => {
  uploadedFile.value = null
}

// 上传文件
const uploadFile = () => {
  if (uploadedFile.value) {
    showFileUpload.value = false
    nextStep()
  }
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

// 下一步
const nextStep = () => {
  if (step.value === 1 && !selectedIdentity.value) {
    return
  }
  
  if (step.value === 3) {
    // 完成冷启动，生成初始镜像
    completeOnboarding()
  } else {
    step.value++
    
    // 如果是进入第三步，开始生成镜像
    if (step.value === 3) {
      generateProfile()
    }
  }
}

// 上一步
const previousStep = () => {
  if (step.value > 1) {
    step.value--
  }
}

// 返回职业镜像页面
const returnToProfile = () => {
  // 确保返回职业镜像页面时有必要的localStorage状态，避免循环跳转
  // 保存当前选择的身份（如果有）
  if (selectedIdentity.value) {
    localStorage.setItem('userIdentity', selectedIdentity.value)
  }
  // 保存冷启动完成状态，避免返回后又跳回onboarding
  localStorage.setItem('onboardingCompleted', 'true')
  // 保存基本的用户画像（如果还没有）
  if (!localStorage.getItem('userProfile')) {
    const basicProfile = {
      identity: selectedIdentity.value || '',
      profileMethod: profileMethod.value || '',
      generatedAt: new Date().toISOString(),
      version: 'v1'
    }
    localStorage.setItem('userProfile', JSON.stringify(basicProfile))
  }
  
  // 跳转到职业镜像页面
  router.push('/')
}

// 生成职业镜像
const generateProfile = () => {
  isLoading.value = true
  
  // 初始化数据来源状态为进行中
  dataSources.value.forEach(source => {
    source.status = 'processing'
    source.statusText = '进行中'
    source.progress = 0
  })
  
  // 模拟生成过程
  const interval = setInterval(() => {
    if (progress.value < 100) {
      // 确保进度只增加整数
      const increment = Math.floor(Math.random() * 10) + 1
      progress.value = Math.min(progress.value + increment, 100)
      
      // 更新数据来源状态和进度
      if (progress.value > 20) {
        dataSources.value[0].status = 'completed', 
        dataSources.value[0].statusText = '已完成',
        dataSources.value[0].progress = 100
      } else if (progress.value > 10) {
        dataSources.value[0].status = 'processing',
        dataSources.value[0].progress = Math.min(progress.value * 5, 100)
      }
      
      if (progress.value > 40) {
        dataSources.value[1].status = 'completed', 
        dataSources.value[1].statusText = '已完成',
        dataSources.value[1].progress = 100
      } else if (progress.value > 30) {
        dataSources.value[1].status = 'processing',
        dataSources.value[1].progress = Math.min((progress.value - 20) * 5, 100)
      }
      
      if (progress.value > 60) {
        dataSources.value[2].status = 'completed', 
        dataSources.value[2].statusText = '已完成',
        dataSources.value[2].progress = 100
      } else if (progress.value > 50) {
        dataSources.value[2].status = 'processing',
        dataSources.value[2].progress = Math.min((progress.value - 40) * 5, 100)
      }
      
      if (progress.value > 80) {
        dataSources.value[3].status = 'completed', 
        dataSources.value[3].statusText = '已完成',
        dataSources.value[3].progress = 100
      } else if (progress.value > 70) {
        dataSources.value[3].status = 'processing',
        dataSources.value[3].progress = Math.min((progress.value - 60) * 5, 100)
      }
      
      if (progress.value > 95) {
        dataSources.value[4].status = 'completed', 
        dataSources.value[4].statusText = '已完成',
        dataSources.value[4].progress = 100
      } else if (progress.value > 85) {
        dataSources.value[4].status = 'processing',
        dataSources.value[4].progress = Math.min((progress.value - 80) * 20, 100)
      }
    } else {
      progress.value = 100
      clearInterval(interval)
      isLoading.value = false
      
      // 确保所有数据来源都标记为已完成
      dataSources.value.forEach(source => {
        source.status = 'completed'
        source.statusText = '已完成'
        source.progress = 100
      })
      
      // 生成完成后自动跳转到沙盒
      setTimeout(() => {
        completeOnboarding()
      }, 1000) // 延迟1秒，让用户看到完成状态
    }
  }, 300)
}

// 完成冷启动
const completeOnboarding = () => {
  // 保存冷启动完成状态到localStorage
  localStorage.setItem('onboardingCompleted', 'true')
  localStorage.setItem('userIdentity', selectedIdentity.value)
  
  // 生成初始职业镜像（这里简化处理，实际应该调用API生成）
  const initialProfile = {
    identity: selectedIdentity.value,
    profileMethod: profileMethod.value,
    generatedAt: new Date().toISOString(),
    version: 'v1'
  }
  localStorage.setItem('userProfile', JSON.stringify(initialProfile))
  
  // 跳转到路径沙盒，引导设置首个目标
  router.push('/path-sandbox')
}

// 处理URL参数，自动进入步骤3
onMounted(() => {
  // 先从localStorage恢复冷启动状态
  const savedStep = localStorage.getItem('onboardingStep')
  const savedIdentity = localStorage.getItem('userIdentity')
  const savedProfileMethod = localStorage.getItem('profileMethod')
  
  if (savedStep && savedIdentity && savedProfileMethod) {
    step.value = parseInt(savedStep)
    selectedIdentity.value = savedIdentity
    profileMethod.value = savedProfileMethod
  }
  
  // 检查URL参数，优先级高于localStorage恢复
  const stepParam = route.query.step
  if (stepParam === '3') {
    // 检查是否已选择身份
    const identity = localStorage.getItem('userIdentity')
    if (identity) {
      selectedIdentity.value = identity
    }
    
    // 设置step为3
    step.value = 3
    
    // 开始生成镜像
    generateProfile()
  } else if (step.value === 3) {
    // 如果是步骤3，开始生成镜像
    generateProfile()
  }
})

// 监听step变化，保存到localStorage
watch(step, (newStep) => {
  localStorage.setItem('onboardingStep', newStep.toString())
})

// 监听selectedIdentity变化，保存到localStorage
watch(selectedIdentity, (newIdentity) => {
  localStorage.setItem('userIdentity', newIdentity)
})

// 监听profileMethod变化，保存到localStorage
watch(profileMethod, (newMethod) => {
  localStorage.setItem('profileMethod', newMethod)
})
</script>

<style scoped>
.onboarding-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) 0;
}

.container {
  max-width: 800px;
  width: 100%;
  padding: 0 var(--spacing-md);
}

/* 进度指示器 */
.progress-container {
  margin-bottom: var(--spacing-xl);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 50px;
  right: 50px;
  height: 2px;
  background-color: var(--border-color);
  z-index: 1;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
  transition: all var(--transition-fast);
}

.step-text {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.progress-step.active .step-number {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.progress-step.completed .step-number {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

.progress-step.completed .step-text {
  color: var(--success-color);
}

/* 步骤内容 */
.step-content {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

/* 紧凑步骤样式 */
.compact-step {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.step-content h2 {
  font-size: var(--font-size-2xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.step-content p {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

/* 身份选项 */
.identity-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.identity-card {
  background-color: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.identity-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.identity-card.selected {
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}

.identity-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.identity-name {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.identity-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* 画像选项 */
.profile-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.profile-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.profile-card.selected {
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.profile-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.profile-name {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.profile-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
}

.profile-duration {
  font-size: var(--font-size-xs);
  color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.1);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full, 9999px);
  display: inline-block;
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

.return-btn {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  /* 返回按钮保持次要视觉层级 */
  opacity: 0.8;
}

.nav-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  opacity: 1;
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 加载动画 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.loading-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 6px solid var(--bg-secondary);
  border-top: 6px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

/* 进度条 */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--radius-full, 9999px);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* 数据来源 */
.data-sources {
  margin-top: var(--spacing-xl);
  text-align: left;
}

.data-sources h3 {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.source-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.source-icon {
  font-size: var(--font-size-lg);
  min-width: 24px;
}

.source-info {
  flex: 1;
}

.source-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.source-status {
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full, 9999px);
  display: inline-block;
}

.source-status.pending {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--warning-color);
}

.source-status.completed {
  background-color: rgba(82, 196, 26, 0.1);
  color: var(--success-color);
}

.source-status.processing {
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-color);
}

/* 数据融合部分样式 */
.data-fusion-section {
  margin-top: var(--spacing-lg);
  background-color: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.data-fusion-section h3 {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.fusion-progress-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.fusion-item {
  background-color: var(--bg-primary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.fusion-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.fusion-icon {
  font-size: var(--font-size-lg);
  min-width: 24px;
}

.fusion-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fusion-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.fusion-status {
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full, 9999px);
  display: inline-block;
}

.fusion-status.pending {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--warning-color);
}

.fusion-status.processing {
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-color);
}

.fusion-status.completed {
  background-color: rgba(82, 196, 26, 0.1);
  color: var(--success-color);
}

.fusion-progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-full, 9999px);
  overflow: hidden;
}

.fusion-progress-fill {
  height: 100%;
  border-radius: var(--radius-full, 9999px);
  transition: width 0.3s ease;
}

.fusion-progress-fill.pending {
  background-color: var(--warning-color);
}

.fusion-progress-fill.processing {
  background-color: var(--primary-color);
}

.fusion-progress-fill.completed {
  background-color: var(--success-color);
}

/* 加载容器优化 */
.loading-container {
  gap: var(--spacing-md);
}

.loading-animation {
  gap: var(--spacing-sm);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border-width: 5px;
}

.loading-text {
  font-size: var(--font-size-md);
}

/* AI测评样式 */
.assessment-progress-section {
  margin: var(--spacing-lg) 0;
  text-align: center;
}

.question-counter {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}

.assessment-question {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
}

.question-text {
  font-size: var(--font-size-lg);
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
  background-color: var(--bg-primary);
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

.assessment-completing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.completing-text {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-weight: 500;
}

/* 文件上传模态框 */
.file-upload-modal {
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
}

.modal-content {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.file-drop-area {
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.file-drop-area:hover {
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}

.drop-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.drop-text {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.file-input-label {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.file-input {
  display: none;
}

.file-requirements {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.uploaded-file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.file-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.file-size {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.remove-file-btn {
  background-color: var(--error-color);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.modal-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.cancel-btn {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.upload-btn {
  background-color: var(--primary-color);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .identity-options,
  .profile-options {
    grid-template-columns: 1fr;
  }
  
  .step-content {
    padding: var(--spacing-lg);
  }
  
  .step-content h2 {
    font-size: var(--font-size-xl);
  }
  
  .nav-buttons {
    flex-direction: column;
  }
}
</style>