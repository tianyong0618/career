<template>
  <div class="progress-bar-component">
    <div class="progress-header">
      <h3 class="progress-title">{{ title }}</h3>
      <span class="progress-percentage">{{ percentage }}%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: percentage + '%' }"></div>
    </div>
    <span class="progress-label">{{ label }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '成长进度'
  },
  percentage: {
    type: Number,
    default: 50
  },
  label: {
    type: String,
    default: '当前成长进度'
  }
})
</script>

<style scoped>
.progress-bar-component {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.progress-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.progress-percentage {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--success-color);
  margin: 0;
}

.progress-track {
  height: 12px;
  background-color: var(--bg-tertiary);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin: var(--spacing-md) 0;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 6px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
}

.progress-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
  display: block;
}
</style>