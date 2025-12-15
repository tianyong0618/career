<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-container">
      <!-- 核心功能导航 -->
      <div class="sidebar-section">
        <h3 class="section-title">核心功能</h3>
        <ul class="sidebar-menu">
          <li class="menu-item">
            <router-link to="/" class="menu-link" :class="{ active: route.path === '/' }">
              <span class="menu-icon">📊</span>
              <span class="menu-text">我的创业概况</span>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/biz-plan-gen" class="menu-link" :class="{ active: route.path === '/biz-plan-gen' }">
              <span class="menu-icon">📄</span>
              <span class="menu-text">商业计划书生成器</span>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/policy-match" class="menu-link" :class="{ active: route.path === '/policy-match' }">
              <span class="menu-icon">🏛️</span>
              <span class="menu-text">政策匹配引擎</span>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/risk-alert" class="menu-link" :class="{ active: route.path === '/risk-alert' }">
              <span class="menu-icon">⚠️</span>
              <span class="menu-text">风险预警雷达</span>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/resource-hub" class="menu-link" :class="{ active: route.path === '/resource-hub' }">
              <span class="menu-icon">💼</span>
              <span class="menu-text">资源撮合Marketplace</span>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/ai-partner" class="menu-link" :class="{ active: route.path === '/ai-partner' }">
              <span class="menu-icon">🤖</span>
              <span class="menu-text">AI创业导师</span>
            </router-link>
          </li>
        </ul>
      </div>
      
      <!-- 快速访问 -->
      <div class="sidebar-section">
        <h3 class="section-title">快速访问</h3>
        <div class="quick-actions">
          <button class="quick-action-btn">
            <span class="btn-icon">📋</span>
            <span class="btn-text">创建任务</span>
          </button>
          <button class="quick-action-btn">
            <span class="btn-icon">📤</span>
            <span class="btn-text">导出数据</span>
          </button>
        </div>
      </div>
      
      <!-- 系统信息 -->
      <div class="sidebar-section">
        <div class="system-info">
          <p class="info-text">© 2025 VenturePilot™</p>
          <p class="info-text">版本: 1.0.0</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-sm);
  height: calc(100vh - 60px);
  position: fixed;
  left: 0;
  top: 60px;
  overflow-y: auto;
  z-index: 999;
}

.sidebar-container {
  padding: 20px 0;
}

.sidebar-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0 20px 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 4px;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  transition: var(--transition);
  border-left: 3px solid transparent;
}

.menu-link:hover {
  background-color: var(--bg-secondary);
  color: var(--primary-blue);
}

.menu-link.active {
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-blue);
  border-left-color: var(--primary-blue);
}

.menu-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.menu-text {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

/* 快速访问按钮 */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 20px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--bg-secondary);
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.quick-action-btn:hover {
  background-color: var(--primary-blue);
  color: white;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  flex: 1;
}

/* 系统信息 */
.system-info {
  padding: 0 20px;
  text-align: center;
}

.info-text {
  font-size: 12px;
  color: var(--text-tertiary);
  margin: 4px 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: var(--transition);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>