<template>
  <div class="radar-chart card">
    <div class="card-header">
      <h3>能力图谱 (Career Radar)</h3>
    </div>
    <div class="card-content">
      <div class="chart-container">
        <canvas ref="chartRef"></canvas>
      </div>
      <div class="scores-container">
        <div class="score-item">
          <div class="score-value">88</div>
          <div class="score-label">技术分</div>
        </div>
        <div class="score-item">
          <div class="score-value">72</div>
          <div class="score-label">商业感</div>
        </div>
        <div class="score-item">
          <div class="score-value">95</div>
          <div class="score-label">可靠性</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue'
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// 注册Chart.js组件
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartRef = ref(null)
let chart = null

const createChart = () => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d')
    
    // 销毁现有图表（如果存在）
    if (chart) {
      chart.destroy()
    }
    
    // 4. 创建图表，使用动态计算的颜色
    chart = new Chart(ctx, {

      type: 'radar',
      data: {
        labels: ['技术硬实力', '产品思维', '行业人脉', '软技能', '执行力', '学习速度'],
        datasets: [{
          label: '我的能力图谱',
          data: [85, 60, 40, 50, 70, 90],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
          pointRadius: 5,
          pointHoverRadius: 7
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
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(59, 130, 246, 0.5)',
            borderWidth: 1,
            padding: 12,
            font: {
              size: 13
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false,
              stepSize: 20,
              color: '#94a3b8',
              backdropColor: 'transparent',
              font: {
                size: 12,
                weight: '600'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#f8fafc',
              font: {
                size: 13,
                weight: '700'
              }
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    })
  }
}

onMounted(() => {
  createChart()
  
  // 监听主题变化
  const observer = new MutationObserver(() => {
    createChart()
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })
})

// 监听窗口大小变化
watch(() => window.innerWidth, () => {
  createChart()
})
</script>

<style scoped>
.radar-chart {
  margin-bottom: var(--spacing-lg);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  font-weight: 700;
}

.chart-container {
  width: 100%;
  height: 300px;
  padding: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.scores-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all var(--transition-fast);
}

.score-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  border-color: var(--primary-color);
}

.score-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.score-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chart-container {
    height: 250px;
    padding: var(--spacing-md);
  }
  
  .scores-container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .score-item {
    flex-direction: row;
    gap: var(--spacing-md);
    min-width: auto;
    width: 100%;
    justify-content: space-between;
  }
}
</style>