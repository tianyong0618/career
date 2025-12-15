<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { mockData } from '../mock/data';

const router = useRouter();

// 聊天消息列表
const messages = ref([
  {
    id: 1,
    sender: 'ai',
    content: '你好！我是你的AI创业导师，有什么可以帮助你的吗？',
    actions: []
  }
]);

// 输入消息
const inputMessage = ref('');
// 发送状态
const isSending = ref(false);

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return;
  
  // 添加用户消息
  const userMessage = {
    id: messages.value.length + 1,
    sender: 'user',
    content: inputMessage.value,
    timestamp: new Date().toLocaleTimeString()
  };
  messages.value.push(userMessage);
  
  // 清空输入框
  const message = inputMessage.value;
  inputMessage.value = '';
  
  // 模拟AI回复
  isSending.value = true;
  setTimeout(() => {
    // 查找匹配的回复
    const matchedResponse = mockData.aiResponses.find(response => 
      message.includes(response.question) || response.question.includes(message)
    );
    
    // AI回复
    const aiResponse = {
      id: messages.value.length + 1,
      sender: 'ai',
      content: matchedResponse ? matchedResponse.answer : '感谢你的提问！我正在学习更多创业知识，稍后为你提供更详细的解答。',
      actions: matchedResponse ? matchedResponse.actions : [],
      timestamp: new Date().toLocaleTimeString()
    };
    
    messages.value.push(aiResponse);
    isSending.value = false;
    
    // 滚动到底部
    scrollToBottom();
  }, 1000);
  
  // 滚动到底部
  scrollToBottom();
};

// 处理AI动作
const handleAction = (action) => {
  if (action.type === 'navigate') {
    router.push(action.target);
  }
};

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, 100);
};

// 监听回车键发送
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="ai-partner-page">
    <h1 class="page-title">AI创业导师</h1>
    
    <div class="chat-container">
      <!-- 聊天消息区域 -->
      <div class="chat-messages">
        <div 
          v-for="message in messages" 
          :key="message.id"
          :class="['message-item', message.sender === 'user' ? 'user-message' : 'ai-message']"
        >
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            
            <!-- AI回复中的动作按钮 -->
            <div v-if="message.sender === 'ai' && message.actions && message.actions.length > 0" class="message-actions">
              <button 
                v-for="(action, index) in message.actions" 
                :key="index"
                class="action-btn"
                @click="handleAction(action)"
              >
                {{ action.target === '/policy-match' ? '查看政策匹配' : 
                   action.target === '/biz-plan-gen' ? '生成商业计划书' : 
                   action.target === '/resource-hub' ? '寻找合伙人' : '查看详情' }}
              </button>
            </div>
            
            <div class="message-time">{{ message.timestamp }}</div>
          </div>
        </div>
        
        <!-- 发送中状态 -->
        <div v-if="isSending" class="sending-message">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      <!-- 消息输入区域 -->
      <div class="chat-input-area">
        <textarea 
          v-model="inputMessage"
          class="chat-input"
          placeholder="请输入你的问题，我会为你解答..."
          rows="1"
          @keypress="handleKeyPress"
        ></textarea>
        <button 
          class="send-btn"
          @click="sendMessage"
          :disabled="isSending || !inputMessage.trim()"
        >
          发送
        </button>
      </div>
    </div>
    
    <!-- 快捷问题建议 -->
    <div class="quick-questions">
      <h3 class="section-title">快捷问题</h3>
      <div class="quick-questions-list">
        <button 
          v-for="(question, index) in ['我想开一家奶茶店，能拿多少补贴？', '我需要一份详细的市场调研报告', '帮我找一位有餐饮经验的合伙人']"
          :key="index"
          class="quick-question-btn"
          @click="inputMessage = question; sendMessage()"
        >
          {{ question }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-partner-page {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.chat-container {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  height: 600px;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  margin-bottom: 12px;
}

.message-item.user-message {
  justify-content: flex-end;
}

.message-item.ai-message {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 16px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.user-message .message-content {
  background-color: var(--primary-blue);
  color: white;
  border-bottom-right-radius: 4px;
}

.ai-message .message-content {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-bottom-left-radius: 4px;
}

.message-text {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
}

.message-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 12px 0;
}

.action-btn {
  padding: 8px 16px;
  background-color: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: var(--transition);
}

.action-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
}

.message-time {
  font-size: 12px;
  opacity: 0.7;
  text-align: right;
  margin-top: 8px;
}

.sending-message {
  display: flex;
  justify-content: flex-start;
  margin: 12px 0;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 16px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  border-bottom-left-radius: 4px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: var(--text-secondary);
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.chat-input-area {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  transition: var(--transition);
}

.chat-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.send-btn {
  padding: 12px 24px;
  background-color: var(--primary-blue);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  align-self: flex-end;
  min-width: 80px;
}

.send-btn:hover:not(:disabled) {
  background-color: #40a9ff;
  box-shadow: var(--shadow-sm);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.quick-questions {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.quick-questions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.quick-question-btn {
  padding: 12px 20px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
  flex: 1;
  min-width: 200px;
  text-align: left;
}

.quick-question-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .chat-container {
    height: 500px;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .chat-messages {
    padding: 16px;
  }
  
  .chat-input-area {
    padding: 16px;
  }
  
  .quick-question-btn {
    min-width: 100%;
  }
}
</style>