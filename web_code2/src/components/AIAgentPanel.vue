<template>
  <aside class="ai-panel">
    <div class="panel-header">
      <div class="header-icon">
        <div class="status-indicator"></div>
        <i class="fas fa-robot"></i>
      </div>
      <h3 class="panel-title">AI 经纪人 (Active)</h3>
    </div>

    <div class="panel-content">
      <!-- 正在自动沟通 -->
      <div class="info-card blue-card">
        <p class="info-label">正在自动沟通 (Negotiating)</p>
        <p class="info-title">"跨链协议前端开发" 兼职任务</p>
        <div class="info-footer">
          <span class="info-price">报价: $1,200</span>
          <span class="info-status">AI 报价中...</span>
        </div>
      </div>

      <!-- 自动投递 -->
      <div class="info-card green-card">
        <p class="info-label">自动投递 (Auto-apply)</p>
        <p class="info-title">发现 2 个高匹配职位已代表你应答</p>
        <button class="detail-btn">查看详情</button>
      </div>

      <!-- 信用资产 -->
      <div class="info-card purple-card">
        <p class="info-label">信用资产 (Trust Score)</p>
        <div class="score-section">
          <span class="score-value">782</span>
          <span class="score-change">+12</span>
        </div>
        <p class="score-rank">超过 92% 的同职级开发者</p>
      </div>
    </div>

    <div class="panel-footer">
      <div class="footer-item">
        <span class="footer-label">区块链存证状态</span>
        <span class="footer-value success">已加密同步</span>
      </div>
      <div class="footer-item">
        <span class="footer-label">数据安全性</span>
        <span class="footer-value info">零知识证明启动</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.ai-panel {
  width: 20rem;
  height: 100%;
  border-left: 1px solid #1e293b;
  padding: 1.5rem;
  background-color: #0f172a;
  display: none;
  flex-direction: column;
}

/* 大屏样式 */
@media (min-width: 1280px) {
  .ai-panel {
    display: flex;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.header-icon {
  position: relative;
  font-size: 2rem;
  color: #38bdf8;
}

.status-indicator {
  width: 0.75rem;
  height: 0.75rem;
  background-color: #22c55e;
  border-radius: 50%;
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.panel-title {
  font-size: 1.125rem;
  font-weight: bold;
}

.panel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 信息卡片 */
.info-card {
  background-color: #1e293b;
  padding: 1rem;
  border-radius: 1rem;
  border-left: 4px solid;
}

.blue-card {
  border-color: var(--blue-500);
}

.green-card {
  border-color: var(--green-500);
}

.purple-card {
  border-color: var(--purple-500);
}

.info-label {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-bottom: 0.25rem;
}

.info-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.info-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.info-price {
  font-size: 0.75rem;
  font-family: monospace;
  color: var(--blue-400);
}

.info-status {
  font-size: 0.625rem;
  background-color: rgba(59, 130, 246, 0.2);
  color: var(--blue-300);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.detail-btn {
  width: 100%;
  padding: 0.375rem;
  background-color: #374151;
  color: var(--text-primary);
  border: none;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  margin-top: 0.75rem;
  transition: background-color 0.3s ease;
}

.detail-btn:hover {
  background-color: #4b5563;
}

/* 分数部分 */
.score-section {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.score-value {
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
}

.score-change {
  font-size: 0.75rem;
  color: var(--green-400);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
}

.score-rank {
  font-size: 0.625rem;
  color: var(--text-tertiary);
  margin-top: 0.25rem;
}

/* 面板底部 */
.panel-footer {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.footer-value {
  font-weight: 500;
}

.success {
  color: var(--green-500);
}

.info {
  color: var(--blue-400);
}
</style>