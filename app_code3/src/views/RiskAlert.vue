<script setup>
import { ref } from 'vue'
import { risks, monitoringMetrics } from '../data/mockData.js'

// 监控指标设置
const selectedMetrics = ref(monitoringMetrics.slice(0, 4))
const showMetricSettings = ref(false)

// 风险提示列表
const riskList = ref(risks)

// 选中的风险详情
const selectedRisk = ref(null)
const showRiskDetail = ref(false)

// 切换监控指标
const toggleMetric = (metric) => {
  const index = selectedMetrics.value.indexOf(metric)
  if (index > -1) {
    selectedMetrics.value.splice(index, 1)
  } else {
    selectedMetrics.value.push(metric)
  }
}

// 查看风险详情
const viewRiskDetail = (risk) => {
  selectedRisk.value = risk
  showRiskDetail.value = true
}

// 关闭风险详情
const closeRiskDetail = () => {
  showRiskDetail.value = false
  selectedRisk.value = null
}

// 标记风险为已处理
const markAsHandled = () => {
  if (selectedRisk.value) {
    const index = riskList.value.findIndex(r => r.id === selectedRisk.value.id)
    if (index > -1) {
      riskList.value.splice(index, 1)
    }
    closeRiskDetail()
  }
}

// 获取风险等级样式
const getRiskLevelClass = (level) => {
  switch (level) {
    case '高':
      return 'high-risk'
    case '中等':
      return 'medium-risk'
    case '低':
      return 'low-risk'
    default:
      return ''
  }
}

// 获取风险等级颜色
const getRiskLevelColor = (level) => {
  switch (level) {
    case '高':
      return '#F5222D'
    case '中等':
      return '#FAAD14'
    case '低':
      return '#52C41A'
    default:
      return '#8C8C8C'
  }
}
</script>

<template>
  <div class="risk-alert">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>风险预警雷达</h1>
      <button class="secondary" @click="showMetricSettings = !showMetricSettings">
        ⚙️ {{ showMetricSettings ? '关闭设置' : '监控设置' }}
      </button>
    </header>
    
    <!-- 监控指标设置 -->
    <div v-if="showMetricSettings" class="card fade-in">
      <h2>监控指标设置</h2>
      <div class="metrics-grid">
        <div 
          class="metric-item" 
          v-for="metric in monitoringMetrics" 
          :key="metric"
          :class="{ 'selected': selectedMetrics.includes(metric) }"
          @click="toggleMetric(metric)"
        >
          <div class="metric-checkbox">
            <span class="checkmark" v-if="selectedMetrics.includes(metric)">✓</span>
          </div>
          <span class="metric-name">{{ metric }}</span>
        </div>
      </div>
      <div class="metrics-info">
        <p>已选择 {{ selectedMetrics.length }} 个监控指标</p>
        <p class="info-desc">我们将根据您选择的指标，实时监测并预警潜在风险</p>
      </div>
    </div>
    
    <!-- 风险雷达概览 -->
    <div class="card fade-in">
      <h2>风险雷达概览</h2>
      <div class="risk-radar">
        <!-- 简化的风险雷达图 -->
        <div class="radar-container">
          <div class="radar-bg">
            <div class="radar-circle"></div>
            <div class="radar-circle"></div>
            <div class="radar-circle"></div>
            <div class="radar-line"></div>
            <div class="radar-line"></div>
            <div class="radar-line"></div>
            <div class="radar-line"></div>
            <div class="radar-line"></div>
          </div>
          <!-- 风险点 -->
          <div 
            class="risk-point" 
            v-for="(metric, index) in selectedMetrics" 
            :key="metric"
            :style="{
              top: `${20 + Math.sin(index * 2 * Math.PI / selectedMetrics.length) * 30}%`,
              left: `${50 + Math.cos(index * 2 * Math.PI / selectedMetrics.length) * 30}%`,
              backgroundColor: riskList.length > 0 ? '#F5222D' : '#52C41A'
            }"
          >
            <div class="risk-point-tooltip">{{ metric }}</div>
          </div>
        </div>
        <div class="radar-summary">
          <h3>风险等级：{{ riskList.length > 0 ? '中等' : '低' }}</h3>
          <p>当前监测到 {{ riskList.length }} 个潜在风险</p>
          <div class="risk-stats">
            <div class="stat-item">
              <span class="stat-number">{{ riskList.filter(r => r.level === '高').length }}</span>
              <span class="stat-label">高风险</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ riskList.filter(r => r.level === '中等').length }}</span>
              <span class="stat-label">中等风险</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ riskList.filter(r => r.level === '低').length }}</span>
              <span class="stat-label">低风险</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 风险提示列表 -->
    <div class="card fade-in">
      <h2>风险提示</h2>
      <div v-if="riskList.length === 0" class="no-risks">
        <div class="no-risks-icon">✅</div>
        <h3>暂无风险提示</h3>
        <p>当前未监测到任何潜在风险，继续保持良好运营！</p>
      </div>
      <div v-else class="risks-list">
        <div 
          class="risk-item" 
          v-for="risk in riskList" 
          :key="risk.id"
          :class="getRiskLevelClass(risk.level)"
          @click="viewRiskDetail(risk)"
        >
          <div class="risk-header">
            <div class="risk-level-badge" :class="getRiskLevelClass(risk.level)">
              {{ risk.level }}风险
            </div>
            <div class="risk-category">{{ risk.category }}</div>
          </div>
          <h4 class="risk-title">{{ risk.title }}</h4>
          <p class="risk-description">{{ risk.description }}</p>
          <div class="risk-action">
            <button type="button" class="primary" @click.stop="viewRiskDetail(risk)">
              查看建议 →
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 风险详情模态框 -->
    <div v-if="showRiskDetail && selectedRisk" class="modal-overlay" @click="closeRiskDetail">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedRisk.title }}</h2>
          <button type="button" class="close-btn" @click="closeRiskDetail">
            ✕
          </button>
        </div>
        
        <div class="modal-body">
          <div class="risk-detail-section">
            <h3>风险等级</h3>
            <div class="risk-level-badge" :class="getRiskLevelClass(selectedRisk.level)">
              {{ selectedRisk.level }}风险
            </div>
          </div>
          
          <div class="risk-detail-section">
            <h3>风险类型</h3>
            <p>{{ selectedRisk.category }}</p>
          </div>
          
          <div class="risk-detail-section">
            <h3>风险描述</h3>
            <p class="risk-desc-detail">{{ selectedRisk.description }}</p>
          </div>
          
          <div class="risk-detail-section">
            <h3>应对建议</h3>
            <div class="recommendation">
              <div class="recommendation-icon">💡</div>
              <p>{{ selectedRisk.recommendation }}</p>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="secondary" @click="closeRiskDetail">
            关闭
          </button>
          <button type="button" class="success" @click="markAsHandled">
            ✅ 标记为已处理
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.risk-alert {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 页面标题 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

/* 监控指标设置 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
}

.metric-item.selected {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: var(--primary-color);
}

.metric-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.metric-item.selected .metric-checkbox {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.checkmark {
  font-size: 0.8rem;
  font-weight: bold;
}

.metric-name {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.metrics-info {
  padding: 1rem;
  background-color: rgba(24, 144, 255, 0.05);
  border-radius: var(--radius-md);
  margin-top: 1rem;
}

.metrics-info p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.info-desc {
  color: var(--text-secondary);
  font-size: 0.85rem !important;
}

/* 风险雷达概览 */
.risk-radar {
  margin: 1.5rem 0;
}

.radar-container {
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.radar-bg {
  position: relative;
  width: 200px;
  height: 200px;
}

.radar-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--border-color);
  border-radius: 50%;
}

.radar-circle:nth-child(1) {
  width: 180px;
  height: 180px;
}

.radar-circle:nth-child(2) {
  width: 120px;
  height: 120px;
}

.radar-circle:nth-child(3) {
  width: 60px;
  height: 60px;
}

.radar-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 100px;
  background-color: var(--border-color);
  transform-origin: bottom center;
}

.radar-line:nth-child(4) {
  transform: translate(-50%, -100%);
}

.radar-line:nth-child(5) {
  transform: translate(-50%, -100%) rotate(72deg);
}

.radar-line:nth-child(6) {
  transform: translate(-50%, -100%) rotate(144deg);
}

.radar-line:nth-child(7) {
  transform: translate(-50%, -100%) rotate(216deg);
}

.radar-line:nth-child(8) {
  transform: translate(-50%, -100%) rotate(288deg);
}

.risk-point {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--error-color);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(245, 34, 45, 0.3);
}

.risk-point:hover {
  transform: translate(-50%, -50%) scale(1.5);
}

.risk-point-tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--text-primary);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 10;
}

.risk-point:hover .risk-point-tooltip {
  opacity: 1;
  visibility: visible;
}

.radar-summary {
  text-align: center;
}

.radar-summary h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--warning-color);
}

.risk-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* 风险提示列表 */
.no-risks {
  text-align: center;
  padding: 2rem;
  background-color: rgba(82, 196, 26, 0.05);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(82, 196, 26, 0.2);
}

.no-risks-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-risks h3 {
  color: var(--success-color);
  margin-bottom: 0.5rem;
}

.no-risks p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.risks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.risk-item {
  background-color: var(--bg-secondary);
  padding: 1.2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  border-left: 4px solid var(--warning-color);
  border: 1px solid var(--border-color);
}

.risk-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.risk-item.high-risk {
  border-left-color: var(--error-color);
}

.risk-item.medium-risk {
  border-left-color: var(--warning-color);
}

.risk-item.low-risk {
  border-left-color: var(--success-color);
}

.risk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.risk-level-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

.risk-level-badge.high-risk {
  background-color: var(--error-color);
}

.risk-level-badge.medium-risk {
  background-color: var(--warning-color);
}

.risk-level-badge.low-risk {
  background-color: var(--success-color);
}

.risk-category {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.risk-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.risk-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.risk-action {
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

.risk-detail-section {
  margin-bottom: 1.5rem;
}

.risk-detail-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.risk-desc-detail {
  line-height: 1.5;
  font-size: 0.95rem;
}

.recommendation {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: rgba(250, 173, 20, 0.05);
  padding: 1rem;
  border-radius: var(--radius-md);
  border-left: 3px solid var(--warning-color);
}

.recommendation-icon {
  font-size: 1.5rem;
  margin-top: 0.2rem;
}

.recommendation p {
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
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
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .page-header button {
    width: 100%;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .risk-stats {
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
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