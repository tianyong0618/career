<script setup>
import { ref } from 'vue';
import { mockData } from '../mock/data';

// 监控指标
const monitoringMetrics = ref({
  socialMedia: true,
  cashFlow: true,
  competitors: true,
  industryTrends: true
});

// 风险数据
const risks = ref(mockData.risks);

// 保存监控设置
const saveSettings = () => {
  alert('监控设置已保存！（模拟功能）');
};

// 获取风险等级样式
const getRiskLevelClass = (level) => {
  switch (level) {
    case '高':
      return 'risk-high';
    case '中':
      return 'risk-medium';
    case '低':
      return 'risk-low';
    default:
      return '';
  }
};

// 获取风险等级文本
const getRiskLevelText = (level) => {
  switch (level) {
    case '高':
      return '高危风险';
    case '中':
      return '中等风险';
    case '低':
      return '低危风险';
    default:
      return level;
  }
};
</script>

<template>
  <div class="risk-alert-page">
    <h1 class="page-title">风险预警雷达</h1>
    
    <div class="content-container">
      <!-- 左侧：监控设置 -->
      <div class="settings-section">
        <div class="settings-card">
          <h2 class="section-title">Step 1：设置监控指标</h2>
          
          <div class="metrics-list">
            <div class="metric-item">
              <div class="metric-info">
                <div class="metric-name">社交媒体情绪</div>
                <div class="metric-description">监控社交媒体上对您业务的评价和情绪</div>
              </div>
              <div class="metric-toggle">
                <input 
                  type="checkbox" 
                  id="socialMedia" 
                  v-model="monitoringMetrics.socialMedia"
                  class="toggle-checkbox"
                />
                <label for="socialMedia" class="toggle-label"></label>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-info">
                <div class="metric-name">现金流状况</div>
                <div class="metric-description">监控您的现金流变化和财务健康状况</div>
              </div>
              <div class="metric-toggle">
                <input 
                  type="checkbox" 
                  id="cashFlow" 
                  v-model="monitoringMetrics.cashFlow"
                  class="toggle-checkbox"
                />
                <label for="cashFlow" class="toggle-label"></label>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-info">
                <div class="metric-name">竞品动态</div>
                <div class="metric-description">监控竞争对手的市场行为和策略变化</div>
              </div>
              <div class="metric-toggle">
                <input 
                  type="checkbox" 
                  id="competitors" 
                  v-model="monitoringMetrics.competitors"
                  class="toggle-checkbox"
                />
                <label for="competitors" class="toggle-label"></label>
              </div>
            </div>
            
            <div class="metric-item">
              <div class="metric-info">
                <div class="metric-name">行业趋势</div>
                <div class="metric-description">监控行业发展趋势和政策变化</div>
              </div>
              <div class="metric-toggle">
                <input 
                  type="checkbox" 
                  id="industryTrends" 
                  v-model="monitoringMetrics.industryTrends"
                  class="toggle-checkbox"
                />
                <label for="industryTrends" class="toggle-label"></label>
              </div>
            </div>
          </div>
          
          <div class="settings-actions">
            <button type="button" class="btn btn-primary" @click="saveSettings">
              保存设置
            </button>
          </div>
        </div>
      </div>
      
      <!-- 右侧：风险提示 -->
      <div class="alerts-section">
        <div class="alerts-header">
          <h2 class="section-title">Step 2：风险预警提示</h2>
          <div class="alerts-stats">
            <span class="stats-text">共 {{ risks.length }} 条风险提示</span>
          </div>
        </div>
        
        <div class="risks-list">
          <div 
            v-for="risk in risks" 
            :key="risk.id" 
            class="risk-card"
          >
            <div class="risk-header">
              <div class="risk-type">{{ risk.type }}</div>
              <div :class="['risk-level', getRiskLevelClass(risk.level)]">
                {{ getRiskLevelText(risk.level) }}
              </div>
            </div>
            
            <div class="risk-body">
              <div class="risk-message">{{ risk.message }}</div>
              
              <div class="risk-suggestions">
                <h4 class="sub-title">应对建议</h4>
                <ul class="suggestions-list">
                  <li v-for="(suggestion, index) in risk.suggestions" :key="index" class="suggestion-item">
                    <span class="suggestion-icon">💡</span>
                    <span class="suggestion-text">{{ suggestion }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 风险雷达图（简化版） -->
        <div class="radar-section">
          <h3 class="section-title">风险雷达概览</h3>
          <div class="radar-visualization">
            <div class="radar-grid">
              <!-- 简化的雷达图表示 -->
              <div class="radar-circle">
                <div class="radar-center">
                  <div class="radar-score">85</div>
                  <div class="radar-label">风险评分</div>
                </div>
                <div class="radar-axes">
                  <div class="radar-axis">
                    <span class="axis-label">社交媒体</span>
                  </div>
                  <div class="radar-axis">
                    <span class="axis-label">现金流</span>
                  </div>
                  <div class="radar-axis">
                    <span class="axis-label">竞品动态</span>
                  </div>
                  <div class="radar-axis">
                    <span class="axis-label">行业趋势</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="radar-legend">
              <div class="legend-item">
                <span class="legend-color risk-high"></span>
                <span class="legend-text">高危风险</span>
              </div>
              <div class="legend-item">
                <span class="legend-color risk-medium"></span>
                <span class="legend-text">中等风险</span>
              </div>
              <div class="legend-item">
                <span class="legend-color risk-low"></span>
                <span class="legend-text">低危风险</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.risk-alert-page {
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

.settings-section,
.alerts-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-card,
.risk-card,
.radar-section {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  transition: var(--transition);
}

.settings-card:hover,
.risk-card:hover,
.radar-section:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.metric-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.metric-item:hover {
  background-color: var(--bg-tertiary);
}

.metric-info {
  flex: 1;
}

.metric-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.metric-description {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* 开关样式 */
.metric-toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: var(--transition);
  border-radius: 24px;
}

.toggle-label:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: var(--transition);
  border-radius: 50%;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: var(--primary-blue);
}

.toggle-checkbox:checked + .toggle-label:before {
  transform: translateX(26px);
}

.settings-actions {
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

.btn-primary:hover {
  background-color: #40a9ff;
  box-shadow: var(--shadow-sm);
}

.alerts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -8px;
}

.alerts-stats {
  font-size: 14px;
  color: var(--text-secondary);
}

.risks-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.risk-card {
  border-left: 4px solid var(--danger-red);
}

.risk-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
}

.risk-type {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.risk-level {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.risk-high {
  background-color: rgba(245, 34, 45, 0.1);
  color: var(--danger-red);
}

.risk-medium {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--warning-yellow);
}

.risk-low {
  background-color: rgba(82, 196, 26, 0.1);
  color: var(--success-green);
}

.risk-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.risk-message {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
}

.sub-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.risk-suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggestions-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.4;
}

.suggestion-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.suggestion-text {
  flex: 1;
}

.radar-section {
  margin-top: 24px;
}

.radar-visualization {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.radar-grid {
  width: 250px;
  height: 250px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(245, 34, 45, 0.1) 0deg 90deg,
    rgba(250, 173, 20, 0.1) 90deg 180deg,
    rgba(82, 196, 26, 0.1) 180deg 270deg,
    rgba(24, 144, 255, 0.1) 270deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.radar-center {
  text-align: center;
}

.radar-score {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary-blue);
  line-height: 1;
}

.radar-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.radar-axes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.radar-axis {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: var(--border-color);
  transform-origin: center;
}

.radar-axis:nth-child(2) {
  transform: rotate(90deg);
}

.radar-axis:nth-child(3) {
  transform: rotate(45deg);
}

.radar-axis:nth-child(4) {
  transform: rotate(135deg);
}

.axis-label {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.radar-legend {
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-primary);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
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
  
  .settings-card,
  .risk-card,
  .radar-section {
    padding: 16px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .radar-grid {
    width: 200px;
    height: 200px;
  }
  
  .radar-circle {
    width: 150px;
    height: 150px;
  }
  
  .radar-score {
    font-size: 28px;
  }
  
  .radar-legend {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>