<script setup>
import { ref } from 'vue'
import { bpTemplates, industries } from '../data/mockData.js'

// 步骤状态
const currentStep = ref(1)
const maxSteps = 4

// 表单数据
const formData = ref({
  industry: '',
  idea: '',
  companyName: '',
  founderName: '',
  targetMarket: ''
})

// 生成的BP草稿
const generatedBP = ref(null)

// 选中的模板
const selectedTemplate = ref(bpTemplates[0])

// 编辑模态框
const editModalVisible = ref(false)
const currentEditingSection = ref(null)
const editingContent = ref('')

// 模拟生成BP草稿
const generateBPDraft = () => {
  // 模拟API调用，生成BP草稿
  generatedBP.value = {
    id: Date.now(),
    title: `${formData.value.companyName || '我的创业项目'}商业计划书`,
    industry: formData.value.industry,
    idea: formData.value.idea,
    sections: [
      {
        id: 1,
        title: '公司简介',
        content: `
# 公司简介

## 公司名称
${formData.value.companyName || '待填写'}

## 创始人
${formData.value.founderName || '待填写'}

## 行业领域
${formData.value.industry || '待填写'}

## 项目概述
${formData.value.idea || '待填写'}

## 目标市场
${formData.value.targetMarket || '待填写'}

## 公司愿景
成为${formData.value.industry || '该领域'}的领先企业，为客户提供优质的产品和服务。
        `
      },
      {
        id: 2,
        title: '市场分析',
        content: `
# 市场分析

## 行业现状
${formData.value.industry || '该行业'}是一个快速发展的领域，具有广阔的市场前景。

## 市场规模
根据行业报告，${formData.value.industry || '该行业'}的市场规模预计将在未来几年保持稳定增长。

## 目标客户
${formData.value.targetMarket || '我们的目标客户'}是${formData.value.industry || '该行业'}的主要消费群体。

## 竞品分析

| 竞品名称 | 优势 | 劣势 |
|---------|------|------|
| 竞品1 | 品牌知名度高 | 价格较高 |
| 竞品2 | 产品创新 | 市场份额小 |
| 竞品3 | 服务优质 | 覆盖范围有限 |

## 竞争优势
我们的项目具有独特的竞争优势，能够在${formData.value.industry || '该行业'}中脱颖而出。
        `
      },
      {
        id: 3,
        title: '产品/服务描述',
        content: `
# 产品/服务描述

## 产品/服务介绍
我们提供的${formData.value.industry || '产品/服务'}具有以下特点：

1. **创新性**：采用先进的技术和理念
2. **实用性**：能够解决客户的实际需求
3. **可靠性**：经过严格的测试和验证
4. **易用性**：简单易用，用户友好

## 核心功能

- 功能1：详细描述功能1的作用和优势
- 功能2：详细描述功能2的作用和优势
- 功能3：详细描述功能3的作用和优势
- 功能4：详细描述功能4的作用和优势

## 产品路线图

| 阶段 | 时间 | 目标 |
|------|------|------|
| 阶段1 | 第1-3个月 | 完成产品开发和测试 |
| 阶段2 | 第4-6个月 | 市场推广和用户获取 |
| 阶段3 | 第7-12个月 | 产品迭代和优化 |
| 阶段4 | 第13-24个月 | 市场扩张和规模化 |
        `
      },
      {
        id: 4,
        title: '商业模式画布',
        content: `
# 商业模式画布

## 客户细分
${formData.value.targetMarket || '我们的客户群体'}包括：

- 主要客户：详细描述主要客户群体
- 次要客户：详细描述次要客户群体
- 潜在客户：详细描述潜在客户群体

## 价值主张
我们为客户提供的核心价值是：

- 价值1：详细描述价值1
- 价值2：详细描述价值2
- 价值3：详细描述价值3

## 渠道通路
我们通过以下渠道触达客户：

- 线上渠道：网站、社交媒体、电商平台等
- 线下渠道：实体店、展会、合作伙伴等

## 客户关系
我们与客户建立的关系类型：

- 个人助理：提供个性化服务
- 自助服务：提供自助服务平台
- 社区：建立用户社区
- 自动化服务：通过自动化系统提供服务

## 收入来源
我们的收入来源包括：

- 产品销售：直接销售产品
- 服务收费：提供服务收取费用
- 订阅模式：定期收取订阅费用
- 广告收入：通过广告获取收入

## 核心资源
我们的核心资源包括：

- 人力资源：核心团队成员
- 财务资源：资金支持
- 物质资源：办公场地、设备等
- 知识产权：专利、商标等

## 关键业务
我们的关键业务包括：

- 产品开发：开发和优化产品
- 市场营销：推广和销售产品
- 客户服务：提供客户支持
- 供应链管理：管理供应链

## 重要合作
我们的重要合作包括：

- 供应商合作：与供应商建立合作关系
- 渠道合作：与渠道伙伴合作
- 技术合作：与技术伙伴合作
- 战略联盟：与其他企业建立战略联盟

## 成本结构
我们的成本结构包括：

- 固定成本：办公场地、设备等
- 可变成本：原材料、人力成本等
- 营销成本：市场推广费用
- 研发成本：产品开发费用
        `
      },
      {
        id: 5,
        title: '财务预测',
        content: `
# 财务预测

## 营收预测

| 年份 | 营收（万元） | 增长率 |
|------|------------|--------|
| 第1年 | 100 | - |
| 第2年 | 300 | 200% |
| 第3年 | 800 | 167% |
| 第4年 | 1500 | 87.5% |
| 第5年 | 2500 | 66.7% |

## 成本预测

| 年份 | 成本（万元） | 占营收比例 |
|------|------------|----------|
| 第1年 | 80 | 80% |
| 第2年 | 200 | 66.7% |
| 第3年 | 450 | 56.25% |
| 第4年 | 800 | 53.3% |
| 第5年 | 1300 | 52% |

## 利润预测

| 年份 | 利润（万元） | 利润率 |
|------|------------|--------|
| 第1年 | 20 | 20% |
| 第2年 | 100 | 33.3% |
| 第3年 | 350 | 43.75% |
| 第4年 | 700 | 46.7% |
| 第5年 | 1200 | 48% |

## 现金流预测

| 年份 | 现金流（万元） |
|------|------------|
| 第1年 | 15 |
| 第2年 | 80 |
| 第3年 | 280 |
| 第4年 | 560 |
| 第5年 | 960 |

## 融资需求

我们计划在未来3年内融资XX万元，主要用于：

- 产品开发：XX万元
- 市场推广：XX万元
- 团队扩张：XX万元
- 运营资金：XX万元
        `
      }
    ],
    createdDate: new Date().toLocaleDateString()
  }
  
  // 生成完成后进入下一步
  currentStep.value = 3
}

// 选择模板
const selectTemplate = (template) => {
  selectedTemplate.value = template
}

// 进入下一步
const nextStep = () => {
  if (currentStep.value < maxSteps) {
    currentStep.value++
  }
}

// 返回上一步
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// 编辑章节
const editSection = (section) => {
  currentEditingSection.value = section
  editingContent.value = section.content
  editModalVisible.value = true
}

// 保存章节编辑
const saveSectionEdit = () => {
  if (currentEditingSection.value) {
    currentEditingSection.value.content = editingContent.value
  }
  editModalVisible.value = false
  currentEditingSection.value = null
  editingContent.value = ''
}

// 取消章节编辑
const cancelSectionEdit = () => {
  editModalVisible.value = false
  currentEditingSection.value = null
  editingContent.value = ''
}

// 导出BP
const exportBP = (format) => {
  alert(`商业计划书已导出为${format}格式！（模拟功能）`)
}

// 打印为PDF
const printToPDF = () => {
  alert('商业计划书已导出为PDF格式！（模拟功能）')
}

// 分享BP
const shareBP = (method) => {
  alert(`商业计划书已通过${method}分享！（模拟功能）`)
}

// 重新开始
const restart = () => {
  currentStep.value = 1
  generatedBP.value = null
  selectedTemplate.value = bpTemplates[0]
  formData.value = {
    industry: '',
    idea: '',
    companyName: '',
    founderName: '',
    targetMarket: ''
  }
}
</script>

<template>
  <div class="biz-plan-gen">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>VenturePilot</h1>
    </header>
    
    <!-- 步骤指示器 -->
    <div class="steps-indicator">
      <div 
        class="step-item" 
        v-for="step in maxSteps" 
        :key="step"
        :class="{
          'active': step === currentStep,
          'completed': step < currentStep
        }"
      >
        <div class="step-number">{{ step }}</div>
        <div class="step-title">
          {{ 
            step === 1 ? '基本信息' : 
            step === 2 ? '选择模板' : 
            step === 3 ? '生成草稿' : 
            '导出分享' 
          }}
        </div>
      </div>
    </div>
    
    <div class="content-container">
      <!-- 步骤1：基本信息填写 -->
      <div v-if="currentStep === 1" class="card fade-in">
        <h2>第一步：填写基本信息</h2>
        
        <form class="basic-info-form">
          <div class="form-group">
            <label for="companyName">公司名称</label>
            <input 
              type="text" 
              id="companyName" 
              v-model="formData.companyName" 
              class="form-control"
              placeholder="请输入公司名称"
            >
          </div>
          
          <div class="form-group">
            <label for="founderName">创始人姓名</label>
            <input 
              type="text" 
              id="founderName" 
              v-model="formData.founderName" 
              class="form-control"
              placeholder="请输入创始人姓名"
            >
          </div>
          
          <div class="form-group">
            <label for="industry">所属行业</label>
            <select 
              id="industry" 
              v-model="formData.industry" 
              class="form-control"
            >
              <option value="">请选择行业</option>
              <option 
                v-for="industry in industries" 
                :key="industry" 
                :value="industry"
              >
                {{ industry }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="targetMarket">目标市场</label>
            <input 
              type="text" 
              id="targetMarket" 
              v-model="formData.targetMarket" 
              class="form-control"
              placeholder="请描述你的目标市场"
            >
          </div>
          
          <div class="form-group">
            <label for="idea">项目想法</label>
            <textarea 
              id="idea" 
              v-model="formData.idea" 
              class="form-control"
              rows="4"
              placeholder="请简要描述你的创业想法..."
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button 
              type="button" 
              class="primary" 
              @click="nextStep"
            >
              下一步：选择模板 →
            </button>
          </div>
        </form>
      </div>
      
      <!-- 步骤2：模板选择 -->
      <div v-if="currentStep === 2" class="card fade-in">
        <h2>第二步：选择BP模板</h2>
        <p class="template-info">选择适合您项目的商业计划书模板，我们将根据模板结构生成个性化BP</p>
        
        <div class="templates-grid">
          <div 
            class="template-card" 
            v-for="template in bpTemplates" 
            :key="template.id"
            :class="{ 'selected': selectedTemplate.id === template.id }"
            @click="selectTemplate(template)"
          >
            <h3>{{ template.name }}</h3>
            <div class="template-sections">
              <div 
                class="section-tag" 
                v-for="(section, index) in template.sections" 
                :key="index"
              >
                {{ section }}
              </div>
            </div>
            <div class="template-select-btn">
              <button 
                type="button" 
                class="primary" 
                :class="{ 'selected-btn': selectedTemplate.id === template.id }"
                @click.stop="selectTemplate(template)"
              >
                {{ selectedTemplate.id === template.id ? '已选择' : '选择' }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="secondary" @click="prevStep">
            ← 上一步
          </button>
          <button 
            type="button" 
            class="primary" 
            @click="generateBPDraft"
          >
            生成BP草稿 →
          </button>
        </div>
      </div>
      
      <!-- 步骤3：BP草稿生成 -->
      <div v-if="currentStep === 3" class="card fade-in">
        <div class="step-header">
          <h2>第三步：BP草稿生成</h2>
          <div class="action-buttons">
            <button type="button" class="secondary" @click="prevStep">
              ← 重新选择模板
            </button>
          </div>
        </div>
        
        <!-- 编辑模态框 -->
        <div class="modal-overlay" v-if="editModalVisible" @click="cancelSectionEdit">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3>编辑 {{ currentEditingSection?.title }}</h3>
              <button type="button" class="modal-close" @click="cancelSectionEdit">×</button>
            </div>
            <div class="modal-body">
              <textarea 
                v-model="editingContent" 
                class="edit-textarea" 
                rows="15"
                placeholder="编辑章节内容..."
              ></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="secondary" @click="cancelSectionEdit">
                取消
              </button>
              <button type="button" class="primary" @click="saveSectionEdit">
                保存更改
              </button>
            </div>
          </div>
        </div>
        
        <div v-if="generatedBP" class="bp-draft">
          <div class="bp-header">
            <h3>{{ generatedBP.title }}</h3>
            <p class="bp-meta">
              行业：{{ generatedBP.industry }} | 创建日期：{{ generatedBP.createdDate }}
            </p>
          </div>
          
          <div class="bp-sections">
            <div 
              class="section-card" 
              v-for="section in generatedBP.sections" 
              :key="section.id"
              @click="editSection(section)"
            >
              <div class="section-header">
                <h4>{{ section.title }}</h4>
                <div class="section-action">
                  <button type="button" class="primary">
                    编辑 →
                  </button>
                </div>
              </div>
              <div class="section-preview">
                <pre>{{ section.content.substring(0, 100) }}...</pre>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="secondary" @click="restart">
              🔄 重新开始
            </button>
            <button type="button" class="primary" @click="nextStep">
              下一步：导出与分享 →
            </button>
          </div>
        </div>
        
        <div v-else class="loading-bp">
          <div class="loading-content">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>正在生成商业计划书草稿，请稍候...</p>
            <p class="loading-info">
              我们正在根据您的信息生成个性化BP，包含公司简介、市场分析、产品/服务描述、商业模式画布和财务预测模型
            </p>
          </div>
        </div>
      </div>
      
      <!-- 步骤4：导出与分享 -->
      <div v-if="currentStep === 4" class="card fade-in">
        <h2>第四步：导出与分享</h2>
        
        <!-- 导出与分享选项 -->
        <div class="export-share-options">
          <div class="format-buttons">
            <button 
              type="button" 
              class="format-btn" 
              @click="exportBP('HTML')"
            >
              <div class="format-icon">🌐</div>
              <div class="format-info">
                <div class="format-name">导出HTML</div>
                <div class="format-desc"></div>
              </div>
            </button>
            
            <button 
              type="button" 
              class="format-btn" 
              @click="exportBP('Word')"
            >
              <div class="format-icon">📝</div>
              <div class="format-info">
                <div class="format-name">导出Word</div>
                <div class="format-desc"></div>
              </div>
            </button>
            
            <button 
              type="button" 
              class="format-btn" 
              @click="printToPDF()"
            >
              <div class="format-icon">📄</div>
              <div class="format-info">
                <div class="format-name">导出PDF</div>
                <div class="format-desc"></div>
              </div>
            </button>
            
            <button type="button" class="format-btn" @click="shareBP('email')">
              <div class="format-icon">📧</div>
              <div class="format-info">
                <div class="format-name">邮件分享</div>
              </div>
            </button>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="secondary" @click="prevStep">
            ← 返回编辑
          </button>
          <button type="button" class="primary" @click="restart">
            🔄 生成新的BP
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.biz-plan-gen {
  max-width: 640px;
  margin: 0 auto;
  padding: 80px 1rem 1rem;
}

/* 页面标题 */
.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
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
.basic-info-form {
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
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* 模板选择 */
.template-info {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.templates-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.template-card {
  background-color: var(--bg-secondary);
  padding: 1.2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.template-card.selected {
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}



.template-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.section-tag {
  padding: 0.3rem 0.8rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.template-select-btn {
  text-align: right;
}

.selected-btn {
  background-color: var(--success-color) !important;
  border-color: var(--success-color) !important;
}

/* BP草稿生成 */
.bp-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}



.bp-meta {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
}

.bp-sections {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.section-card {
  background-color: var(--bg-secondary);
  padding: 1.2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h4 {
  margin: 0;
  font-size: 1.1rem;
}

.section-preview {
  background-color: var(--bg-primary);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  max-height: 100px;
  overflow: hidden;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.section-preview pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}

/* 加载状态 */
.loading-bp {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.loading-content {
  text-align: center;
  padding: 2rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.loading-dots span {
  width: 12px;
  height: 12px;
  background-color: var(--primary-color);
  border-radius: 50%;
  animation: loading 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.loading-info {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 1rem;
  line-height: 1.5;
}

/* 导出与分享 */
.export-options {
  margin-bottom: 2rem;
}



.format-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.format-btn, .share-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  width: 100%;
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
}

.format-btn:hover, .share-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}

.format-icon, .share-icon {
  font-size: 1.2rem;
}

.format-info {
  flex: 1;
}

.format-name {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0;
}

.format-desc {
  display: none;
}

.share-buttons, .format-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* 编辑模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-tertiary);
  padding: 0;
  min-height: auto;
  width: auto;
}

.modal-close:hover {
  color: var(--text-primary);
  background: none;
  transform: none;
  box-shadow: none;
}

.modal-body {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.edit-textarea {
  width: 100%;
  height: 300px;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  resize: vertical;
  line-height: 1.6;
}

.edit-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .steps-indicator {
    padding: 0;
  }
  
  .step-title {
    font-size: 0.65rem;
  }
  
  .step-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .action-buttons button {
    flex: 1;
  }
  
  .format-btn,
  .share-btn {
    padding: 0.8rem;
  }
  
  .format-icon {
    font-size: 1.5rem;
  }
  
  /* 模态框响应式样式 */
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .edit-textarea {
    height: 250px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer button {
    width: 100%;
  }
}
</style>