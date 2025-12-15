<script setup>
import { ref } from 'vue';
import { mockData } from '../mock/data';

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
  <div class="biz-plan-gen-page">
    <h1 class="page-title">商业计划书生成器</h1>
    
    <div class="content-container">
      <!-- 左侧：输入表单 -->
      <div class="input-section">
        <div class="form-card">
          <h2 class="section-title">Step 1：输入基本信息</h2>
          
          <form class="biz-plan-form">
            <div class="form-group">
              <label for="industry" class="form-label">行业选择</label>
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
              <label for="idea" class="form-label">创意点子</label>
              <textarea 
                id="idea" 
                v-model="formData.idea" 
                class="form-textarea"
                rows="4"
                placeholder="请简要描述您的创业想法..."
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="stage" class="form-label">创业阶段</label>
              <select 
                id="stage" 
                v-model="formData.stage" 
                class="form-select"
              >
                <option value="筹备阶段">筹备阶段</option>
                <option value="初创阶段">初创阶段</option>
                <option value="成长阶段">成长阶段</option>
                <option value="扩张阶段">扩张阶段</option>
              </select>
            </div>
            
            <div class="form-actions">
              <button 
                type="button" 
                class="btn btn-primary" 
                @click="generateBP" 
                :disabled="isGenerating"
              >
                {{ isGenerating ? '生成中...' : '生成BP草稿' }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- 导出功能 -->
        <div class="export-section" v-if="showBP">
          <div class="export-card">
            <h3 class="section-title">导出选项</h3>
            <div class="export-buttons">
              <button type="button" class="btn btn-secondary" @click="exportBP">
                📄 导出为PDF
              </button>
              <button type="button" class="btn btn-secondary">
                📝 导出为Word
              </button>
              <button type="button" class="btn btn-secondary">
                💾 保存草稿
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧：BP生成结果 -->
      <div class="result-section" v-if="showBP">
        <div class="bp-card">
          <div class="bp-header">
            <h2 class="bp-title">{{ mockData.bpTemplate.companyInfo.name }} - 商业计划书</h2>
            <div class="bp-meta">
              <span class="meta-item">行业：{{ mockData.bpTemplate.companyInfo.industry }}</span>
              <span class="meta-item">阶段：{{ mockData.bpTemplate.companyInfo.stage }}</span>
            </div>
          </div>
          
          <div class="bp-content">
            <!-- 公司简介 -->
            <section class="bp-section">
              <h3 class="section-title">一、公司简介</h3>
              <div class="section-content">
                <p>{{ mockData.bpTemplate.companyInfo.description }}</p>
              </div>
            </section>
            
            <!-- 市场分析 -->
            <section class="bp-section">
              <h3 class="section-title">二、市场分析</h3>
              <div class="section-content">
                <h4>行业概况</h4>
                <p>{{ mockData.bpTemplate.marketAnalysis.industryOverview }}</p>
                
                <h4>目标受众</h4>
                <p>{{ mockData.bpTemplate.marketAnalysis.targetAudience }}</p>
                
                <h4>竞品分析</h4>
                <div class="competitor-table">
                  <table>
                    <thead>
                      <tr>
                        <th>竞品名称</th>
                        <th>优势</th>
                        <th>劣势</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(competitor, index) in mockData.bpTemplate.marketAnalysis.competitors" :key="index">
                        <td>{{ competitor.name }}</td>
                        <td>{{ competitor.strength }}</td>
                        <td>{{ competitor.weakness }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            
            <!-- 产品与服务 -->
            <section class="bp-section">
              <h3 class="section-title">三、产品与服务</h3>
              <div class="section-content">
                <h4>产品列表</h4>
                <ul class="product-list">
                  <li v-for="(product, index) in mockData.bpTemplate.productService.products" :key="index">
                    {{ product }}
                  </li>
                </ul>
                
                <h4>产品特点</h4>
                <ul class="feature-list">
                  <li v-for="(feature, index) in mockData.bpTemplate.productService.features" :key="index">
                    • {{ feature }}
                  </li>
                </ul>
              </div>
            </section>
            
            <!-- 商业模式 -->
            <section class="bp-section">
              <h3 class="section-title">四、商业模式</h3>
              <div class="section-content">
                <h4>收入来源</h4>
                <div class="business-model-grid">
                  <div v-for="(stream, index) in mockData.bpTemplate.businessModel.revenueStreams" :key="index" class="model-item">
                    <span class="model-icon">💰</span>
                    <span class="model-text">{{ stream }}</span>
                  </div>
                </div>
                
                <h4>成本结构</h4>
                <div class="business-model-grid">
                  <div v-for="(cost, index) in mockData.bpTemplate.businessModel.costStructure" :key="index" class="model-item">
                    <span class="model-icon">💸</span>
                    <span class="model-text">{{ cost }}</span>
                  </div>
                </div>
                
                <h4>定价策略</h4>
                <p>{{ mockData.bpTemplate.businessModel.pricingStrategy }}</p>
              </div>
            </section>
            
            <!-- 财务预测 -->
            <section class="bp-section">
              <h3 class="section-title">五、财务预测</h3>
              <div class="section-content">
                <div class="financial-table">
                  <table>
                    <thead>
                      <tr>
                        <th>年份</th>
                        <th>收入</th>
                        <th>利润</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>第1年</td>
                        <td>{{ mockData.bpTemplate.financialForecast.year1.revenue }}</td>
                        <td>{{ mockData.bpTemplate.financialForecast.year1.profit }}</td>
                      </tr>
                      <tr>
                        <td>第2年</td>
                        <td>{{ mockData.bpTemplate.financialForecast.year2.revenue }}</td>
                        <td>{{ mockData.bpTemplate.financialForecast.year2.profit }}</td>
                      </tr>
                      <tr>
                        <td>第3年</td>
                        <td>{{ mockData.bpTemplate.financialForecast.year3.revenue }}</td>
                        <td>{{ mockData.bpTemplate.financialForecast.year3.profit }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <!-- 生成中状态 -->
      <div v-if="isGenerating" class="generating-state">
        <div class="loading-spinner">
          <span class="spinner-icon">🔄</span>
          <h3>正在生成商业计划书...</h3>
          <p>请稍候，AI正在为您撰写专业的商业计划书</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.biz-plan-gen-page {
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
.export-card,
.bp-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  transition: var(--transition);
}

.form-card:hover,
.export-card:hover,
.bp-card:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.biz-plan-form {
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

.form-select,
.form-textarea {
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: var(--transition);
}

.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
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

.btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--border-color);
}

.export-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-section {
  max-height: calc(100vh - 180px);
  overflow-y: auto;
}

.bp-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--primary-blue);
}

.bp-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.bp-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--text-secondary);
}

.bp-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bp-section {
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius);
  padding: 20px;
  border-left: 4px solid var(--primary-blue);
}

.bp-section .section-title {
  font-size: 16px;
  margin: 0 0 12px;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.section-content p {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
}

.competitor-table,
.financial-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-primary);
}

td {
  color: var(--text-primary);
}

.product-list,
.feature-list {
  padding-left: 20px;
  margin: 0;
}

.product-list li,
.feature-list li {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 4px;
}

.business-model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.model-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  font-size: 14px;
}

.model-icon {
  font-size: 18px;
}

.generating-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
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

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-container {
    grid-template-columns: 1fr;
  }
  
  .result-section {
    max-height: none;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .form-card,
  .export-card,
  .bp-card {
    padding: 16px;
  }
  
  .section-title {
    font-size: 16px;
  }
}
</style>