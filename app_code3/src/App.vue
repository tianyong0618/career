<script setup>
</script>

<template>
  <div class="app-container">
    <!-- 页面内容 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 底部导航栏 -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首页</span>
      </router-link>
      <router-link to="/ai-tutor" class="nav-item">
        <span class="nav-icon">🤖</span>
        <span class="nav-text">AI导师</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding: 0;
  margin: 0 auto;
  max-width: 420px;
  width: 100%;
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  padding: 0;
  padding-bottom: 60px; /* 为底部导航留出空间 */
  box-sizing: border-box;
}

/* 底部导航栏 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 420px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-sizing: border-box;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #666;
  font-size: 0.8rem;
  transition: color 0.3s;
}

.nav-item.router-link-active {
  color: #1890ff;
}

.nav-icon {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.nav-text {
  font-size: 0.7rem;
}
</style>
