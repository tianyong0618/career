<script setup>
// 职业身份卡组件
</script>

<template>
  <div class="identity-card card">
    <div class="card-header">
      <h3>职业身份卡</h3>
    </div>
    <div class="card-content">
      <div class="identity-info">
        <div class="avatar">
          <div class="avatar-placeholder">👤</div>
        </div>
        <div class="user-info">
          <h2 class="user-name">张三</h2>
          <div class="user-tags">
            <span class="tag">24岁</span>
            <span class="tag">计算机专业</span>
            <span class="tag">擅长Python/数据分析</span>
            <span class="tag">求职中</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.identity-card {
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

.identity-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.avatar-placeholder {
  font-size: 3rem;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-primary);
  font-size: var(--font-size-xlarge);
}

.user-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: #e8f4f8;
  color: var(--primary-color);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-small);
  font-weight: 500;
}

@media (max-width: 768px) {
  .identity-info {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-lg);
  }
  
  .avatar {
    width: 80px;
    height: 80px;
  }
  
  .avatar-placeholder {
    font-size: 2.5rem;
  }
  
  .user-name {
    font-size: var(--font-size-large);
  }
}
</style>