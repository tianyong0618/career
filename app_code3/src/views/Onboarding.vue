<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 冷启动步骤
const step = ref(1)
const selectedStage = ref('')
const profileMethod = ref('')
const isLoading = ref(false)
const progress = ref(0)
const showFileUpload = ref(false)
const uploadedFile = ref(null)
const showSocialAuth = ref(false)
const companyInfo = ref({
  name: '',
  region: '',
  industry: '',
  description: ''
})
const firstGoal = ref('')

// 创业阶段选项
const stageOptions = [
  { value: 'planning', name: '筹备阶段', icon: '📋', description: '尚未正式运营，正在准备阶段' },
  { value: 'operating', name: '运营阶段', icon: '🚀', description: '已正式运营，寻求增长' },
  { value: 'expanding', name: '扩张阶段', icon: '📈', description: '业务稳定，准备扩张' }
]

// 画像生成选项
const profileOptions = [
  { value: 'info', name: '输入公司信息', icon: '📝', description: '手动输入公司基本信息' },
  { value: 'upload', name: '上传BP文档', icon: '📄', description: '上传现有商业计划书' },
  { value: 'social', name: '授权社交媒体', icon: '🔗', description: '授权读取公开信息' }
]

// 数据来源状态
const dataSources = ref([
  { id: 1, name: '结构化经历', icon: '📝', status: 'pending', statusText: '待处理', progress: 0 },
  { id: 2, name: '行为数据', icon: '📊', status: 'pending', statusText: '待处理', progress: 0 },
  { id: 3, name: '外部信号', icon: '🌐', status: 'pending', statusText: '待处理', progress: 0 },
  { id: 4, name: '政策数据', icon: '🏛️', status: 'pending', statusText: '待处理', progress: 0 }
])

// 目标选项
const goalOptions = [
  { value: 'generate-bp', name: '生成商业计划书' },
  { value: 'find-policy', name: '寻找政策补贴' },
  { value: 'manage-risk', name: '管理创业风险' },
  { value: 'find-resource', name: '寻找合作伙伴' }
]

// 计算属性：判断是否可以进入下一步
const canProceed = computed(() => {
  if (step.value === 1) {
    return selectedStage.value !== ''
  } else if (step.value === 2) {
    // 如果选择了输入公司信息，需要验证表单
    if (profileMethod.value === 'info') {
      return companyInfo.value.name && companyInfo.value.region && companyInfo.value.industry
    }
    return profileMethod.value !== ''
  } else if (step.value === 3) {
    return progress.value >= 100
  } else if (step.value === 4) {
    return firstGoal.value !== ''
  }
  return false
})

// 选择创业阶段
const selectStage = (stage) => {
  selectedStage.value = stage
}

// 选择画像生成方式
const selectProfileMethod = (method) => {
  profileMethod.value = method
  
  if (method === 'upload') {
    showFileUpload.value = true
  } else if (method === 'social') {
    showSocialAuth.value = true
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

// 授权社交媒体
const authorizeSocial = () => {
  showSocialAuth.value = false
  nextStep()
}

// 下一步
const nextStep = () => {
  if (step.value === 1 && !selectedStage.value) {
    return
  }
  
  if (step.value === 4) {
    // 完成冷启动
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

// 生成V1概览
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
      if (progress.value > 25) {
        dataSources.value[0].status = 'completed', 
        dataSources.value[0].statusText = '已完成',
        dataSources.value[0].progress = 100
      } else if (progress.value > 10) {
        dataSources.value[0].status = 'processing',
        dataSources.value[0].progress = Math.min(progress.value * 5, 100)
      }
      
      if (progress.value > 50) {
        dataSources.value[1].status = 'completed', 
        dataSources.value[1].statusText = '已完成',
        dataSources.value[1].progress = 100
      } else if (progress.value > 30) {
        dataSources.value[1].status = 'processing',
        dataSources.value[1].progress = Math.min((progress.value - 20) * 5, 100)
      }
      
      if (progress.value > 75) {
        dataSources.value[2].status = 'completed', 
        dataSources.value[2].statusText = '已完成',
        dataSources.value[2].progress = 100
      } else if (progress.value > 60) {
        dataSources.value[2].status = 'processing',
        dataSources.value[2].progress = Math.min((progress.value - 40) * 5, 100)
      }
      
      if (progress.value > 90) {
        dataSources.value[3].status = 'completed', 
        dataSources.value[3].statusText = '已完成',
        dataSources.value[3].progress = 100
      } else if (progress.value > 80) {
        dataSources.value[3].status = 'processing',
        dataSources.value[3].progress = Math.min((progress.value - 80) * 10, 100)
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
      
      // 生成完成后自动进入下一步
      setTimeout(() => {
        step.value = 4
      }, 1000) // 延迟1秒，让用户看到完成状态
    }
  }, 300)
}

// 完成冷启动
const completeOnboarding = () => {
  // 保存冷启动完成状态到localStorage
  localStorage.setItem('onboardingCompleted', 'true')
  localStorage.setItem('userStage', selectedStage.value)
  localStorage.setItem('profileMethod', profileMethod.value)
  localStorage.setItem('firstGoal', firstGoal.value)
  
  // 保存公司信息
  if (profileMethod.value === 'info') {
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo.value))
  }
  
  // 跳转到首页或对应的功能模块
  if (firstGoal.value === 'generate-bp') {
    router.push('/biz-plan-gen')
  } else if (firstGoal.value === 'find-policy') {
    router.push('/policy-match')
  } else if (firstGoal.value === 'manage-risk') {
    router.push('/risk-alert')
  } else if (firstGoal.value === 'find-resource') {
    router.push('/resource-hub')
  } else {
    router.push('/')
  }
}

// 从localStorage恢复冷启动状态
onMounted(() => {
  const savedStep = localStorage.getItem('onboardingStep')
  const savedStage = localStorage.getItem('userStage')
  const savedProfileMethod = localStorage.getItem('profileMethod')
  const savedCompanyInfo = localStorage.getItem('companyInfo')
  
  if (savedStep && savedStage && savedProfileMethod) {
    step.value = parseInt(savedStep)
    selectedStage.value = savedStage
    profileMethod.value = savedProfileMethod
    
    if (savedCompanyInfo) {
      companyInfo.value = JSON.parse(savedCompanyInfo)
    }
  }
})

// 监听step变化，保存到localStorage
watch(step, (newStep) => {
  localStorage.setItem('onboardingStep', newStep.toString())
})

// 监听创业阶段变化，保存到localStorage
watch(selectedStage, (newStage) => {
  localStorage.setItem('userStage', newStage)
})

// 监听画像方式变化，保存到localStorage
watch(profileMethod, (newMethod) => {
  localStorage.setItem('profileMethod', newMethod)
})

// 监听公司信息变化，保存到localStorage
watch(companyInfo, (newInfo) => {
  if (profileMethod.value === 'info') {
    localStorage.setItem('companyInfo', JSON.stringify(newInfo))
  }
}, { deep: true })
</script>

<template>
  <div class="onboarding">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>VenturePilot</h1>
    </header>
    
    <div class="container">
      <!-- 进度指示器 -->
      <div class="progress-container">
        <div class="progress-steps">
          <div class="progress-step" :class="{ active: step === 1, completed: step > 1 }">
            <span class="step-number">1</span>
            <span class="step-text">选择阶段</span>
          </div>
          <div class="progress-step" :class="{ active: step === 2, completed: step > 2 }">
            <span class="step-number">2</span>
            <span class="step-text">快速画像</span>
          </div>
          <div class="progress-step" :class="{ active: step === 3, completed: step > 3 }">
            <span class="step-number">3</span>
            <span class="step-text">生成概览</span>
          </div>
          <div class="progress-step" :class="{ active: step === 4, completed: step > 4 }">
            <span class="step-number">4</span>
            <span class="step-text">设置目标</span>
          </div>
        </div>
      </div>
      
      <!-- 主内容区域 -->
      <div class="onboarding-content">
        <!-- 步骤1：选择创业阶段 -->
        <div v-if="step === 1" class="step-content">
          <h2>欢迎加入VenturePilot</h2>
          <p>请选择您的创业阶段，我们将为您提供更精准的服务</p>
          
          <div class="stage-options">
            <div 
              class="stage-card" 
              v-for="stage in stageOptions" 
              :key="stage.value"
              @click="selectStage(stage.value)"
              :class="{ selected: selectedStage === stage.value }"
            >
              <div class="stage-icon">{{ stage.icon }}</div>
              <div class="stage-name">{{ stage.name }}</div>
              <div class="stage-desc">{{ stage.description }}</div>
            </div>
          </div>
        </div>
        
        <!-- 步骤2：快速画像 -->
        <div v-if="step === 2" class="step-content">
          <h2>创建您的创业画像</h2>
          <p>选择一种方式快速生成您的初始创业概览</p>
          
          <div class="profile-options">
            <div class="profile-card" @click="selectProfileMethod('info')" :class="{ selected: profileMethod === 'info' }">
              <div class="profile-icon">📝</div>
              <div class="profile-name">输入公司信息</div>
              <div class="profile-desc">手动输入公司基本信息</div>
            </div>
            
            <div class="profile-card" @click="selectProfileMethod('upload')" :class="{ selected: profileMethod === 'upload' }">
              <div class="profile-icon">📄</div>
              <div class="profile-name">上传BP文档</div>
              <div class="profile-desc">上传现有商业计划书</div>
            </div>
            
            <div class="profile-card" @click="selectProfileMethod('social')" :class="{ selected: profileMethod === 'social' }">
              <div class="profile-icon">🔗</div>
              <div class="profile-name">授权社交媒体</div>
              <div class="profile-desc">授权读取公开信息</div>
            </div>
          </div>
          
          <!-- 公司信息输入表单 -->
          <div v-if="profileMethod === 'info'" class="company-form">
            <h3>公司基本信息</h3>
            <div class="form-group">
              <label for="companyName">公司名称</label>
              <input 
                type="text" 
                id="companyName" 
                v-model="companyInfo.name"
                class="form-control"
                placeholder="请输入公司名称"
              />
            </div>
            
            <div class="form-group">
              <label for="companyRegion">所在区域</label>
              <input 
                type="text" 
                id="companyRegion" 
                v-model="companyInfo.region"
                class="form-control"
                placeholder="请输入所在区域"
              />
            </div>
            
            <div class="form-group">
              <label for="companyIndustry">行业类型</label>
              <input 
                type="text" 
                id="companyIndustry" 
                v-model="companyInfo.industry"
                class="form-control"
                placeholder="请输入行业类型"
              />
            </div>
            
            <div class="form-group">
              <label for="companyDesc">公司描述</label>
              <textarea 
                id="companyDesc" 
                v-model="companyInfo.description"
                class="form-control"
                rows="3"
                placeholder="请简要描述公司业务"
              ></textarea>
            </div>
          </div>
        </div>
        
        <!-- 步骤3：生成V1概览 -->
        <div v-if="step === 3" class="step-content">
          <h2>生成创业概览</h2>
          <p>正在融合多源数据，生成您的创业V1概览...</p>
          
          <div class="loading-container">
            <div class="loading-animation">
              <div class="loading-spinner"></div>
              <div class="loading-text">正在生成...</div>
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
        
        <!-- 步骤4：引导设置首个目标 -->
        <div v-if="step === 4" class="step-content">
          <h2>设置您的首个目标</h2>
          <p>选择一个目标，我们将引导您开始创业之旅</p>
          
          <div class="goal-options">
            <div 
              class="goal-card" 
              v-for="goal in goalOptions" 
              :key="goal.value"
              @click="firstGoal = goal.value"
              :class="{ selected: firstGoal === goal.value }"
            >
              <div class="goal-name">{{ goal.name }}</div>
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
          class="nav-btn next-btn" 
          @click="nextStep"
          :disabled="!canProceed"
        >
          {{ step === 4 ? '开始创业之旅' : '下一步' }}
        </button>
      </div>
      
      <!-- 文件上传模态框 -->
      <div class="file-upload-modal" v-if="showFileUpload">
        <div class="modal-content">
          <h3>上传BP文档</h3>
          <div class="file-drop-area" @dragover.prevent @drop.prevent="handleFileDrop">
            <div class="drop-icon">📁</div>
            <div class="drop-text">拖放文件到此处，或</div>
            <label class="file-input-label">
              <input 
                type="file" 
                class="file-input" 
                @change="handleFileSelect"
                accept=".pdf,.doc,.docx,.txt"
              />
              选择文件
            </label>
            <div class="file-requirements">支持PDF、Word、TXT文档，最大10MB</div>
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
              开始上传
            </button>
          </div>
        </div>
      </div>
      
      <!-- 社交媒体授权模态框 -->
      <div class="social-auth-modal" v-if="showSocialAuth">
        <div class="modal-content">
          <h3>授权社交媒体</h3>
          <p>我们将读取您的公开信息，用于生成更精准的创业概览</p>
          
          <div class="auth-options">
            <div class="auth-card">
              <div class="auth-icon">📱</div>
              <div class="auth-name">微信授权</div>
              <div class="auth-desc">使用微信账号授权</div>
              <button class="auth-btn wechat-btn">微信授权</button>
            </div>
            
            <div class="auth-card">
              <div class="auth-icon">🐦</div>
              <div class="auth-name">微博授权</div>
              <div class="auth-desc">使用微博账号授权</div>
              <button class="auth-btn weibo-btn">微博授权</button>
            </div>
          </div>
          
          <div class="modal-actions">
            <button class="modal-btn cancel-btn" @click="showSocialAuth = false">取消</button>
            <button class="modal-btn auth-btn primary-btn" @click="authorizeSocial">
              跳过授权
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.onboarding {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

/* 进度指示器 */
.progress-container {
  margin-bottom: 2rem;
  text-align: center;
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
  background-color: #e8e8e8;
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
  background-color: white;
  border: 2px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #8c8c8c;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.step-text {
  font-size: 0.8rem;
  color: #8c8c8c;
}

.progress-step.active .step-number {
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
}

.progress-step.completed .step-number {
  background-color: #52c41a;
  border-color: #52c41a;
  color: white;
}

.progress-step.completed .step-text {
  color: #52c41a;
}

/* 步骤内容 */
.step-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.step-content h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.step-content p {
  color: #8c8c8c;
  margin-bottom: 2rem;
}

/* 创业阶段选项 */
.stage-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stage-card {
  background-color: #fafafa;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.stage-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stage-card.selected {
  border-color: #1890ff;
  background-color: rgba(24, 144, 255, 0.05);
}

.stage-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stage-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.stage-desc {
  font-size: 0.9rem;
  color: #8c8c8c;
}

/* 画像选项 */
.profile-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.profile-card {
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #1890ff;
}

.profile-card.selected {
  border-color: #1890ff;
  background-color: rgba(24, 144, 255, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.profile-desc {
  font-size: 0.9rem;
  color: #8c8c8c;
}

/* 公司信息表单 */
.company-form {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
}

.company-form h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

/* 目标选项 */
.goal-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.goal-card {
  background-color: #fafafa;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.goal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.goal-card.selected {
  border-color: #1890ff;
  background-color: rgba(24, 144, 255, 0.05);
}

.goal-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
}

/* 导航按钮 */
.nav-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.nav-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.back-btn {
  background-color: #fafafa;
  color: #333;
  border: 1px solid #e8e8e8;
}

.next-btn {
  background-color: #1890ff;
  color: white;
}

.next-btn:disabled {
  background-color: #e8e8e8;
  color: #8c8c8c;
  cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 加载动画 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 2rem 0;
}

.loading-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 6px solid #fafafa;
  border-top: 6px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #8c8c8c;
  font-size: 1rem;
}

/* 进度条 */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #fafafa;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #1890ff;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #8c8c8c;
  font-size: 0.9rem;
}

/* 数据融合部分样式 */
.data-fusion-section {
  margin-top: 2rem;
  background-color: #fafafa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
}

.data-fusion-section h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.fusion-progress-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fusion-item {
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
}

.fusion-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.fusion-icon {
  font-size: 1.2rem;
  min-width: 24px;
}

.fusion-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fusion-name {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

.fusion-status {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  display: inline-block;
}

.fusion-status.pending {
  background-color: rgba(250, 173, 20, 0.1);
  color: #faad14;
}

.fusion-status.processing {
  background-color: rgba(24, 144, 255, 0.1);
  color: #1890ff;
}

.fusion-status.completed {
  background-color: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.fusion-progress-bar {
  width: 100%;
  height: 6px;
  background-color: #fafafa;
  border-radius: 3px;
  overflow: hidden;
}

.fusion-progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.fusion-progress-fill.pending {
  background-color: #faad14;
}

.fusion-progress-fill.processing {
  background-color: #1890ff;
}

.fusion-progress-fill.completed {
  background-color: #52c41a;
}

/* 文件上传模态框 */
.file-upload-modal, .social-auth-modal {
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
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.file-drop-area {
  border: 2px dashed #e8e8e8;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-drop-area:hover {
  border-color: #1890ff;
  background-color: rgba(24, 144, 255, 0.05);
}

.drop-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.drop-text {
  font-size: 1rem;
  color: #8c8c8c;
  margin-bottom: 1rem;
}

.file-input-label {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.file-input-label:hover {
  background-color: #40a9ff;
}

.file-input {
  display: none;
}

.file-requirements {
  font-size: 0.8rem;
  color: #bfbfbf;
}

.uploaded-file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.file-info {
  flex: 1;
  text-align: left;
}

.file-name {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.file-size {
  font-size: 0.8rem;
  color: #bfbfbf;
}

.remove-file-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-file-btn:hover {
  background-color: #ff7875;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.modal-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  max-width: 150px;
}

.cancel-btn {
  background-color: #fafafa;
  color: #333;
  border: 1px solid #e8e8e8;
}

.upload-btn, .auth-btn {
  background-color: #1890ff;
  color: white;
}

.primary-btn {
  background-color: #1890ff;
  color: white;
}

.modal-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 社交媒体授权选项 */
.auth-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.auth-card {
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.auth-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.auth-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.auth-desc {
  font-size: 0.9rem;
  color: #8c8c8c;
  margin-bottom: 1.5rem;
}

.auth-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wechat-btn {
  background-color: #07c160;
  color: white;
}

.weibo-btn {
  background-color: #e6162d;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .step-content {
    padding: 1.5rem 1rem;
  }
  
  .stage-options,
  .profile-options,
  .goal-options {
    grid-template-columns: 1fr;
  }
  
  .nav-buttons {
    flex-direction: column;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
}
</style>