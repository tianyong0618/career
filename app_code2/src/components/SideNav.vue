<template>
  <aside class="side-nav">
    <div class="nav-header">
      <div class="nav-logo gradient-text">MyCareer OS</div>
    </div>
    <nav class="nav-menu">
      <router-link 
        to="/" 
        class="nav-item"
        :class="{ active: $route.path === '/' }"
      >
        <i class="fas fa-th-large"></i> <span class="nav-text">职业孪生</span>
      </router-link>
      <router-link 
        to="/path-sandbox" 
        class="nav-item"
        :class="{ active: $route.path === '/path-sandbox' }"
      >
        <i class="fas fa-route"></i> <span class="nav-text">路径沙盒</span>
      </router-link>
      <router-link 
        to="/growth-center" 
        class="nav-item"
        :class="{ active: $route.path === '/growth-center' }"
      >
        <i class="fas fa-seedling"></i> <span class="nav-text">成长中心</span>
      </router-link>
      <router-link 
        to="/ai-assessment" 
        class="nav-item"
        :class="{ active: $route.path === '/ai-assessment' }"
      >
        <i class="fas fa-brain"></i> <span class="nav-text">AI测评</span>
      </router-link>
      <router-link 
        to="/ai-partner" 
        class="nav-item"
        :class="{ active: $route.path === '/ai-partner' }"
      >
        <i class="fas fa-robot"></i> <span class="nav-text">AI经纪人</span>
      </router-link>
    </nav>
    <div class="nav-footer">
      <div class="user-info">
        <div class="user-avatar"></div>
        <div class="user-details">
          <p class="user-name">张小帅</p>
          <p class="user-level">Lv.14 资深开发</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.side-nav {
  width: 100%;
  max-width: 280px;
  height: 100%;
  border-right: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0.75rem;
  background-color: #0f172a;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.side-nav.open {
  transform: translateX(0);
}

.nav-header {
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-logo {
  font-size: 1.125rem;
  font-weight: bold;
}

.gradient-text {
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  justify-content: flex-start;
}

.nav-item.active {
  background-color: #2563eb;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
}

.nav-item:hover:not(.active) {
  background-color: #1e293b;
  color: #cbd5e1;
}

.nav-text {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #1e293b;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.5rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(to top right, #60a5fa, #8b5cf6);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
}

.user-level {
  font-size: 0.75rem;
  color: #94a3b8;
}


</style>