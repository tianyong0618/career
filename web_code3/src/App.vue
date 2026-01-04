<script setup>
import { ref } from 'vue';

// 导航切换功能
const navLinks = ref(null);

const toggleNav = () => {
  if (navLinks.value) {
    navLinks.value.classList.toggle('active');
  }
};
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <nav class="top-nav">
      <div class="nav-content">
        <h1 class="nav-logo">VenturePilot</h1>
        <ul class="nav-links" ref="navLinks">
          <li>
            <router-link to="/" class="nav-item">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">首页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/biz-plan-gen" class="nav-item">
              <span class="nav-icon">📄</span>
              <span class="nav-text">生成BP</span>
            </router-link>
          </li>
          <li>
            <router-link to="/policy-match" class="nav-item">
              <span class="nav-icon">🏛️</span>
              <span class="nav-text">政策匹配</span>
            </router-link>
          </li>
          <li>
            <router-link to="/risk-alert" class="nav-item">
              <span class="nav-icon">⚠️</span>
              <span class="nav-text">风险预警</span>
            </router-link>
          </li>
          <li>
            <router-link to="/resource-hub" class="nav-item">
              <span class="nav-icon">💼</span>
              <span class="nav-text">资源撮合</span>
            </router-link>
          </li>
          <li>
            <router-link to="/ai-tutor" class="nav-item">
              <span class="nav-icon">🤖</span>
              <span class="nav-text">AI导师</span>
            </router-link>
          </li>
          <li>
            <router-link to="/financing-path" class="nav-item">
              <span class="nav-icon">💰</span>
              <span class="nav-text">融资路径</span>
            </router-link>
          </li>
        </ul>
        <button class="nav-toggle" @click="toggleNav">
          ☰
        </button>
      </div>
    </nav>
    
    <!-- 页面内容 -->
    <main class="main-content">
      <router-view />
    </main>
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
  width: 100%;
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
}

/* 顶部导航栏 */
.top-nav {
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

/* 顶部导航内容 */
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

/* 导航链接 */
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 导航项 */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-item:hover {
  color: var(--primary-color);
}

/* 响应式导航按钮（移动端） */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .top-nav {
    padding: 1rem;
  }
  
  .nav-toggle {
    display: block;
  }
  
  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
  }
  
  .nav-links.active {
    transform: translateY(0);
  }
}

.nav-logo {
  margin: 0;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-text {
  font-size: 0.9rem;
}

/* 激活的导航项 */
.nav-item.router-link-active {
  color: var(--primary-color);
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }
  
  .nav-item {
    padding: 0.5rem 0;
  }
}
</style>