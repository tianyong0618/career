<template>
  <nav class="bottom-nav">
    <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
      <div class="nav-icon">🏠</div>
      <div class="nav-text">首页</div>
    </router-link>
    <router-link to="/path-sandbox" class="nav-item" :class="{ active: $route.path === '/path-sandbox' }">
      <div class="nav-icon">🧭</div>
      <div class="nav-text">路径沙盒</div>
    </router-link>
    <router-link to="/ai-partner" class="nav-item" :class="{ active: $route.path === '/ai-partner' }">
      <div class="nav-icon ai-icon">🤖</div>
      <div class="nav-text">AI合伙人</div>
    </router-link>
    <router-link to="/growth-center" class="nav-item" :class="{ active: $route.path === '/growth-center' }">
      <div class="nav-icon">📈</div>
      <div class="nav-text">成长中心</div>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-sm) 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  flex: 1;
}

.nav-item.active {
  color: var(--primary-color);
  background-color: var(--bg-secondary);
}

.nav-icon {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
}

.ai-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.nav-text {
  font-size: var(--font-size-xs);
  font-weight: 500;
}

/* 桌面端隐藏底部导航 */
@media (min-width: 769px) {
  .bottom-nav {
    display: none;
  }
}
</style>