<script setup>
// 路径沙盒-未来推演组件
</script>

<template>
  <div class="path-simulator-card card">
    <div class="card-header">
      <h3>路径沙盒：未来推演</h3>
      <p>让用户"试错人生"，降低决策焦虑</p>
    </div>
    <div class="card-content">
      <!-- 目标选择 -->
      <div class="goal-selection">
        <h4>选择你的职业目标：</h4>
        <div class="goal-input">
          <input type="text" placeholder="例如：5年内成为产品经理" />
          <button class="btn-primary">生成路径</button>
        </div>
      </div>
      
      <!-- 路径列表 -->
      <div class="path-list">
        <div class="path-item active">
          <div class="path-header">
            <h4>路径 1：直接就业</h4>
            <div class="path-stats">
              <span class="stat-item">成功率：82%</span>
              <span class="stat-item">风险：低</span>
            </div>
          </div>
          <div class="path-timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2024</div>
                <div class="timeline-event">学习产品经理核心课程</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2025</div>
                <div class="timeline-event">完成产品经理实习</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2026</div>
                <div class="timeline-event">成为初级产品经理</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2028</div>
                <div class="timeline-event">晋升为中级产品经理</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="path-item">
          <div class="path-header">
            <h4>路径 2：先读研再就业</h4>
            <div class="path-stats">
              <span class="stat-item">成功率：75%</span>
              <span class="stat-item">风险：中</span>
            </div>
          </div>
          <div class="path-timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2024</div>
                <div class="timeline-event">准备研究生考试</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2025</div>
                <div class="timeline-event">攻读产品管理硕士</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2027</div>
                <div class="timeline-event">毕业并成为初级产品经理</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">2030</div>
                <div class="timeline-event">晋升为中级产品经理</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 路径对比 -->
      <div class="path-comparison">
        <h4>路径对比</h4>
        <div class="comparison-controls">
          <button class="btn-outline">对比选中路径</button>
          <button class="btn-secondary">导出路径报告</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path-simulator-card {
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

.card-header p {
  margin: var(--spacing-xs) 0 0 0;
  color: var(--text-secondary);
  font-size: var(--font-size-medium);
}

/* 目标选择 */
.goal-selection {
  margin-bottom: var(--spacing-xl);
}

.goal-selection h4 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.goal-input {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.goal-input input {
  flex: 1;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-medium);
}

/* 路径列表 */
.path-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.path-item {
  background-color: #fafafa;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);
}

.path-item:hover {
  box-shadow: var(--shadow-sm);
  border-color: var(--primary-color);
}

.path-item.active {
  border-color: var(--primary-color);
  background-color: rgba(24, 144, 255, 0.05);
}

.path-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.path-header h4 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.path-stats {
  display: flex;
  gap: var(--spacing-md);
}

.stat-item {
  font-size: var(--font-size-small);
  font-weight: 500;
  color: var(--text-secondary);
}

/* 时间线 */
.path-timeline {
  position: relative;
  padding-left: var(--spacing-xl);
}

.path-timeline::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--border-color);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-lg);
}

.timeline-dot {
  position: absolute;
  left: -32px;
  top: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: 4px solid white;
  box-shadow: 0 0 0 2px var(--primary-color);
  z-index: 1;
}

.timeline-content {
  background-color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  border-left: 3px solid var(--primary-color);
}

.timeline-year {
  font-size: var(--font-size-small);
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.timeline-event {
  font-size: var(--font-size-medium);
  color: var(--text-primary);
}

/* 路径对比 */
.path-comparison {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.path-comparison h4 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.comparison-controls {
  display: flex;
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .goal-input {
    flex-direction: column;
    align-items: stretch;
  }
  
  .path-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
  
  .path-stats {
    width: 100%;
    justify-content: space-between;
  }
  
  .path-comparison {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-md);
  }
  
  .comparison-controls {
    flex-direction: column;
  }
}
</style>