<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { monitoringMetrics, riskRadarData } from '../data/mockData.js'

// 监控指标设置
const selectedMetrics = ref(monitoringMetrics.slice(0, 5))
const showMetricSettings = ref(false)

// 选中的风险详情
const selectedRisk = ref(null)
const showRiskDetail = ref(false)

// 当前选中的风险维度
const selectedDimension = ref(null)

// 生成动态风险数据
const generateDynamicRiskData = () => {
  // 根据选中的指标生成动态风险维度数据
  return selectedMetrics.value.map((metric, index) => {
    // 查找对应的原始维度数据
    const originalDimension = riskRadarData.dimensions.find(d => d.name === metric)
    
    // 如果找到原始数据则使用，否则生成随机数据
    if (originalDimension) {
      return { ...originalDimension, id: index + 1 }
    } else {
      // 生成随机风险值（0-100）
      const currentValue = Math.floor(Math.random() * 100)
      
      // 确定风险等级
      let riskLevel = 'normal'
      if (currentValue > 66) riskLevel = 'danger'
      else if (currentValue > 33) riskLevel = 'warning'
      
      return {
        id: index + 1,
        name: metric,
        currentValue,
        thresholds: [33, 66],
        description: `${metric}的风险评估`,
        recommendation: `针对${metric}的风险应对建议`,
        riskLevel,
        valueLabel: `${metric}风险值`
      }
    }
  })
}

// 动态风险数据
const dynamicRiskData = computed(() => generateDynamicRiskData())

// 动态风险提示列表，根据风险数据变化
const riskList = computed(() => {
  // 获取所有风险维度，包括高、中、低风险
  const allRiskDimensions = dynamicRiskData.value
  
  // 生成对应的风险提示
  const risks = allRiskDimensions.map((dimension, index) => {
    let category = '其他风险'
    
    // 根据维度名称确定风险类别
    if (dimension.name.includes('社交') || dimension.name.includes('情绪')) category = '市场风险'
    else if (dimension.name.includes('现金流') || dimension.name.includes('财务')) category = '财务风险'
    else if (dimension.name.includes('竞品')) category = '市场风险'
    else if (dimension.name.includes('行业')) category = '行业风险'
    else if (dimension.name.includes('客户')) category = '运营风险'
    else if (dimension.name.includes('供应链')) category = '运营风险'
    
    return {
      id: index + 1,
      title: `${dimension.name}风险`,
      description: `${dimension.name}风险值达到${dimension.currentValue}，处于${dimension.riskLevel === 'danger' ? '高风险' : dimension.riskLevel === 'warning' ? '中等风险' : '低风险'}状态`,
      level: dimension.riskLevel === 'danger' ? '高' : dimension.riskLevel === 'warning' ? '中等' : '低',
      category,
      recommendation: dimension.recommendation,
      riskLevel: dimension.riskLevel, // 保留原始风险等级用于排序
      currentValue: dimension.currentValue // 保留原始值用于排序
    }
  })
  
  // 按照风险等级排序：高风险 > 中等风险 > 低风险
  // 同一风险等级内按风险值降序排列
  return risks.sort((a, b) => {
    // 风险等级权重：danger(高) > warning(中) > normal(低)
    const riskLevelOrder = { danger: 3, warning: 2, normal: 1 }
    
    // 先按风险等级排序
    const levelDiff = riskLevelOrder[b.riskLevel] - riskLevelOrder[a.riskLevel]
    if (levelDiff !== 0) {
      return levelDiff
    }
    
    // 同一风险等级按风险值降序
    return b.currentValue - a.currentValue
  })
})

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
    // 这里可以添加实际的处理逻辑，比如更新后端数据
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



// 导入Chart.js库
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// 注册Chart.js组件
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// 创建chart引用
const chartRef = ref(null)
let chart = null

// 根据风险等级获取颜色
const getRiskColor = (value) => {
  const level = riskRadarData.riskLevels.find(l => value <= l.maxValue)
  return level ? level.color : riskRadarData.riskLevels[riskRadarData.riskLevels.length - 1].color
}

// 计算综合风险等级
const overallRiskLevel = computed(() => {
  // 计算平均风险值
  const avgValue = dynamicRiskData.value.reduce((sum, dim) => sum + dim.currentValue, 0) / dynamicRiskData.value.length
  const level = riskRadarData.riskLevels.find(l => avgValue <= l.maxValue)
  return level ? level.name : riskRadarData.riskLevels[riskRadarData.riskLevels.length - 1].name
})

// 初始化雷达图
const initRadarChart = () => {
  if (!chartRef.value) return
  
  // 销毁现有图表（如果存在）
  if (chart) {
    chart.destroy()
  }
  
  const ctx = chartRef.value.getContext('2d')
  
  chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: dynamicRiskData.value.map(dimension => dimension.name),
      datasets: [{
        label: '风险值',
        data: dynamicRiskData.value.map(dimension => dimension.currentValue),
        backgroundColor: 'transparent', // 隐藏填充
        borderColor: 'transparent', // 隐藏连线
        borderWidth: 0, // 移除连线宽度
        pointBackgroundColor: dynamicRiskData.value.map(dimension => getRiskColor(dimension.currentValue)),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const dimension = dynamicRiskData.value[context.dataIndex]
              return `${dimension.valueLabel}: ${context.parsed.r} - ${dimension.riskLevel === 'danger' ? '高风险' : dimension.riskLevel === 'warning' ? '中等风险' : '低风险'}`
            }
          }
        }
      },
      scales: {
        // 雷达图径向（r）坐标轴配置
        r: {
          // 从 0 开始绘制
          beginAtZero: true,
          // 最大刻度值
          max: 100,
          // 最小刻度值
          min: 0,
          // 刻度标签外观
          ticks: {
            // 刻度背景透明
            backdropColor: 'transparent',
            // 刻度文字颜色
            color: '#8c8c8c',
            // 刻度文字字号
            font: {
              size: 10
            },
            // 步长（根据风险等级阈值设置）
            stepSize: 20,
            // 显示刻度数字
            display: true
          },
          // 网格线样式
          grid: {
            // 网格线颜色
            color: '#e8e8e8',
            // 是否圆形（false为多边形）
            circular: false
          },
          // 角度分割线（从中心向外辐射的线）样式
          angleLines: {
            // 角度分割线颜色
            color: '#e8e8e8',
            // 显示角度分割线，数量会自动根据labels数组长度生成
            display: true
          },
          // 维度标签（各顶点文字）样式
          pointLabels: {
            // 维度标签颜色
            color: '#333',
            // 维度标签字号
            font: {
              size: 12
            }
          }
        }
      },
      elements: {
        point: {
          hoverBackgroundColor: '#fff'
        }
      },
      onClick: (_, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index
          toggleRecommendation(dynamicRiskData.value[index])
        }
      }
    }
  })
}

// 在组件挂载时初始化图表和监听窗口大小变化
onMounted(() => {
  initRadarChart()
  
  const handleResize = () => {
    if (chart) {
      chart.resize()
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})

// 监听数据变化，更新图表
watch(dynamicRiskData, () => {
  initRadarChart()
}, { deep: true })

// 删除重复的onMounted钩子


// 展开/折叠应对建议
const toggleRecommendation = (dimension) => {
  if (selectedDimension.value?.id === dimension.id) {
    selectedDimension.value = null
  } else {
    selectedDimension.value = dimension
  }
}

// 关闭应对建议
const closeRecommendation = () => {
  selectedDimension.value = null
}
</script>

<template>
  <div class="risk-alert">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>VenturePilot</h1>
    </header>
    
    <!-- 监控设置按钮 -->
    <div class="settings-button-container">
      <button class="secondary" @click="showMetricSettings = !showMetricSettings">
        ⚙️ {{ showMetricSettings ? '关闭设置' : '监控设置' }}
      </button>
    </div>
    
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
        <!-- 动态雷达图，使用Chart.js实现多边形雷达图 -->
        <div class="radar-container">
          <canvas ref="chartRef"></canvas>
        </div>
        
        <!-- 雷达图摘要 -->
        <div class="radar-summary">
          <h3>风险等级：{{ overallRiskLevel }}</h3>
          <p>当前监测到 {{ dynamicRiskData.filter(d => d.riskLevel !== 'normal').length }} 个潜在风险</p>
          <div class="risk-stats">
            <div class="stat-item">
              <span class="stat-number">{{ dynamicRiskData.filter(d => d.riskLevel === 'danger').length }}</span>
              <span class="stat-label">高风险</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ dynamicRiskData.filter(d => d.riskLevel === 'warning').length }}</span>
              <span class="stat-label">中等风险</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ dynamicRiskData.filter(d => d.riskLevel === 'normal').length }}</span>
              <span class="stat-label">低风险</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 风险应对建议面板 -->
      <div v-if="selectedDimension" class="risk-recommendation-panel">
        <div class="recommendation-header">
          <h3>{{ selectedDimension.name }} - 应对建议</h3>
          <button class="close-btn" @click="closeRecommendation">×</button>
        </div>
        <div class="recommendation-content">
          <p><strong>当前状态：</strong><span :style="{ color: getRiskColor(selectedDimension.currentValue) }">{{ selectedDimension.riskLevel === 'normal' ? '正常' : selectedDimension.riskLevel === 'warning' ? '警告' : '危险' }}</span></p>
          <p><strong>指标描述：</strong>{{ selectedDimension.description }}</p>
          <p><strong>当前值：</strong>{{ selectedDimension.currentValue }} ({{ selectedDimension.valueLabel }})</p>
          <div class="recommendation">
            <h4>建议措施：</h4>
            <p>{{ selectedDimension.recommendation }}</p>
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
  max-width: 420px;
  margin: 0 auto;
  padding: 80px 1rem 1rem;
}

/* 监控设置按钮容器样式 */
.settings-button-container {
  margin: 0 auto 1rem;
  max-width: 420px;
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  box-sizing: border-box;
  z-index: 100;
}

/* 页面标题 */
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
  position: relative;
  margin: 1rem 0;
}

/* 雷达容器 */
.radar-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  background: transparent;
}

/* Chart.js 画布 */
.radar-container canvas {
  width: 100% !important;
  height: 100% !important;
}

/* 风险点提示框容器 */
.risk-point-tooltip-container {
  position: absolute;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  z-index: 3;
  cursor: pointer;
  display: none; /* Chart.js 自带 tooltip，隐藏自定义的 */
}

/* 雷达图摘要 */
.radar-summary {
  text-align: center;
  margin: 2rem 0 1rem; /* 增加上边距，远离雷达图 */
  position: relative;
  z-index: 3;
  background-color: var(--bg-primary);
  padding: 1rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}



/* 风险点提示框 */
.risk-point-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  z-index: 10;
  margin-bottom: 0.5rem;
}

.radar-data-point:hover .risk-point-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-5px);
}

.radar-summary {
  text-align: center;
  margin: 1rem 0;
  background-color: var(--bg-tertiary);
  padding: 1rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.radar-summary h3 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.radar-summary p {
  margin: 0.3rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.risk-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

/* 风险应对建议面板 */
.risk-recommendation-panel {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-color);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.recommendation-header h3 {
  margin: 0;
  font-size: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.close-btn:hover {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.recommendation-content p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.recommendation h4 {
  margin: 0.8rem 0 0.5rem 0;
  font-size: 0.95rem;
  color: var(--primary-color);
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
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--warning-color); /* 将border-left放在border之后，确保不被覆盖 */
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