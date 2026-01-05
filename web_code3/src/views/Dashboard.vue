<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Chart, registerables } from 'chart.js'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import 'chartjs-adapter-date-fns'
import { userProfile } from '../data/mockData.js'

// 注册 Chart.js 组件
Chart.register(...registerables)

const router = useRouter()

// 跳转到对应页面
const navigateTo = (path) => {
  router.push(path)
}

// 健康看板模拟数据
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

// 导出PDF报告
const exportPDF = async () => {
  try {
    // 获取创业健康度看板容器
    const healthDashboard = document.querySelector('.health-dashboard')
    
    if (!healthDashboard) {
      console.error('找不到创业健康度看板')
      return
    }
    
    // 使用html2canvas直接捕获整个健康度看板
    // 确保图表已经渲染完成
    const canvas = await html2canvas(healthDashboard, {
      scale: 2, // 提高分辨率
      useCORS: true, // 允许跨域图片
      logging: false, // 禁用日志
      background: '#ffffff', // 设置白色背景
      ignoreElements: (element) => {
        // 只忽略导出按钮，保留其他所有内容
        return element.classList.contains('export-btn')
      }
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
  <div class="dashboard">
    <!-- 创业身份卡 -->
    <div class="card fade-in">
      <div class="profile-section">
        <div class="avatar">
          <img :src="userProfile.avatar" alt="创业者头像" />
        </div>
        <div class="profile-info">
          <h2>{{ userProfile.name }}</h2>
          <div class="tags">
            <span class="tag primary" v-for="tag in userProfile.tags" :key="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 当前里程碑 -->
    <div class="card fade-in">
      <div class="milestone">
        <h3>当前里程碑</h3>
        <ul>
          <li v-for="(item, index) in userProfile.currentMilestone" :key="index">
            ✅ {{ item }}
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 创业进展条 -->
    <div class="card fade-in">
      <h3>{{ userProfile.mainGoal }}</h3>
      <div class="progress-section">
        <div class="progress-item" v-for="(item, index) in userProfile.progress" :key="index">
          <div class="progress-header">
            <span>{{ item.name }}</span>
            <span class="status" :class="item.completed ? 'completed' : 'pending'">
              {{ item.completed ? '已完成' : '未完成' }}
            </span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: item.completed ? '100%' : '0%' }"></div>
          </div>
        </div>
      </div>
      <div class="hint">
        <span class="warning-icon">⚠️</span>
        <span>{{ userProfile.hint }}</span>
      </div>
    </div>
    
    <!-- 创业健康度看板 -->
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
    
    <!-- 快捷行动区 -->
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* 页面标题 */
.page-header {
  grid-column: 1 / -1;
  margin-bottom: 0;
  position: static;
  transform: none;
  max-width: 100%;
  box-shadow: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  color: var(--text-primary);
  text-align: left;
}

/* 创业身份卡 */
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 0.5rem 0;
  text-align: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--primary-color);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0 0 0.3rem 0;
  font-size: 1.2rem;
}

.tags {
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
}

.milestone {
  text-align: left;
}

.milestone ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  max-width: none;
}

.milestone li {
  margin: 0 0 0.4rem 0;
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.4;
  text-align: left;
}

/* 创业进展条 */
.progress-section {
  margin-bottom: 0.8rem;
}

.progress-item {
  margin-bottom: 0.8rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
}

.status {
  font-size: 0.75rem;
  font-weight: 500;
}

.status.completed {
  color: var(--success-color);
}

.status.pending {
  color: var(--warning-color);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.hint {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  background-color: rgba(250, 173, 20, 0.1);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  color: var(--warning-color);
  margin-top: 0.5rem;
}

.warning-icon {
  font-size: 0.9rem;
}

/* 快捷行动区 */
.quick-actions {
  grid-column: 1 / -1;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 0.8rem 0.5rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: auto;
  grid-column: span 1;
  min-width: 200px;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}

.action-icon {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.action-title {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 500;
}

.action-desc {
  display: none;
}

/* 健康看板样式 */
.health-dashboard {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
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

/* 风险预警闪烁效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 风险卡片闪烁效果 */
.action-card:nth-child(3) {
  animation: pulse 2s infinite;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
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

@media (min-width: 769px) and (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1025px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>