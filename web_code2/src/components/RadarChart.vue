<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)
let chart = null

onMounted(() => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d')
    
    chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['技术硬实力', '产品思维', '行业人脉', '软技能', '执行力', '学习速度'],
        datasets: [{
          label: '当前能力',
          data: [88, 72, 65, 80, 95, 90],
          fill: true,
          backgroundColor: 'rgba(101, 184, 255, 0.3)',
          borderColor: '#3b82f6',
          pointBackgroundColor: '#3b82f6',
          borderWidth: 2,
          pointRadius: 4
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
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#94a3b8',
              font: {
                size: 10
              }
            },
            ticks: {
              display: false
            }
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>