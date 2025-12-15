<template>
  <div class="ai-chat card">
    <div class="card-header">
      <h3>AI职业合伙人</h3>
      <span class="chat-status">在线</span>
    </div>
    <div class="card-content">
      <!-- 对话历史区域 -->
      <div class="chat-history" ref="chatHistoryRef">
        <div 
          class="message" 
          :class="{ 'user-message': msg.role === 'user', 'ai-message': msg.role === 'ai' }"
          v-for="msg in chatHistory" 
          :key="msg.id"
        >
          <div class="message-avatar">
            <span v-if="msg.role === 'user'">👤</span>
            <span v-else>🤖</span>
          </div>
          <div class="message-content">
            <div class="message-text">{{ msg.content }}</div>
            <div class="message-actions" v-if="msg.actions && msg.actions.length > 0">
              <button 
                class="action-btn" 
                v-for="(action, index) in msg.actions" 
                :key="index"
                @click="handleAction(action)"
              >
                {{ action.text }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 消息输入区域 -->
      <div class="message-input-container">
        <div class="input-wrapper">
          <input 
            type="text" 
            class="message-input" 
            placeholder="输入你的问题或需求..."
            v-model="messageInput"
            @keyup.enter="sendMessage"
          />
          <div class="input-actions">
            <!-- 文件上传按钮 -->
            <label class="input-action-btn file-upload-btn">
              📎
              <input 
                type="file" 
                class="file-input" 
                @change="handleFileUpload"
                accept=".pdf,.doc,.docx"
              />
            </label>
            <!-- 语音输入按钮 -->
            <button class="input-action-btn" @click="toggleVoiceInput" :class="{ 'recording': isRecording }">
              🎤
            </button>
          </div>
        </div>
        <button class="send-btn" @click="sendMessage">发送</button>
      </div>
      
      <!-- 文件上传提示 -->
      <div class="file-upload-tip" v-if="showFileUploadTip">
        <span>支持上传简历PDF、Word文档，AI将帮你解析并更新职业镜像</span>
      </div>
      
      <!-- 快捷功能按钮 -->
      <div class="quick-functions">
        <button class="function-btn" @click="sendQuickMessage('我想转行做数据分析师，需要准备什么？')">
          🔍 职业规划
        </button>
        <button class="function-btn" @click="sendQuickMessage('帮我找一些数据分析的实战项目')">
          📋 找实战项目
        </button>
        <button class="function-btn" @click="sendQuickMessage('我刚做完飞书项目复盘，帮我提取成果')">
          📊 提取成果
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { chatHistory } from '../assets/mock/data'
import { useRouter } from 'vue-router'

const router = useRouter()
const chatHistoryRef = ref(null)
const messageInput = ref('')
const chatMessages = ref([...chatHistory])
// 文件上传相关状态
const isRecording = ref(false)
const showFileUploadTip = ref(true)
const uploadingFile = ref(null)

// 滚动到底部
const scrollToBottom = () => {
  if (chatHistoryRef.value) {
    chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight
  }
}

// 监听消息变化，自动滚动到底部
watch(chatMessages, () => {
  setTimeout(scrollToBottom, 100)
}, { deep: true })

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
  // 3秒后隐藏文件上传提示
  setTimeout(() => {
    showFileUploadTip.value = false
  }, 3000)
})

// 发送消息
const sendMessage = () => {
  if (messageInput.value.trim()) {
    // 添加用户消息
    chatMessages.value.push({
      id: Date.now(),
      role: 'user',
      content: messageInput.value.trim()
    })
    
    // 清空输入框
    messageInput.value = ''
    
    // 模拟AI回复和Function Calling
    setTimeout(() => {
      handleAIFunctionCall(messageInput.value.trim())
    }, 1000)
  }
}

// 处理AI Function Calling
const handleAIFunctionCall = (userMessage) => {
  // 模拟不同类型的请求处理
  const lowerMessage = userMessage.toLowerCase()
  
  // 1. 职业规划请求
  if (lowerMessage.includes('转行') || lowerMessage.includes('职业规划') || lowerMessage.includes('需要准备')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: '我已经为你生成了个性化的职业规划路径！',
      actions: [
        { text: '查看职业路径', link: '/path-sandbox' },
        { text: '获取学习资源', link: '/growth-center' }
      ]
    })
  }
  // 2. 找实战项目请求
  else if (lowerMessage.includes('实战项目') || lowerMessage.includes('项目经验') || lowerMessage.includes('找项目')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: '我为你找到了几个高匹配度的实战项目！',
      actions: [
        { text: '查看推荐项目', link: '/growth-center' },
        { text: '生成项目计划', link: '/growth-center' }
      ]
    })
  }
  // 3. 提取成果请求
  else if (lowerMessage.includes('复盘') || lowerMessage.includes('提取成果') || lowerMessage.includes('项目总结')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: '已成功提取你的项目成果！',
      actions: [
        { text: '更新职业镜像', link: '/' },
        { text: '生成作品集', link: '/' }
      ]
    })
  }
  // 4. 简历相关请求
  else if (lowerMessage.includes('简历') || lowerMessage.includes('求职')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: '我可以帮你优化简历和推荐工作机会！',
      actions: [
        { text: '上传简历', link: '#' },
        { text: '查看求职推荐', link: '/growth-center' }
      ]
    })
  }
  // 5. 默认回复
  else {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: '感谢你的提问！我正在处理你的请求，请稍候...',
      actions: [
        { text: '查看更多', link: '#' }
      ]
    })
  }
}

// 发送快捷消息
const sendQuickMessage = (message) => {
  messageInput.value = message
  sendMessage()
}

// 处理AI消息中的操作
const handleAction = (action) => {
  if (action.link.startsWith('/')) {
    router.push(action.link)
  } else {
    // 处理其他类型的链接
    console.log('处理其他类型的链接:', action.link)
  }
}

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadingFile.value = file
    
    // 添加文件上传消息
    chatMessages.value.push({
      id: Date.now(),
      role: 'user',
      content: `上传了文件: ${file.name}`,
      type: 'file'
    })
    
    // 清空文件输入
    event.target.value = ''
    
    // 模拟文件解析过程
    setTimeout(() => {
      // 模拟解析结果
      chatMessages.value.push({
        id: Date.now() + 1,
        role: 'ai',
        content: `已成功解析你的简历！\n\n解析结果：\n1. 识别出你擅长Python、SQL等技能\n2. 发现你有数据分析项目经验\n3. 建议强化\"数据分析\"关键词\n\n已自动更新你的职业镜像！`,
        actions: [
          { text: '查看我的职业镜像', link: '/' }
        ]
      })
      uploadingFile.value = null
    }, 2000)
  }
}

// 语音输入功能
const toggleVoiceInput = () => {
  isRecording.value = !isRecording.value
  if (isRecording.value) {
    // 模拟语音录制开始
    console.log('开始语音录制...')
    // 3秒后自动停止录制
    setTimeout(() => {
      isRecording.value = false
      // 模拟语音识别结果
      messageInput.value = '我想转行做数据分析师，需要准备什么？'
    }, 3000)
  }
}
</script>

<style scoped>
.ai-chat {
  margin-bottom: var(--spacing-lg);
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

.chat-status {
  font-size: var(--font-size-xs);
  color: var(--success-color);
  font-weight: 500;
}

.card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  margin-bottom: var(--spacing-lg);
  padding-right: var(--spacing-sm);
}

/* 自定义滚动条 */
.chat-history::-webkit-scrollbar {
  width: 6px;
}

.chat-history::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.chat-history::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.chat-history::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}

.message {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  align-items: flex-start;
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  font-size: var(--font-size-xl);
  min-width: 32px;
  text-align: center;
}

.message-content {
  max-width: 70%;
}

.user-message .message-content {
  text-align: right;
}

.message-text {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.user-message .message-text {
  background-color: var(--primary-color);
  color: white;
}

.message-actions {
  display: flex;
  gap: var(--spacing-xs);
  justify-content: flex-start;
}

.user-message .message-actions {
  justify-content: flex-end;
}

.action-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transform: translateY(-1px);
}

.message-input-container {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
}

.message-input {
  flex: 1;
  border: none;
  background: none;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  outline: none;
}

.message-input::placeholder {
  color: var(--text-tertiary);
}

.input-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.input-action-btn {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.input-action-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

/* 文件上传按钮样式 */
.file-upload-btn {
  cursor: pointer;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* 语音录制按钮样式 */
.input-action-btn.recording {
  color: var(--error-color);
  animation: pulse 1s infinite;
}

/* 文件上传提示样式 */
.file-upload-tip {
  text-align: center;
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: rgba(24, 144, 255, 0.1);
  border: 1px solid rgba(24, 144, 255, 0.2);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--primary-color);
  animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.send-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.send-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.quick-functions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

.function-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.function-btn:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ai-chat {
    height: calc(100vh - 250px);
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .quick-functions {
    flex-wrap: wrap;
  }
}
</style>