<template>
  <div class="radar-chart card">
    <div class="card-header">
      <h3>职业倾向雷达图</h3>
    </div>
    <div class="card-content">
      <div class="chart-container">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { careerTendency } from '../assets/mock/data'

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
    
    chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: careerTendency.labels,
        datasets: [{
          label: '我的职业倾向',
          data: careerTendency.data,
          backgroundColor: 'rgba(24, 144, 255, 0.2)',
          borderColor: 'rgba(24, 144, 255, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(24, 144, 255, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(24, 144, 255, 1)',
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
            intersect: false
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
            },
            grid: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
            },
            pointLabels: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
              font: {
                size: 12
              }
            },
            angleLines: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
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
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

.chart-container {
  width: 100%;
  height: 300px;
}
</style>