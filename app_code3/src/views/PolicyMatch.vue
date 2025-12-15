<script setup>
import { ref } from 'vue'
import { policies, industries, startupStages } from '../data/mockData.js'

// 步骤状态
const currentStep = ref(1)
const maxSteps = 2

// 公司信息表单数据
const companyInfo = ref({
  name: '',
  region: '',
  industry: '',
  stage: ''
})

// 匹配的政策列表
const matchedPolicies = ref([])

// 选中的政策详情
const selectedPolicy = ref(null)
const showPolicyDetail = ref(false)

// 模拟政策匹配
const matchPolicies = () => {
  // 模拟API调用，根据公司信息匹配政策
  matchedPolicies.value = policies
  currentStep.value = 2
}

// 查看政策详情
const viewPolicyDetail = (policy) => {
  selectedPolicy.value = policy
  showPolicyDetail.value = true
}

// 关闭政策详情
const closePolicyDetail = () => {
  showPolicyDetail.value = false
  selectedPolicy.value = null
}

// 模拟一键申请
const applyPolicy = () => {
  // 模拟申请功能
  alert(`已提交${selectedPolicy.value.title}的申请！（模拟功能）`)
  closePolicyDetail()
}

// 重置表单
const resetForm = () => {
  companyInfo.value = {
    name: '',
    region: '',
    industry: '',
    stage: ''
  }
  matchedPolicies.value = []
  currentStep.value = 1
}

// 上一步
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>

<template>
  <div class="policy-match">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>政策匹配引擎</h1>
    </header>
    
    <!-- 步骤指示器 -->
    <div class="steps-indicator">
      <div 
        class="step-item" 
        v-for="step in maxSteps" 
        :key="step"
        :class="{ 'active': step === currentStep, 'completed': step < currentStep }"
      >
        <div class="step-number">{{ step }}</div>
        <div class="step-title">
          {{ step === 1 ? '公司信息' : '政策匹配结果' }}
        </div>
      </div>
    </div>
    
    <!-- 步骤内容 -->
    <div class="step-content">
      <!-- 步骤1：公司信息输入 -->
      <div v-if="currentStep === 1" class="fade-in">
        <div class="card">
          <h2>第一步：输入公司信息</h2>
          <form class="company-info-form">
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
              <label for="region">所在区域</label>
              <input 
                type="text" 
                id="region" 
                v-model="companyInfo.region"
                class="form-control"
                placeholder="请输入所在区域，例如：北京市朝阳区"
              />
            </div>
            
            <div class="form-group">
              <label for="industry">行业类型</label>
              <select 
                id="industry" 
                v-model="companyInfo.industry"
                class="form-control"
              >
                <option value="">请选择行业</option>
                <option v-for="industry in industries" :key="industry" :value="industry">
                  {{ industry }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="stage">创业阶段</label>
              <select 
                id="stage" 
                v-model="companyInfo.stage"
                class="form-control"
              >
                <option value="">请选择创业阶段</option>
                <option v-for="stage in startupStages" :key="stage" :value="stage">
                  {{ stage }}
                </option>
              </select>
            </div>
            
            <div class="form-actions">
              <button 
                type="button" 
                class="primary" 
                :disabled="!companyInfo.name || !companyInfo.region || !companyInfo.industry || !companyInfo.stage"
                @click="matchPolicies"
              >
                开始匹配政策 →
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- 步骤2：政策匹配结果 -->
      <div v-if="currentStep === 2" class="fade-in">
        <div class="card">
          <div class="step-header">
            <h2>第二步：政策匹配结果</h2>
            <div class="action-buttons">
              <button type="button" class="secondary" @click="prevStep">
                ← 重新输入
              </button>
              <button type="button" class="secondary" @click="resetForm">
                🔄 重新匹配
              </button>
            </div>
          </div>
          
          <div class="policies-result">
            <div class="result-summary">
              <h3>为您匹配到 {{ matchedPolicies.length }} 项政策</h3>
              <p class="summary-desc">
                根据您的公司信息，我们为您匹配了以下适合的政策补贴与优惠
              </p>
            </div>
            
            <div class="policies-list">
              <div 
                class="policy-card" 
                v-for="policy in matchedPolicies" 
                :key="policy.id"
                @click="viewPolicyDetail(policy)"
              >
                <div class="policy-header">
                  <div class="policy-type-badge" :class="policy.type.toLowerCase()">
                    {{ policy.type }}
                  </div>
                  <div class="policy-deadline">
                    截止日期：{{ policy.deadline }}
                  </div>
                </div>
                
                <h4 class="policy-title">{{ policy.title }}</h4>
                <p class="policy-description">{{ policy.description }}</p>
                
                <div class="policy-amount">
                  <span class="amount-label">补贴金额：</span>
                  <span class="amount-value">{{ policy.amount }}</span>
                </div>
                
                <div class="policy-action">
                  <button type="button" class="primary" @click.stop="viewPolicyDetail(policy)">
                    查看详情 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 政策详情模态框 -->
    <div v-if="showPolicyDetail && selectedPolicy" class="modal-overlay" @click="closePolicyDetail">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedPolicy.title }}</h2>
          <button type="button" class="close-btn" @click="closePolicyDetail">
            ✕
          </button>
        </div>
        
        <div class="modal-body">
          <div class="policy-detail-section">
            <h3>政策类型</h3>
            <div class="policy-type-badge" :class="selectedPolicy.type.toLowerCase()">
              {{ selectedPolicy.type }}
            </div>
          </div>
          
          <div class="policy-detail-section">
            <h3>补贴金额</h3>
            <p class="policy-amount-detail">{{ selectedPolicy.amount }}</p>
          </div>
          
          <div class="policy-detail-section">
            <h3>申请截止日期</h3>
            <p>{{ selectedPolicy.deadline }}</p>
          </div>
          
          <div class="policy-detail-section">
            <h3>政策描述</h3>
            <p>{{ selectedPolicy.description }}</p>
          </div>
          
          <div class="policy-detail-section">
            <h3>申请条件</h3>
            <p>{{ selectedPolicy.eligibility }}</p>
          </div>
          
          <div class="policy-detail-section">
            <h3>申请步骤</h3>
            <ol class="application-steps">
              <li v-for="(step, index) in selectedPolicy.applicationSteps" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="secondary" @click="closePolicyDetail">
            关闭
          </button>
          <button type="button" class="success" @click="applyPolicy">
            📄 一键申请
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.policy-match {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 步骤指示器 */
.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  flex: 1;
}

.step-item::after {
  content: '';
  position: absolute;
  top: 15px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: var(--border-color);
  z-index: 1;
}

.step-item:last-child::after {
  display: none;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--border-color);
  color: var(--text-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 2;
  transition: all 0.3s;
}

.step-item.active .step-number {
  background-color: var(--primary-color);
  color: white;
}

.step-item.completed .step-number {
  background-color: var(--success-color);
  color: white;
}

.step-title {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: center;
  z-index: 2;
}

.step-item.active .step-title {
  color: var(--primary-color);
  font-weight: 500;
}

.step-item.completed .step-title {
  color: var(--success-color);
  font-weight: 500;
}

/* 步骤内容 */
.step-content {
  margin-bottom: 2rem;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.step-header h2 {
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

/* 表单样式 */
.company-info-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-primary);
}

.form-control {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1em;
  font-family: inherit;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.form-actions {
  margin-top: 1rem;
  text-align: center;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 政策匹配结果样式 */
.policies-result {
  margin-top: 1rem;
}

.result-summary {
  margin-bottom: 1.5rem;
}

.summary-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.policies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.policy-card {
  background-color: var(--bg-secondary);
  padding: 1.2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
}

.policy-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.policy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.policy-type-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

.policy-type-badge.政府补贴 {
  background-color: var(--primary-color);
}

.policy-type-badge.税收优惠 {
  background-color: var(--success-color);
}

.policy-type-badge.创业园区 {
  background-color: var(--warning-color);
}

.policy-deadline {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.policy-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.policy-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.policy-amount {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.amount-label {
  color: var(--text-secondary);
}

.amount-value {
  font-weight: 600;
  color: var(--primary-color);
}

.policy-action {
  text-align: right;
}

/* 模态框样式 */
.modal-overlay {
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
  padding: 1rem;
}

.modal-content {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: all 0.3s;
}

.close-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}

.policy-detail-section {
  margin-bottom: 1.5rem;
}

.policy-detail-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.policy-amount-detail {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
}

.application-steps {
  list-style-type: decimal;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.application-steps li {
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .step-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .action-buttons button {
    flex: 1;
  }
  
  .modal-content {
    margin: 0.5rem;
    max-height: 90vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer button {
    width: 100%;
  }
}
</style>