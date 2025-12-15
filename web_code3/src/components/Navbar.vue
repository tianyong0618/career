<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isMenuOpen = ref(false);
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo和品牌名称 -->
      <div class="navbar-brand">
        <h1 class="brand-name">VenturePilot™</h1>
      </div>
      
      <!-- 导航菜单 -->
      <div class="navbar-menu">
        <ul class="menu-list">
          <li class="menu-item">
            <router-link to="/" class="menu-link" :class="{ active: route.path === '/' }">
              <span class="menu-icon">📊</span>
              我的创业概况
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/ai-partner" class="menu-link" :class="{ active: route.path === '/ai-partner' }">
              <span class="menu-icon">🤖</span>
              AI创业导师
            </router-link>
          </li>
        </ul>
      </div>
      
      <!-- 用户信息 -->
      <div class="navbar-user">
        <div class="user-avatar">
          <img src="https://via.placeholder.com/40" alt="用户头像" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-sm);
  z-index: 1000;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-blue);
  margin: 0;
}

.navbar-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.menu-list {
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
}

.menu-item {
  position: relative;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  transition: var(--transition);
  padding: 8px 12px;
  border-radius: var(--border-radius);
}

.menu-link:hover {
  color: var(--primary-blue);
  background-color: var(--bg-secondary);
}

.menu-link.active {
  color: var(--primary-blue);
  background-color: rgba(24, 144, 255, 0.1);
}

.menu-icon {
  font-size: 18px;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid transparent;
}

.user-avatar:hover {
  border-color: var(--primary-blue);
  transform: scale(1.05);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--bg-primary);
    box-shadow: var(--shadow-sm);
    padding: 16px 0;
    transform: translateY(-100%);
    transition: var(--transition);
    opacity: 0;
    visibility: hidden;
  }
  
  .navbar-menu.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .menu-list {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>