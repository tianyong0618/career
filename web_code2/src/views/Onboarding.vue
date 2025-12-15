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
            <div class="profile-card" @click="selectProfileMethod('upload')">
              <div class="profile-icon">📁</div>
              <div class="profile-name">上传简历</div>
              <div class="profile-desc">上传PDF/Word格式简历，AI自动解析</div>
              <div class="profile-duration">约1分钟</div>
            </div>
            
            <div class="profile-card" @click="selectProfileMethod('assessment')">
              <div class="profile-icon">📝</div>
              <div class="profile-name">AI测评</div>
              <div class="profile-desc">10分钟情景题+语音面试，深度了解您</div>
              <div class="profile-duration">约10分钟</div>
            </div>
            
            <div class="profile-card" @click="selectProfileMethod('authorize')">
              <div class="profile-icon">🔗</div>
              <div class="profile-name">授权平台</div>
              <div class="profile-desc">授权飞书/钉钉，仅读取日历与文档标题</div>
              <div class="profile-duration">约30秒</div>
            </div>
          </div>
        </div>
        
        <!-- 步骤3：生成镜像 -->
        <div v-if="step === 3" class="step-content">
          <div class="loading-container">
            <div class="loading-animation">
              <div class="loading-spinner"></div>
              <div class="loading-text">正在生成您的职业镜像...</div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="progress-text">{{ progress }}% 完成</div>
          </div>
          
          <div class="data-sources" v-if="progress > 0">
            <h3>数据融合中...</h3>
            <div class="source-item" v-for="source in dataSources" :key="source.id">
              <div class="source-icon">{{ source.icon }}</div>
              <div class="source-info">
                <div class="source-name">{{ source.name }}</div>
                <div class="source-status" :class="source.status">
                  {{ source.statusText }}
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
          :disabled="step === 1"
        >
          上一步
        </button>
        <button 
          class="nav-btn next-btn" 
          @click="nextStep" 
          :disabled="(step === 1 && !selectedIdentity) || isLoading"
        >
          {{ step === 3 ? '完成' : '下一步' }}
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  selectedIdentity.value = identity
}

// 选择画像生成方式
const selectProfileMethod = (method) => {
  profileMethod.value = method
  
  if (method === 'upload') {
    showFileUpload.value = true
  } else {
    nextStep()
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

// 上一步
const previousStep = () => {
  if (step.value > 1) {
    step.value--
  }
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

// 生成职业镜像
const generateProfile = () => {
  isLoading.value = true
  
  // 模拟生成过程
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 10
      
      // 更新数据来源状态
      if (progress.value > 20) dataSources.value[0].status = 'completed', dataSources.value[0].statusText = '已完成'
      if (progress.value > 40) dataSources.value[1].status = 'completed', dataSources.value[1].statusText = '已完成'
      if (progress.value > 60) dataSources.value[2].status = 'completed', dataSources.value[2].statusText = '已完成'
      if (progress.value > 80) dataSources.value[3].status = 'completed', dataSources.value[3].statusText = '已完成'
      if (progress.value > 95) dataSources.value[4].status = 'completed', dataSources.value[4].statusText = '已完成'
    } else {
      progress.value = 100
      clearInterval(interval)
      isLoading.value = false
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
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  text-align: center;
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