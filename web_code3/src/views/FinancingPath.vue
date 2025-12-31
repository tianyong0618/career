<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { investmentInstitutions, guidingFunds, equityStructureSuggestions } from '../data/mockData.js'

// 注册 Chart.js 组件
Chart.register(...registerables)

// 企业阶段选项
const stages = ['种子轮', '天使轮', 'A轮']

// 当前选择的企业阶段
const selectedStage = ref('种子轮')

// 融资沙盘参数
const valuation = ref(1000) // 估值（万元）
const dilutionRatio = ref(15) // 稀释比例（%）

// 根据当前阶段过滤投资机构
const filteredInstitutions = computed(() => {
  return investmentInstitutions.filter(institution => {
    return institution.investmentStage.includes(selectedStage.value)
  })
})

// 根据当前阶段过滤引导基金
const filteredFunds = computed(() => {
  return guidingFunds.filter(fund => {
    return fund.supportedStage.includes(selectedStage.value)
  })
})

// 获取当前阶段的股权结构建议
const currentEquitySuggestion = computed(() => {
  return equityStructureSuggestions[selectedStage.value]
})

// 计算控制权变化
const controlChange = computed(() => {
  return {
    currentControl: 100, // 当前控制权
    afterControl: 100 - dilutionRatio.value, // 融资后控制权
    investment: (valuation.value * dilutionRatio.value) / 100 // 融资金额
  }
})

// 图表引用
const chartRef = ref(null)
let chartInstance = null

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d')
    
    // 销毁现有图表实例
    if (chartInstance) {
      chartInstance.destroy()
    }
    
    // 创建新图表
    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['创始人控制权', '投资方股权'],
        datasets: [{
          data: [controlChange.value.afterControl, dilutionRatio.value],
          backgroundColor: ['#3498db', '#e74c3c'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
}

// 更新图表
const updateChart = () => {
  if (chartInstance) {
    chartInstance.data.datasets[0].data = [controlChange.value.afterControl, dilutionRatio.value]
    chartInstance.update()
  }
}

// 生命周期钩子：组件挂载后初始化图表
onMounted(() => {
  initChart()
})

// 监听参数变化，更新图表
watch([valuation, dilutionRatio], () => {
  updateChart()
})
</script>

<template>
  <div class="financing-path">
    <h1>融资路径规划</h1>
    
    <!-- 企业阶段选择 -->
    <div class="card">
      <h2>企业阶段选择</h2>
      <div class="stage-selector">
        <button 
          v-for="stage in stages" 
          :key="stage"
          :class="['stage-btn', { active: selectedStage === stage }]"
          @click="selectedStage = stage"
        >
          {{ stage }}
        </button>
      </div>
    </div>
    
    <!-- 投资机构推荐 -->
    <div class="card">
      <h2>推荐投资机构</h2>
      <div class="institutions-list">
        <div class="institution-item" v-for="institution in filteredInstitutions" :key="institution.id">
          <div class="institution-info">
            <h3>{{ institution.name }}</h3>
            <p><strong>专注领域：</strong>{{ institution.focus }}</p>
            <p><strong>投资阶段：</strong>{{ institution.investmentStage }}</p>
            <p><strong>投资规模：</strong>{{ institution.investmentAmount }}</p>
            <p><strong>成功案例：</strong>{{ institution.successCases.join(', ') }}</p>
            <p class="description">{{ institution.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 引导基金推荐 -->
    <div class="card">
      <h2>可申报引导基金</h2>
      <div class="funds-list">
        <div class="fund-item" v-for="fund in filteredFunds" :key="fund.id">
          <div class="fund-info">
            <h3>{{ fund.name }}</h3>
            <p><strong>基金类型：</strong>{{ fund.type }}</p>
            <p><strong>支持阶段：</strong>{{ fund.supportedStage }}</p>
            <p><strong>支持金额：</strong>{{ fund.amount }}</p>
            <p><strong>申报条件：</strong>{{ fund.eligibility }}</p>
            <p><strong>截止日期：</strong>{{ fund.deadline }}</p>
            <div class="application-process">
              <strong>申报流程：</strong>
              <ol>
                <li v-for="(step, index) in fund.applicationProcess" :key="index">{{ step }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 股权结构设计建议 -->
    <div class="card" v-if="currentEquitySuggestion">
      <h2>股权结构设计建议</h2>
      <div class="equity-suggestion">
        <div class="equity-distribution">
          <h3>股权分配建议</h3>
          <div class="distribution-grid">
            <div class="distribution-item">
              <span class="label">创始人团队：</span>
              <span class="value">{{ currentEquitySuggestion.founderTeam }}</span>
            </div>
            <div class="distribution-item">
              <span class="label">期权池：</span>
              <span class="value">{{ currentEquitySuggestion.optionPool }}</span>
            </div>
            <div class="distribution-item">
              <span class="label">投资方：</span>
              <span class="value">{{ currentEquitySuggestion.investors }}</span>
            </div>
          </div>
        </div>
        
        <div class="equity-tips">
          <h3>设计建议</h3>
          <ul>
            <li v-for="(tip, index) in currentEquitySuggestion.suggestions" :key="index">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 融资沙盘 -->
    <div class="card">
      <h2>融资沙盘模拟</h2>
      <div class="sandbox-container">
        <!-- 参数设置 -->
        <div class="sandbox-params">
          <div class="param-item">
            <label>公司估值（万元）：</label>
            <input 
              type="number" 
              v-model.number="valuation" 
              min="100" 
              max="10000" 
              step="100"
            />
          </div>
          <div class="param-item">
            <label>稀释比例：{{ dilutionRatio }}%：</label>
            <input 
              type="range" 
              v-model.number="dilutionRatio" 
              min="5" 
              max="40" 
              step="1"
            />
          </div>
        </div>
        
        <!-- 结果展示 -->
        <div class="sandbox-results">
          <div class="result-item">
            <span class="label">当前控制权：</span>
            <span class="value">{{ controlChange.currentControl }}%</span>
          </div>
          <div class="result-item">
            <span class="label">融资后控制权：</span>
            <span class="value">{{ controlChange.afterControl }}%</span>
          </div>
          <div class="result-item">
            <span class="label">融资金额：</span>
            <span class="value">{{ controlChange.investment }}万元</span>
          </div>
        </div>
        
        <!-- 图表展示 -->
        <div class="chart-container">
          <canvas ref="chartRef"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.financing-path {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
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

.card h3 {
  margin: 0 0 0.8rem 0;
  font-size: 1rem;
  color: var(--text-primary);
}

/* 企业阶段选择器 */
.stage-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stage-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.stage-btn:hover {
  border-color: var(--primary-color);
}

.stage-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* 投资机构列表 */
.institutions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.institution-item {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1rem;
  transition: all 0.3s ease;
}

.institution-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.institution-info p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.institution-info .description {
  margin-top: 0.8rem;
  font-style: italic;
  color: var(--text-secondary);
}

/* 引导基金列表 */
.funds-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.fund-item {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1rem;
  transition: all 0.3s ease;
}

.fund-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.fund-info p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.application-process {
  margin-top: 0.8rem;
}

.application-process ol {
  margin: 0.3rem 0 0 1.5rem;
  padding: 0;
}

.application-process li {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.2rem;
  line-height: 1.3;
}

/* 股权结构设计建议 */
.equity-suggestion {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.equity-distribution, .equity-tips {
  margin-bottom: 1rem;
}

.distribution-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.distribution-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--bg-primary);
  border-radius: var(--radius-sm);
}

.distribution-item .label {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
}

.distribution-item .value {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
}

.equity-tips ul {
  margin: 0.3rem 0 0 1.5rem;
  padding: 0;
}

.equity-tips li {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
  line-height: 1.4;
}

/* 融资沙盘 */
.sandbox-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* 参数设置 */
.sandbox-params {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.param-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.param-item label {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
}

.param-item input[type="number"] {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
}

.param-item input[type="range"] {
  width: 100%;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
}

.param-item input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
}

.param-item input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* 结果展示 */
.sandbox-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.result-item .label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.result-item .value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
}

/* 图表展示 */
.chart-container {
  width: 100%;
  height: 300px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .financing-path {
    padding: 1rem;
  }
  
  .stage-selector {
    flex-direction: column;
  }
  
  .institutions-list,
  .funds-list {
    grid-template-columns: 1fr;
  }
  
  .equity-suggestion {
    grid-template-columns: 1fr;
  }
  
  .sandbox-params {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 250px;
  }
}
</style>