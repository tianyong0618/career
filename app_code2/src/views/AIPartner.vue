<template>
  <div class="ai-partner-container">
    <div class="container">
      <!-- AI合伙人头部 -->
      <section class="ai-header-section">
        <div class="ai-header-card">
          <div class="ai-avatar">🤖</div>
          <div class="ai-info">
            <h2 class="ai-name">AI合伙人</h2>
            <p class="ai-status">在线</p>
          </div>
        </div>
      </section>

      <!-- 聊天界面 -->
      <section class="chat-section">
        <div class="chat-container">
          <!-- 聊天记录 -->
          <div class="chat-messages" ref="chatMessages">
            <!-- 系统欢迎消息 -->
            <div class="message-item ai-message">
              <div class="message-avatar">🤖</div>
              <div class="message-content">
                <div class="message-text">
                  你好！我是你的AI职业合伙人，随时为你提供职业咨询和建议。有什么我可以帮助你的吗？
                </div>
                <div class="message-time">刚刚</div>
              </div>
            </div>

            <!-- 用户消息示例 -->
            <div class="message-item user-message" v-for="(message, index) in messages" :key="index">
              <div class="message-content">
                <div class="message-text">{{ message.text }}</div>
                <div class="message-time">{{ message.time }}</div>
              </div>
              <div class="message-avatar">👤</div>
            </div>
          </div>

          <!-- 快速提问选项 -->
          <div class="quick-questions" v-if="messages.length === 0">
            <h4 class="quick-questions-title">快速提问</h4>
            <div class="quick-question-buttons">
              <button class="quick-question-btn" @click="sendQuickQuestion('如何提升数据分析能力？')">
                如何提升数据分析能力？
              </button>
              <button class="quick-question-btn" @click="sendQuickQuestion('如何准备面试？')">
                如何准备面试？
              </button>
              <button class="quick-question-btn" @click="sendQuickQuestion('如何规划职业发展？')">
                如何规划职业发展？
              </button>
            </div>
          </div>

          <!-- 消息输入框 -->
          <div class="message-input-container">
            <input 
              type="text" 
              class="message-input" 
              v-model="inputMessage" 
              placeholder="输入你的问题..." 
              @keyup.enter="sendMessage"
            >
            <button class="send-btn" @click="sendMessage">发送</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// 聊天消息列表
const messages = ref([])
// 输入框内容
const inputMessage = ref('')
// 聊天容器引用
const chatMessages = ref(null)

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  // 添加用户消息到列表
  const newMessage = {
    text: inputMessage.value.trim(),
    time: '刚刚'
  }
  messages.value.push(newMessage)
  
  // 清空输入框
  inputMessage.value = ''
  
  // 滚动到底部
  scrollToBottom()
}

// 发送快速提问
const sendQuickQuestion = (question) => {
  inputMessage.value = question
  sendMessage()
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.ai-partner-container {
  padding: var(--spacing-lg) 0;
}

/* AI合伙人头部 */
.ai-header-section {
  margin-bottom: var(--spacing-lg);
}

.ai-header-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.ai-avatar {
  font-size: var(--font-size-3xl);
}

.ai-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.ai-name {
  font-size: var(--font-size-xl);
  margin: 0;
}

.ai-status {
  font-size: var(--font-size-sm);
  color: var(--success-color);
  margin: 0;
}

/* 聊天界面 */
.chat-section {
  margin-bottom: var(--spacing-xl);
}

.chat-container {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 320px);
  max-height: 600px;
}

/* 聊天记录 */
.chat-messages {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* 消息项 */
.message-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  max-width: 85%;
}

/* AI消息 */
.ai-message {
  align-self: flex-start;
}

/* 用户消息 */
.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

/* 消息头像 */
.message-avatar {
  font-size: var(--font-size-lg);
  min-width: 36px;
  display: flex;
  align-items: flex-start;
}

/* 消息内容 */
.message-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-width: calc(100% - 48px);
}

.ai-message .message-content {
  background-color: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);
}

.user-message .message-content {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg);
}

/* 消息文本 */
.message-text {
  font-size: var(--font-size-md);
  line-height: 1.5;
}

.user-message .message-text {
  color: white;
}

/* 消息时间 */
.message-time {
  font-size: var(--font-size-xs);
  opacity: 0.7;
  align-self: flex-end;
}

/* 快速提问选项 */
.quick-questions {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
}

.quick-questions-title {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.quick-question-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.quick-question-btn {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.quick-question-btn:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-1px);
}

/* 消息输入框 */
.message-input-container {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

.message-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  outline: none;
  transition: all var(--transition-fast);
  background-color: var(--bg-secondary);
}

.message-input:focus {
  border-color: var(--primary-color);
  background-color: var(--bg-primary);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.send-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.send-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 自定义滚动条 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .ai-partner-container {
    padding-bottom: 80px;
  }
  
  .chat-container {
    height: calc(100vh - 300px);
    max-height: 500px;
  }
  
  .message-item {
    max-width: 95%;
  }
  
  .quick-question-buttons {
    grid-template-columns: 1fr;
  }
  
  .message-input-container {
    padding: var(--spacing-md);
  }
  
  .send-btn {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>