<template>
  <div class="authorization-platform-view">
    <div class="container">
      <div class="page-header">
        <h2>授权平台</h2>
        <p>授权飞书/钉钉，仅读取日历与文档标题</p>
      </div>
      
      <div class="platform-options">
        <div class="platform-card" @click="authorizePlatform('feishu')">
          <div class="platform-icon">📧</div>
          <div class="platform-name">飞书</div>
          <div class="platform-desc">授权飞书访问权限</div>
          <div class="platform-features">
            <span class="feature-tag">日历</span>
            <span class="feature-tag">文档标题</span>
          </div>
        </div>
        
        <div class="platform-card" @click="authorizePlatform('dingtalk')">
          <div class="platform-icon">📱</div>
          <div class="platform-name">钉钉</div>
          <div class="platform-desc">授权钉钉访问权限</div>
          <div class="platform-features">
            <span class="feature-tag">日历</span>
            <span class="feature-tag">文档标题</span>
          </div>
        </div>
      </div>
      
      <div class="info-section">
        <div class="info-card">
          <div class="info-icon">🔒</div>
          <div class="info-content">
            <h3>隐私保护</h3>
            <p>我们仅读取您的日历与文档标题，不会获取任何内容详情。所有授权数据均严格保密，仅用于生成您的职业画像。</p>
          </div>
        </div>
      </div>
      
      <div class="nav-buttons">
        <button class="nav-btn back-btn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 授权平台
const authorizePlatform = (platform) => {
  // 这里模拟授权流程，实际项目中应该跳转到对应平台的授权页面
  console.log(`正在授权${platform}平台...`)
  
  // 模拟授权成功后返回，并标记为已完成
  setTimeout(() => {
    // 保存授权状态到localStorage
    localStorage.setItem('platformAuthorization', JSON.stringify({
      platform,
      authorized: true,
      authorizedAt: new Date().toISOString()
    }))
    
    // 直接进入冷启动第三步：生成镜像
    router.push('/onboarding?step=3')
  }, 1500)
}

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.authorization-platform-view {
  padding: var(--spacing-lg) var(--spacing-md);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-header h2 {
  font-size: var(--font-size-2xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.page-header p {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

.platform-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.platform-card {
  background-color: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.platform-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.platform-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
}

.platform-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.platform-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.platform-features {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.feature-tag {
  font-size: var(--font-size-xs);
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full, 9999px);
}

.info-section {
  margin-bottom: var(--spacing-xl);
}

.info-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
}

.info-icon {
  font-size: var(--font-size-2xl);
  margin-top: var(--spacing-xs);
  flex-shrink: 0;
}

.info-content h3 {
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.info-content p {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  line-height: 1.5;
}

.nav-buttons {
  display: flex;
  justify-content: center;
}

.nav-btn {
  padding: var(--spacing-sm) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex: 0 0 auto;
}

.back-btn {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.nav-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .platform-options {
    grid-template-columns: 1fr;
  }
  
  .info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-buttons {
    flex-direction: column;
  }
}
</style>