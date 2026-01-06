<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
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
    
    chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['技术硬实力', '产品思维', '行业人脉', '软技能', '执行力', '学习速度'],
        datasets: [{
          label: '当前能力',
          data: [88, 72, 65, 80, 95, 90],
          fill: true,
          backgroundColor: 'rgba(56, 189, 248, 0.2)',
          borderColor: '#38bdf8',
          pointBackgroundColor: '#38bdf8',
          borderWidth: 2,
          pointBorderColor: '#0f172a',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#38bdf8',
          pointRadius: 4,
          pointHoverRadius: 6
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
            angleLines: { color: 'rgba(255,255,255,0.1)' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            pointLabels: { 
              color: '#94a3b8', 
              font: { size: 10 }
            },
            ticks: { display: false }
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
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>