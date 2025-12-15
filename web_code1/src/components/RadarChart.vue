<script setup>
// 职业倾向雷达图组件
</script>

<template>
  <div class="radar-chart-card card">
    <div class="card-header">
      <h3>职业倾向雷达图</h3>
    </div>
    <div class="card-content">
      <div class="radar-container">
        <!-- 简化版雷达图，使用CSS实现 -->
        <div class="radar-svg">
          <!-- 背景网格 -->
          <div class="radar-grid">
            <div class="grid-circle"></div>
            <div class="grid-circle"></div>
            <div class="grid-circle"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
            <div class="grid-line"></div>
          </div>
          
          <!-- 数据区域 -->
          <div class="radar-data">
            <div class="data-polygon" style="clip-path: polygon(50% 0%, 90% 20%, 80% 80%, 20% 80%, 10% 20%);"></div>
          </div>
          
          <!-- 标签 -->
          <div class="radar-labels">
            <div class="label-item top">技术型</div>
            <div class="label-item right-top">管理型</div>
            <div class="label-item right-bottom">创意型</div>
            <div class="label-item left-bottom">研究型</div>
            <div class="label-item left-top">社交型</div>
          </div>
          
          <!-- 数值标签 -->
          <div class="radar-values">
            <div class="value-item">85%</div>
            <div class="value-item">30%</div>
            <div class="value-item">60%</div>
            <div class="value-item">75%</div>
            <div class="value-item">45%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.radar-chart-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-large);
}

.radar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.radar-svg {
  position: relative;
  width: 250px;
  height: 250px;
}

.radar-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-circle {
  position: absolute;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background-color: transparent;
}

.grid-circle:nth-child(1) {
  width: 60%;
  height: 60%;
}

.grid-circle:nth-child(2) {
  width: 80%;
  height: 80%;
}

.grid-circle:nth-child(3) {
  width: 100%;
  height: 100%;
}

.grid-line {
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: var(--border-color);
  transform-origin: center;
}

.grid-line:nth-child(4) {
  transform: rotate(0deg);
}

.grid-line:nth-child(5) {
  transform: rotate(72deg);
}

.grid-line:nth-child(6) {
  transform: rotate(144deg);
}

.grid-line:nth-child(7) {
  transform: rotate(216deg);
}

.grid-line:nth-child(8) {
  transform: rotate(288deg);
}

.radar-data {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-polygon {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(24, 144, 255, 0.3);
  border: 2px solid var(--primary-color);
  clip-path: polygon(50% 0%, 90% 20%, 80% 80%, 20% 80%, 10% 20%);
}

.radar-labels {
  position: absolute;
  width: 100%;
  height: 100%;
}

.label-item {
  position: absolute;
  font-size: var(--font-size-small);
  font-weight: 500;
  color: var(--text-secondary);
}

.label-item.top {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.label-item.right-top {
  top: 20%;
  right: -30px;
}

.label-item.right-bottom {
  bottom: 20%;
  right: -30px;
}

.label-item.left-bottom {
  bottom: 20%;
  left: -30px;
}

.label-item.left-top {
  top: 20%;
  left: -30px;
}

.radar-values {
  position: absolute;
  width: 100%;
  height: 100%;
}

.value-item {
  position: absolute;
  font-size: var(--font-size-small);
  font-weight: bold;
  color: var(--primary-color);
}

.value-item:nth-child(1) {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}

.value-item:nth-child(2) {
  top: 30%;
  right: 15%;
}

.value-item:nth-child(3) {
  bottom: 30%;
  right: 15%;
}

.value-item:nth-child(4) {
  bottom: 30%;
  left: 15%;
}

.value-item:nth-child(5) {
  top: 30%;
  left: 15%;
}

@media (max-width: 768px) {
  .radar-container {
    height: 250px;
  }
  
  .radar-svg {
    width: 200px;
    height: 200px;
  }
  
  .label-item {
    font-size: 12px;
  }
  
  .label-item.right-top,
  .label-item.right-bottom {
    right: -25px;
  }
  
  .label-item.left-top,
  .label-item.left-bottom {
    left: -25px;
  }
}
</style>