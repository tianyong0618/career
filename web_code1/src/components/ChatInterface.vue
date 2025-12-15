<script setup>
// AI合伙人-对话式助手组件
</script>

<template>
  <div class="chat-interface-card card">
    <div class="card-header">
      <h3>AI 合伙人：对话式助手</h3>
      <p>7×24 小时职业顾问，替代传统客服</p>
    </div>
    <div class="card-content">
      <!-- 对话历史 -->
      <div class="chat-history">
        <div class="message-item ai-message">
          <div class="message-avatar">🤖</div>
          <div class="message-content">
            <div class="message-text">
              你好！我是你的职业顾问AI，有什么可以帮助你的吗？
            </div>
          </div>
        </div>
        
        <div class="message-item user-message">
          <div class="message-content">
            <div class="message-text">
              我想转行做AI训练师，难吗？
            </div>
          </div>
          <div class="message-avatar">👤</div>
        </div>
        
        <div class="message-item ai-message">
          <div class="message-avatar">🤖</div>
          <div class="message-content">
            <div class="message-text">
              根据你的背景（计算机+Python），转型难度中等。
              <br/><br/>
              建议路径：
              <br/>1️⃣ 学习Prompt Engineering（推荐课程《AI提示工程实战》）
              <br/>2️⃣ 完成'标注医疗文本'微任务（来自合作企业）
              <br/>3️⃣ 更新简历关键词为'大模型数据处理'
              <br/><br/>
              要我帮你生成学习计划吗？
            </div>
            <div class="message-actions">
              <button class="action-btn">👍 有用</button>
              <button class="action-btn">📋 复制</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="chat-input-area">
        <div class="input-container">
          <input type="text" placeholder="输入你的问题，例如：我想转行做AI训练师，难吗？" />
          <div class="input-actions">
            <button class="action-icon-btn">🎤</button>
            <button class="action-icon-btn">📎</button>
            <button class="btn-primary">发送</button>
          </div>
        </div>
        
        <!-- 快捷问题 -->
        <div class="quick-questions">
          <button class="quick-question-btn">我的简历需要优化吗？</button>
          <button class="quick-question-btn">数据分析需要学习哪些技能？</button>
          <button class="quick-question-btn">如何准备产品经理面试？</button>
        </div>
      </div>
      
      <!-- 简历上传 -->
      <div class="resume-upload">
        <h4>快速完善职业镜像：</h4>
        <div class="upload-options">
          <button class="btn-secondary">📄 上传简历</button>
          <button class="btn-outline">🔗 社交授权</button>
          <button class="btn-outline">📋 开始测评</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-interface-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  height: 600px;
  display: flex;
  flex-direction: column;
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

.card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

/* 对话历史 */
.chat-history {
  flex: 1;
  overflow-y: auto;
  margin-bottom: var(--spacing-lg);
  padding-right: var(--spacing-sm);
}

.message-item {
  display: flex;
  margin-bottom: var(--spacing-lg);
  animation: fadeIn var(--transition-normal) ease-out;
}

.message-item.ai-message {
  justify-content: flex-start;
  gap: var(--spacing-md);
}

.message-item.user-message {
  justify-content: flex-end;
  gap: var(--spacing-md);
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-large);
  flex-shrink: 0;
}

.user-message .message-avatar {
  background-color: var(--secondary-color);
}

.message-content {
  max-width: 70%;
}

.ai-message .message-content {
  background-color: #f0f7ff;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  border-left: 3px solid var(--primary-color);
}

.user-message .message-content {
  background-color: var(--primary-color);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  color: white;
}

.message-text {
  line-height: 1.6;
  font-size: var(--font-size-medium);
}

.user-message .message-text {
  color: white;
}

.message-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.action-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: var(--font-size-small);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background-color: rgba(24, 144, 255, 0.1);
}

/* 输入区域 */
.chat-input-area {
  border-top: 1px solid var(--border-color);
  padding-top: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.input-container {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.input-container input {
  flex: 1;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-medium);
  resize: none;
}

.input-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.action-icon-btn {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--font-size-large);
}

.action-icon-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* 快捷问题 */
.quick-questions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.quick-question-btn {
  background-color: #f5f5f5;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-small);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
}

.quick-question-btn:hover {
  background-color: #e8f4f8;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* 简历上传 */
.resume-upload {
  border-top: 1px solid var(--border-color);
  padding-top: var(--spacing-lg);
}

.resume-upload h4 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-primary);
  font-size: var(--font-size-medium);
}

.upload-options {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .chat-interface-card {
    height: 500px;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .input-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .input-actions {
    justify-content: flex-end;
  }
  
  .upload-options {
    flex-direction: column;
  }
}
</style>