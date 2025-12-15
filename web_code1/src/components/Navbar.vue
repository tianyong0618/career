<script setup>
// 导航栏组件
</script>

<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <h1>MyCareer OS</h1>
    </div>
    <div class="navbar-actions">
      <button class="btn-primary">下载APP</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-logo h1 {
  margin: 0;
  font-size: var(--font-size-large);
  font-weight: bold;
  color: white;
}

.navbar-actions {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

@media (max-width: 768px) {
  .navbar {
    padding: var(--spacing-md);
  }
  
  .navbar-logo h1 {
    font-size: var(--font-size-medium);
  }
  
  .navbar-actions button {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-small);
  }
}
</style>