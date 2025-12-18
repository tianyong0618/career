<script setup>
import { ref } from 'vue';

// 表单数据
const formData = ref({
  industry: '餐饮',
  idea: '我想开一家健康轻食店，主打有机食材',
  stage: '筹备阶段'
});

// BP生成状态
const isGenerating = ref(false);
const showBP = ref(true); // 默认显示生成的BP

// 生成BP
const generateBP = () => {
  isGenerating.value = true;
  // 模拟生成过程
  setTimeout(() => {
    isGenerating.value = false;
    showBP.value = true;
  }, 1500);
};

// 导出BP
const exportBP = () => {
  alert('商业计划书已导出为PDF格式！（模拟功能）');
};

// 行业选项
const industryOptions = ['餐饮', '电商', '科技', '教育', '医疗', '金融', '文旅'];
</script>

<template>
  <div class="biz-plan-gen">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>VenturePilot</h1>
    </header>
    
    <div class="content-container">
      <!-- 左侧：输入表单 -->
      <div class="input-section">
        <div class="card">
          <h2>Step 1：输入基本信息</h2>
          
          <form class="biz-plan-form">
            <div class="form-group">
              <label for="industry" class="form-label">行业选择</label>
              <select 
                id="industry" 
                v-model="formData.industry" 
                class="form-control"
              >
                <option v-for="option in industryOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="stage" class="form-label">项目阶段</label>
              <input 
                type="text" 
                id="stage" 
                v-model="formData.stage" 
                class="form-control"
                placeholder="例如：筹备阶段、种子轮、A轮"
              >
            </div>
            
            <div class="form-group">
              <label for="idea" class="form-label">项目想法</label>
              <textarea 
                id="idea" 
                v-model="formData.idea" 
                class="form-control"
                rows="4"
                placeholder="请简要描述您的创业想法..."
              ></textarea>
            </div>
            
            <button 
              type="button" 
              class="primary-btn"
              @click="generateBP"
              :disabled="isGenerating"
            >
              {{ isGenerating ? '生成中...' : '生成商业计划书' }}
            </button>
          </form>
        </div>
      </div>
      
      <!-- 右侧：生成的BP -->
      <div class="bp-section" v-if="showBP">
        <div class="card">
          <div class="bp-header">
            <h2>生成的商业计划书</h2>
            <button class="secondary-btn" @click="exportBP">
              导出PDF
            </button>
          </div>
          
          <div class="bp-content">
            <h3>1. 项目概述</h3>
            <p>本项目是一家专注于{{ formData.industry }}行业的创新企业，目前处于{{ formData.stage }}。</p>
            <p>{{ formData.idea }}</p>
            
            <h3>2. 行业分析</h3>
            <p>{{ formData.industry }}行业正处于快速发展阶段，市场潜力巨大。随着消费者需求的变化，我们的创新模式具有明显的竞争优势。</p>
            
            <h3>3. 商业模式</h3>
            <p>我们采用独特的商业模式，通过整合资源、优化流程，实现了成本降低和效率提升。</p>
            
            <h3>4. 团队介绍</h3>
            <p>核心团队成员拥有丰富的行业经验和专业背景，具备较强的执行能力和创新精神。</p>
            
            <h3>5. 财务规划</h3>
            <p>根据我们的预测，项目将在2-3年内实现盈利，并具备良好的增长潜力。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.biz-plan-gen {
  max-width: 420px;
  margin: 0 auto;
  padding: 80px 1rem 1rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.card h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all 0.3s;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

.primary-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-btn:hover:not(:disabled) {
  background-color: #40a9ff;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.primary-btn:disabled {
  background-color: var(--text-tertiary);
  cursor: not-allowed;
}

.secondary-btn {
  padding: 0.5rem 1rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-btn:hover {
  background-color: var(--border-color);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.bp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.bp-content {
  line-height: 1.6;
}

.bp-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.bp-content h3:first-child {
  margin-top: 0;
}

.bp-content p {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .card {
    padding: 1rem;
  }
  
  .bp-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .bp-header button {
    width: 100%;
  }
}
</style>