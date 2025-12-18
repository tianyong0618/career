<script setup>
import { ref, onMounted, watch } from 'vue'
import { chatHistory } from '../data/mockData.js'

const messages = ref([...chatHistory])
const inputMessage = ref('')
const isTyping = ref(false)

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return

  // 添加用户消息
  const userMsg = {
    id: Date.now(),
    role: 'user',
    content: inputMessage.value,
    timestamp: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  messages.value.push(userMsg)
  inputMessage.value = ''

  // 滚动到底部
  scrollToBottom()

  // 模拟AI回复
  simulateAIResponse()
}

// 模拟AI回复
const simulateAIResponse = () => {
  isTyping.value = true

  // 模拟思考时间
  setTimeout(() => {
    const aiMsg = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '感谢您的提问！我正在为您分析...\n\n根据您的情况，建议您：\n1. 先完善商业计划书\n2. 查看相关政策补贴\n3. 关注潜在风险\n\n您可以点击下方按钮获取更多帮助。',
      timestamp: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      actions: [
        { type: 'button', text: '生成BP', link: '/biz-plan-gen' },
        { type: 'button', text: '政策匹配', link: '/policy-match' },
        { type: 'button', text: '风险预警', link: '/risk-alert' }
      ]
    }
    messages.value.push(aiMsg)
    isTyping.value = false
    scrollToBottom()
  }, 1500)
}

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    const chatContainer = document.querySelector('.chat-messages')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, 100)
}

// 跳转到指定页面
const navigateTo = (path) => {
  window.location.href = path
}

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
})

// 监听消息变化，自动滚动到底部
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<template>
  <div class="ai-tutor">

    
    <!-- 聊天容器 -->
    <div class="chat-container">
      <!-- 聊天消息列表 -->
      <div class="chat-messages">
        <div 
          class="message" 
          :class="msg.role" 
          v-for="msg in messages" 
          :key="msg.id"
        >
          <div class="message-content">
            <div class="message-text">{{ msg.content }}</div>
            <!-- 消息操作按钮 -->
            <div class="message-actions" v-if="msg.actions">
              <button 
                class="action-btn" 
                v-for="action in msg.actions" 
                :key="action.text"
                @click="navigateTo(action.link)"
              >
                {{ action.text }}
              </button>
            </div>
            <div class="message-time">{{ msg.timestamp }}</div>
          </div>
        </div>
        
        <!-- 正在输入指示器 -->
        <div class="message assistant typing" v-if="isTyping">
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 消息输入区域 -->
      <div class="message-input-area">
        <div class="input-container">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="请输入您的问题..."
            @keyup.enter="sendMessage"
            class="message-input"
          />
          <button @click="sendMessage" class="send-btn">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-tutor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 1rem 1rem;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 页面标题 */
.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  text-align: center;
}

/* 聊天容器 */
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

/* 聊天消息列表 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 消息样式 */
.message {
  display: flex;
  margin-bottom: 0.5rem;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 1rem 1.2rem;
  border-radius: var(--radius-lg);
  position: relative;
}

.message.user .message-content {
  background-color: var(--primary-color);
  color: white;
  border-bottom-right-radius: 0;
}

.message.assistant .message-content {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-bottom-left-radius: 0;
}

.message-text {
  line-height: 1.5;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

/* 消息时间 */
.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: right;
  margin-top: 0.3rem;
}

.message.assistant .message-time {
  text-align: left;
}

/* 消息操作按钮 */
.message-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.3rem 0.8rem;
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 1rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 正在输入指示器 */
.typing-indicator {
  display: flex;
  gap: 0.3rem;
  padding: 0.5rem 0;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--text-secondary);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 消息输入区域 */
.message-input-area {
  padding: 1rem;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

.input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s;
}

.message-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.send-btn {
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-btn:hover {
  background-color: #40a9ff;
}

.send-btn:active {
  background-color: #096dd9;
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background-color: var(--bg-secondary);
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: var(--text-tertiary);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .ai-tutor {
    padding: 60px 0.5rem 0.5rem;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .chat-messages {
    padding: 0.5rem;
  }
  
  .message-input-area {
    padding: 0.5rem;
  }
}
</style>
