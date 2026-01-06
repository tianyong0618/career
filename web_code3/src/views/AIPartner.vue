<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { chatHistory } from '../data/mockData.js'

const router = useRouter()

// 聊天历史
const messages = ref([...chatHistory])

// 输入消息
const inputMessage = ref('')

// 文件上传
const fileInput = ref(null)
const isUploading = ref(false)

// 滚动到底部
const chatContainer = ref(null)
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  // 添加用户消息
  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: inputMessage.value,
    timestamp: new Date().toLocaleString()
  }
  messages.value.push(userMessage)
  
  // 清空输入
  inputMessage.value = ''
  scrollToBottom()
  
  // 模拟AI响应
  setTimeout(() => {
    generateAIResponse(userMessage)
  }, 1000)
}

// 生成AI响应
const generateAIResponse = (userMessage) => {
  let aiResponse
  
  // 根据用户消息内容生成不同的响应
  if (userMessage.content.includes('奶茶店') && userMessage.content.includes('补贴')) {
    aiResponse = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '根据您的情况，您可以申请以下补贴：\n1. 北京市朝阳区餐饮企业开业补贴：最高5万元\n2. 大学生创业税收优惠政策：3年免征企业所得税\n\n建议您点击下方的政策匹配按钮，查看详细的申请条件和流程。',
      timestamp: new Date().toLocaleString(),
      actions: [
        { type: 'button', text: '政策匹配', link: '/policy-match' }
      ]
    }
  } else if (userMessage.content.includes('合伙人') && userMessage.content.includes('餐饮经验')) {
    aiResponse = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '为您推荐3位具有丰富餐饮行业经验的合伙人：',
      timestamp: new Date().toLocaleString(),
      actions: [
        { type: 'button', text: '查看合伙人', link: '/resource-hub?type=partners' }
      ]
    }
  } else if (userMessage.content.includes('市场调研报告')) {
    aiResponse = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '正在为您生成详细的市场调研报告...\n\n报告将包含行业趋势、竞品分析、目标客户画像等内容。',
      timestamp: new Date().toLocaleString(),
      actions: [
        { type: 'button', text: '生成BP', link: '/biz-plan-gen' }
      ]
    }
  } else {
    // 默认响应
    aiResponse = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '感谢您的提问！我是您的AI创业导师，随时为您提供创业相关的帮助和建议。\n\n您可以问我关于：\n- 政策补贴和优惠\n- 商业计划书生成\n- 风险预警和应对\n- 资源撮合和对接\n- 市场调研和分析\n\n或者直接点击下方的快捷功能按钮。',
      timestamp: new Date().toLocaleString(),
      actions: [
        { type: 'button', text: '生成BP', link: '/biz-plan-gen' },
        { type: 'button', text: '政策匹配', link: '/policy-match' },
        { type: 'button', text: '风险预警', link: '/risk-alert' },
        { type: 'button', text: '资源撮合', link: '/resource-hub' }
      ]
    }
  }
  
  messages.value.push(aiResponse)
  scrollToBottom()
}

// 处理按钮点击
const handleActionClick = (action) => {
  if (action.link) {
    router.push(action.link)
  }
}

// 打开文件上传
const openFileUpload = () => {
  fileInput.value?.click()
}

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    isUploading.value = true
    
    // 添加文件消息
    const fileMessage = {
      id: Date.now(),
      role: 'user',
      content: `上传了文件：${file.name}`,
      file: file,
      timestamp: new Date().toLocaleString()
    }
    messages.value.push(fileMessage)
    scrollToBottom()
    
    // 模拟文件处理
    setTimeout(() => {
      // 模拟AI解析文件后的响应
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `已成功解析您上传的${file.name}文件。\n\n根据文件内容，我已经更新了您的创业概况。\n\n建议关注：\n1. 食品卫生许可证办理进度\n2. 税务登记证办理\n3. 消防验收申请\n\n您可以点击下方的风险预警按钮，查看相关风险提示。`,
        timestamp: new Date().toLocaleString(),
        actions: [
          { type: 'button', text: '风险预警', link: '/risk-alert' }
        ]
      }
      messages.value.push(aiResponse)
      isUploading.value = false
      scrollToBottom()
      
      // 清空文件输入
      event.target.value = ''
    }, 2000)
  }
}

// 初始化时滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="ai-tutor">
    <!-- 聊天界面 -->
    <div class="chat-container" ref="chatContainer">
      <div 
        class="message" 
        v-for="message in messages" 
        :key="message.id"
        :class="message.role"
      >
        <div class="message-header">
          <span class="role">{{ message.role === 'user' ? '我' : 'AI导师' }}</span>
          <span class="timestamp">{{ message.timestamp }}</span>
        </div>
        <div class="message-content">
          <p>{{ message.content }}</p>
          
          <!-- 文件上传消息 -->
          <div v-if="message.file" class="file-upload">
            <div class="file-info">
              <span class="file-icon">📄</span>
              <span class="file-name">{{ message.file.name }}</span>
              <span class="file-size">({{ (message.file.size / 1024).toFixed(2) }} KB)</span>
            </div>
          </div>
          
          <!-- AI响应的按钮 -->
          <div v-if="message.actions" class="message-actions">
            <button 
              class="action-button" 
              v-for="action in message.actions" 
              :key="action.text"
              @click="handleActionClick(action)"
            >
              {{ action.text }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- 上传中状态 -->
      <div v-if="isUploading" class="message assistant">
        <div class="message-header">
          <span class="role">AI导师</span>
          <span class="timestamp">{{ new Date().toLocaleString() }}</span>
        </div>
        <div class="message-content">
          <div class="loading">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>正在处理您的请求...</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 输入区域 -->
    <div class="input-area">
      <!-- 隐藏的文件输入 -->
      <input 
        type="file" 
        ref="fileInput" 
        style="display: none" 
        @change="handleFileUpload"
        accept=".pdf,.doc,.docx,.txt"
      />
      
      <!-- 紧凑输入栏 -->
      <div class="compact-input">
        <!-- 左侧工具按钮 -->
        <div class="input-tools-left">
          <button class="icon-btn" @click="openFileUpload" :disabled="isUploading">
            📎
          </button>
        </div>
        
        <!-- 输入框 -->
        <div class="input-wrapper">
          <textarea 
            v-model="inputMessage"
            placeholder="请输入您的问题或需求..."
            rows="1"
            @keydown.enter="$event.shiftKey || sendMessage()"
            @input="$event.target.style.height = 'auto'; $event.target.style.height = $event.target.scrollHeight + 'px'"
          ></textarea>
        </div>
        
        <!-- 右侧工具按钮 -->
        <div class="input-tools-right">
          <button 
            class="send-btn" 
            @click="sendMessage()"
            :disabled="!inputMessage.trim() || isUploading"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-tutor {
  max-width: 420px;
  margin: 0 auto;
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 页面标题 */
.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

/* 聊天界面 */
.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}

/* 消息样式 */
.message {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.role {
  font-weight: 500;
}

.message-content {
  padding: 1rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  line-height: 1.5;
}

.message.user .message-content {
  background-color: var(--primary-color);
  color: white;
  border-bottom-right-radius: var(--radius-sm);
}

.message.assistant .message-content {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-bottom-left-radius: var(--radius-sm);
}

/* 文件上传消息 */
.file-upload {
  margin-top: 0.5rem;
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  border: 1px dashed rgba(255, 255, 255, 0.3);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-icon {
  font-size: 1.2rem;
}

/* 消息按钮 */
.message-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.action-button {
  padding: 0.5rem 1rem;
  background-color: var(--bg-primary);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.action-button:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 加载状态 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.loading-dots {
  display: flex;
  gap: 0.3rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 50%;
  animation: loading 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 输入区域 */
.input-area {
  margin-top: auto;
  padding: 1rem 0;
  background-color: var(--bg-secondary);
}

/* 紧凑输入栏样式 */
.compact-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  width: 100%;
}

/* 工具按钮 */
.icon-btn {
  padding: 0.6rem;
  background-color: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.icon-btn:hover:not(:disabled) {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

.icon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 输入框 */
.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent !important;
  padding: 0 !important;
  border: none !important;
  box-shadow: none !important;
  align-items: flex-end !important;
}

.input-wrapper textarea {
  flex: 1;
  border: none;
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  min-height: 24px;
  max-height: 120px;
  overflow-y: auto;
  background-color: transparent;
  padding: 0 !important;
}

.send-btn {
  padding: 0.6rem 1.2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
  min-width: auto;
  width: auto;
  height: auto;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
  background-color: var(--primary-color);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 输入工具区 */
.input-tools-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-tools-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .quick-actions {
    grid-template-columns: 1fr;
  }
  
  .message {
    max-width: 95%;
  }
  
  .input-wrapper {
    padding: 0.6rem;
  }
  
  .send-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .message-actions {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>