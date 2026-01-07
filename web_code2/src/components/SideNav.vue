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
  width: 15%;
  max-width: 3.5rem;
  height: 100%;
  border-right: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0.5rem;
  background-color: #0f172a;
  transition: width 0.3s ease;
}

/* 大屏样式 */
@media (min-width: 1024px) {
  .side-nav {
    width: 15%;
    max-width: none;
    padding: 2rem 1.25rem;
    flex: none;
  }
}

.nav-header {
  margin-bottom: 2.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-logo {
  font-size: 1.25rem;
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
  gap: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.125rem;
  justify-content: center;
}

@media (min-width: 1024px) {
  .nav-item {
    justify-content: flex-start;
  }
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
  display: none;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (min-width: 1024px) {
  .nav-text {
    display: block;
  }
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
  display: none;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .user-details {
    display: flex;
  }
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