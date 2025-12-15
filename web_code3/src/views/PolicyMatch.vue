<script setup>
import { ref } from 'vue';
import { mockData } from '../mock/data';

// 表单数据
const formData = ref({
  companyName: 'XX健康轻食',
  region: 'XX区',
  industry: '餐饮',
  stage: '筹备阶段'
});

// 匹配状态
const isMatching = ref(false);
const matchedPolicies = ref(mockData.policies); // 默认显示匹配的政策

// 匹配政策
const matchPolicies = () => {
  isMatching.value = true;
  // 模拟匹配过程
  setTimeout(() => {
    isMatching.value = false;
    matchedPolicies.value = mockData.policies;
  }, 1500);
};

// 申请政策
const applyPolicy = (policyId) => {
  alert(`已为您准备好政策 "${mockData.policies.find(p => p.id === policyId)?.name}" 的申请材料！（模拟功能）`);
};

// 行业选项
const industryOptions = ['餐饮', '电商', '科技', '教育', '医疗', '金融', '文旅'];

// 阶段选项
const stageOptions = ['筹备阶段', '初创阶段', '成长阶段', '扩张阶段'];
</script>

<template>
  <div class="policy-match-page">
    <h1 class="page-title">政策匹配引擎</h1>
    
    <div class="content-container">
      <!-- 左侧：输入表单 -->
      <div class="input-section">
        <div class="form-card">
          <h2 class="section-title">Step 1：输入公司信息</h2>
          
          <form class="policy-form">
            <div class="form-group">
              <label for="companyName" class="form-label">公司名称</label>
              <input 
                type="text" 
                id="companyName" 
                v-model="formData.companyName" 
                class="form-input"
                placeholder="请输入公司名称"
              />
            </div>
            
            <div class="form-group">
              <label for="region" class="form-label">所在区域</label>
              <input 
                type="text" 
                id="region" 
                v-model="formData.region" 
                class="form-input"
                placeholder="请输入所在区域"
              />
            </div>
            
            <div class="form-group">
              <label for="industry" class="form-label">行业类型</label>
              <select 
                id="industry" 
                v-model="formData.industry" 
                class="form-select"
              >
                <option v-for="industry in industryOptions" :key="industry" :value="industry">
                  {{ industry }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="stage" class="form-label">创业阶段</label>
              <select 
                id="stage" 
                v-model="formData.stage" 
                class="form-select"
              >
                <option v-for="stage in stageOptions" :key="stage" :value="stage">
                  {{ stage }}
                </option>
              </select>
            </div>
            
            <div class="form-actions">
              <button 
                type="button" 
                class="btn btn-primary" 
                @click="matchPolicies" 
                :disabled="isMatching"
              >
                {{ isMatching ? '匹配中...' : '开始匹配政策' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- 右侧：政策匹配结果 -->
      <div class="result-section">
        <div class="result-header">
          <h2 class="section-title">Step 2：政策匹配结果</h2>
          <div class="result-stats">
            <span class="stats-text">共找到 {{ matchedPolicies.length }} 项匹配政策</span>
          </div>
        </div>
        
        <!-- 匹配中状态 -->
        <div v-if="isMatching" class="matching-state">
          <div class="loading-spinner">
            <span class="spinner-icon">🔄</span>
            <h3>正在匹配政策...</h3>
            <p>请稍候，AI正在为您匹配最适合的政策</p>
          </div>
        </div>
        
        <!-- 政策列表 -->
        <div v-else class="policies-list">
          <div 
            v-for="policy in matchedPolicies" 
            :key="policy.id" 
            class="policy-card"
          >
            <div class="policy-header">
              <h3 class="policy-name">{{ policy.name }}</h3>
              <div class="policy-amount">{{ policy.amount }}</div>
            </div>
            
            <div class="policy-body">
              <div class="policy-description">{{ policy.description }}</div>
              
              <div class="policy-meta">
                <div class="meta-item">
                  <span class="meta-label">截止日期：</span>
                  <span class="meta-value">{{ policy.deadline }}</span>
                </div>
              </div>
              
              <div class="policy-requirements">
                <h4 class="sub-title">申请条件</h4>
                <ul class="requirements-list">
                  <li v-for="(req, index) in policy.requirements" :key="index" class="requirement-item">
                    • {{ req }}
                  </li>
                </ul>
              </div>
              
              <div class="policy-steps">
                <h4 class="sub-title">申请步骤</h4>
                <ol class="steps-list">
                  <li v-for="(step, index) in policy.applicationSteps" :key="index" class="step-item">
                    <span class="step-number">{{ index + 1 }}</span>
                    <span class="step-text">{{ step }}</span>
                  </li>
                </ol>
              </div>
            </div>
            
            <div class="policy-footer">
              <button 
                type="button" 
                class="btn btn-primary" 
                @click="applyPolicy(policy.id)"
              >
                一键申请
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.policy-match-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.content-container {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 24px;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-card,
.policy-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  transition: var(--transition);
}

.form-card:hover,
.policy-card:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.policy-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input,
.form-select {
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: var(--transition);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.form-actions {
  margin-top: 8px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background-color: var(--primary-blue);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #40a9ff;
  box-shadow: var(--shadow-sm);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -8px;
}

.result-stats {
  font-size: 14px;
  color: var(--text-secondary);
}

.matching-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.loading-spinner {
  text-align: center;
}

.spinner-icon {
  font-size: 48px;
  animation: spin 2s linear infinite;
  display: block;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.loading-spinner p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.policies-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.policy-card {
  border-left: 4px solid var(--primary-blue);
}

.policy-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
}

.policy-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.policy-amount {
  background-color: rgba(82, 196, 26, 0.1);
  color: var(--success-green);
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
}

.policy-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.policy-description {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
}

.policy-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.meta-label {
  color: var(--text-secondary);
}

.meta-value {
  color: var(--text-primary);
  font-weight: 500;
}

.sub-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.policy-requirements,
.policy-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.requirements-list,
.steps-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.requirement-item {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.4;
  padding-left: 4px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.4;
}

.step-number {
  width: 24px;
  height: 24px;
  background-color: var(--primary-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-text {
  flex: 1;
}

.policy-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .form-card,
  .policy-card {
    padding: 16px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .policy-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .policy-amount {
    align-self: flex-start;
  }
}
</style>