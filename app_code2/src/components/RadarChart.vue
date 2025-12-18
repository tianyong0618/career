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
    
    // 1. 获取画布的实际背景颜色
    // 方法1: 从卡片元素获取背景色
    const cardElement = chartRef.value.closest('.card');
    let bgColor = '#ffffff'; // 默认白色背景
    
    if (cardElement) {
      bgColor = getComputedStyle(cardElement).backgroundColor;
      console.log('从卡片获取的背景色:', bgColor);
    }
    
    // 2. 解析背景色并计算亮度
    const parseColor = (color) => {
      let r = 255, g = 255, b = 255;
      
      // 解析RGB格式
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        r = parseInt(rgbMatch[1]);
        g = parseInt(rgbMatch[2]);
        b = parseInt(rgbMatch[3]);
      }
      // 解析RGBA格式
      const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
      if (rgbaMatch) {
        r = parseInt(rgbaMatch[1]);
        g = parseInt(rgbaMatch[2]);
        b = parseInt(rgbaMatch[3]);
      }
      // 解析十六进制格式
      else if (color.startsWith('#')) {
        const hex = color.slice(1);
        r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
        g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
        b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
      }
      
      return { r, g, b };
    };
    
    const { r, g, b } = parseColor(bgColor);
    
    // 计算相对亮度 (WCAG标准)
    const calculateLuminance = (r, g, b) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };
    
    const luminance = calculateLuminance(r, g, b);
    console.log('背景色RGB:', r, g, b);
    console.log('背景色亮度:', luminance);
    
    // 3. 根据亮度决定字体颜色
    // 亮度 < 0.5 使用白色字体，否则使用黑色字体
    const isDarkBackground = luminance < 0.5;
    const textColor = isDarkBackground ? '#ffffff' : '#000000';
    const secondaryTextColor = isDarkBackground ? '#b0b0b0' : '#666666';
    const gridColor = isDarkBackground ? 'rgba(255, 255, 255, 0.3)' : '#666666';
    
    console.log('是否深色背景:', isDarkBackground);
    console.log('使用的文本颜色:', textColor);
    
    // 4. 创建图表，使用动态计算的颜色
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
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
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
            intersect: false,
            backgroundColor: isDarkBackground ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.8)',
            titleColor: isDarkBackground ? '#000000' : '#ffffff',
            bodyColor: isDarkBackground ? '#000000' : '#ffffff',
            borderColor: isDarkBackground ? '#cccccc' : '#404040',
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
              stepSize: 20,
              color: textColor,
              backdropColor: 'transparent',
              font: {
                size: 12,
                weight: '600'
              }
            },
            grid: {
              color: gridColor
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 13,
                weight: '700'
              }
            },
            angleLines: {
              color: gridColor
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