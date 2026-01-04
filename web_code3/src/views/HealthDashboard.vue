<script setup>
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import 'chartjs-adapter-date-fns'

// 注册 Chart.js 组件
Chart.register(...registerables)

// 模拟数据
const cashFlowData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  values: [120, 190, 150, 200, 250, 300], // 现金流（万元）
  safeLine: 100 // 安全线（万元）
}

const policyUtilizationData = {
  totalPolicies: 15, // 可申请政策总数
  appliedPolicies: 8, // 已申请政策数
  approvedPolicies: 6, // 已获批政策数
  utilizationRate: 40 // 利用率（%）
}

const riskHeatmapData = [
  { name: '市场风险', value: 75 },
  { name: '财务风险', value: 60 },
  { name: '政策风险', value: 45 },
  { name: '运营风险', value: 55 },
  { name: '团队风险', value: 35 }
]

// 图表引用
const cashFlowChartRef = ref(null)
const riskHeatmapChartRef = ref(null)
let cashFlowChartInstance = null
let riskHeatmapChartInstance = null

// 初始化现金流图表
const initCashFlowChart = () => {
  if (cashFlowChartRef.value) {
    const ctx = cashFlowChartRef.value.getContext('2d')
    
    // 销毁现有图表实例
    if (cashFlowChartInstance) {
      cashFlowChartInstance.destroy()
    }
    
    // 创建新图表
    cashFlowChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: cashFlowData.labels,
        datasets: [
          {
            label: '现金流（万元）',
            data: cashFlowData.values,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: '安全线（万元）',
            data: [cashFlowData.safeLine, cashFlowData.safeLine, cashFlowData.safeLine, cashFlowData.safeLine, cashFlowData.safeLine, cashFlowData.safeLine],
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderDash: [5, 5],
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
}

// 初始化风险热力图
const initRiskHeatmapChart = () => {
  if (riskHeatmapChartRef.value) {
    const ctx = riskHeatmapChartRef.value.getContext('2d')
    
    // 销毁现有图表实例
    if (riskHeatmapChartInstance) {
      riskHeatmapChartInstance.destroy()
    }
    
    // 创建新图表
    riskHeatmapChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: riskHeatmapData.map(item => item.name),
        datasets: [{
          label: '风险值',
          data: riskHeatmapData.map(item => item.value),
          backgroundColor: riskHeatmapData.map(item => {
            if (item.value < 40) return '#2ecc71' // 低风险
            if (item.value < 70) return '#f39c12' // 中风险
            return '#e74c3c' // 高风险
          }),
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    })
  }
}

// 计算政策红利利用率详情
const policyUtilizationDetails = computed(() => {
  return {
    total: policyUtilizationData.totalPolicies,
    applied: policyUtilizationData.appliedPolicies,
    approved: policyUtilizationData.approvedPolicies,
    utilizationRate: policyUtilizationData.utilizationRate,
    approvalRate: Math.round((policyUtilizationData.approvedPolicies / policyUtilizationData.appliedPolicies) * 100)
  }
})

// 导出PDF报告
const exportPDF = async () => {
  try {
    // 获取页面中需要导出的内容
    const dashboardElement = document.querySelector('.health-dashboard')
    
    if (!dashboardElement) {
      console.error('找不到需要导出的元素')
      return
    }
    
    // 使用html2canvas将页面内容转换为图片
    const canvas = await html2canvas(dashboardElement, {
      scale: 2, // 提高分辨率
      useCORS: true, // 允许跨域图片
      logging: false // 禁用日志
    })
    
    // 创建PDF文档，设置方向为横向或纵向
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210 // A4宽度，单位mm
    const pageHeight = 297 // A4高度，单位mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0
    
    const doc = new jsPDF('p', 'mm', 'a4')
    
    // 添加第一张图片
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    // 如果内容超过一页，添加新页面
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      doc.addPage()
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    // 保存PDF
    doc.save('创业健康度报告.pdf')
  } catch (error) {
    console.error('导出PDF失败:', error)
  }
}

// 生命周期钩子：组件挂载后初始化图表
onMounted(() => {
  initCashFlowChart()
  initRiskHeatmapChart()
})
</script>

<template>
  <div class="health-dashboard">
    <div class="page-header">
      <h1>创业健康度看板</h1>
      <button class="export-btn" @click="exportPDF">
        <span class="btn-icon">📥</span>
        导出PDF报告
      </button>
    </div>
    
    <!-- 现金流安全线 -->
    <div class="card">
      <h2>现金流安全线</h2>
      <div class="chart-container">
        <canvas ref="cashFlowChartRef"></canvas>
      </div>
      <div class="chart-info">
        <p>近6个月现金流均高于安全线（{{ cashFlowData.safeLine }}万元），现金流状况良好。</p>
      </div>
    </div>
    
    <!-- 政策红利利用率 -->
    <div class="card">
      <h2>政策红利利用率</h2>
      <div class="utilization-grid">
        <div class="utilization-item">
          <div class="utilization-label">可申请政策总数</div>
          <div class="utilization-value">{{ policyUtilizationDetails.total }}项</div>
        </div>
        <div class="utilization-item">
          <div class="utilization-label">已申请政策数</div>
          <div class="utilization-value">{{ policyUtilizationDetails.applied }}项</div>
        </div>
        <div class="utilization-item">
          <div class="utilization-label">已获批政策数</div>
          <div class="utilization-value">{{ policyUtilizationDetails.approved }}项</div>
        </div>
        <div class="utilization-item">
          <div class="utilization-label">政策利用率</div>
          <div class="utilization-value highlight">{{ policyUtilizationDetails.utilizationRate }}%</div>
        </div>
        <div class="utilization-item">
          <div class="utilization-label">政策获批率</div>
          <div class="utilization-value">{{ policyUtilizationDetails.approvalRate }}%</div>
        </div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-label">
          <span>政策利用率</span>
          <span>{{ policyUtilizationDetails.utilizationRate }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${policyUtilizationDetails.utilizationRate}%` }"></div>
        </div>
      </div>
    </div>
    
    <!-- 风险热力图 -->
    <div class="card">
      <h2>风险热力图</h2>
      <div class="chart-container">
        <canvas ref="riskHeatmapChartRef"></canvas>
      </div>
      <div class="risk-levels">
        <div class="risk-level-item">
          <span class="risk-dot low"></span>
          <span class="risk-text">低风险 (< 40)</span>
        </div>
        <div class="risk-level-item">
          <span class="risk-dot medium"></span>
          <span class="risk-text">中风险 (40-70)</span>
        </div>
        <div class="risk-level-item">
          <span class="risk-dot high"></span>
          <span class="risk-text">高风险 (> 70)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.health-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.btn-icon {
  font-size: 1rem;
}

.card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: var(--text-primary);
}

/* 图表容器 */
.chart-container {
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;
}

.chart-info {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-sm);
  padding: 0.8rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* 政策利用率网格 */
.utilization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.utilization-item {
  text-align: center;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.utilization-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.utilization-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.utilization-value.highlight {
  color: var(--primary-color);
}

/* 进度条 */
.progress-bar-container {
  margin-top: 1rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* 风险等级 */
.risk-levels {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: center;
}

.risk-level-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.risk-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.risk-dot.low {
  background-color: #2ecc71;
}

.risk-dot.medium {
  background-color: #f39c12;
}

.risk-dot.high {
  background-color: #e74c3c;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .health-dashboard {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .utilization-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .risk-levels {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .chart-container {
    height: 250px;
  }
}
</style>