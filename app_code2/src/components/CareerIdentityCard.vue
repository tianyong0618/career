<template>
  <div class="career-identity-card card">
    <div class="card-header">
      <h3>数字职业孪生</h3>
      <button 
        class="edit-btn" 
        @click="toggleEditMode"
        :aria-label="isEditing ? '保存' : '编辑'"
      >
        {{ isEditing ? '💾 保存' : '✏️ 编辑' }}
      </button>
      <button 
        v-if="isEditing" 
        class="cancel-btn" 
        @click="cancelEdit"
        aria-label="取消"
      >
        ❌ 取消
      </button>
    </div>
    <div class="card-content">
      <div class="identity-main">
        <img :src="user.avatar" alt="用户头像" class="avatar" />
        <div class="identity-info">
          <!-- 编辑模式和显示模式切换 -->
          <div v-if="isEditing" class="edit-form">
            <input 
              type="text" 
              v-model="editingUser.name" 
              class="edit-input" 
              placeholder="输入姓名"
            />
            <div class="tags-edit">
              <div class="tag-input-container">
                <input 
                  type="text" 
                  v-model="newTag" 
                  class="tag-input" 
                  placeholder="添加标签"
                  @keyup.enter="addTag"
                />
                <button class="add-tag-btn" @click="addTag">+</button>
              </div>
              <div class="tags">
                <span 
                  class="tag" 
                  v-for="(tag, index) in editingUser.tags" 
                  :key="tag"
                >
                  {{ tag }}
                  <button class="remove-tag-btn" @click="removeTag(index)">×</button>
                </span>
              </div>
            </div>
          </div>
          <div v-else>
            <h2 class="name">{{ user.name }}</h2>
            <div class="tags">
              <span class="tag" v-for="tag in user.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { userInfo, careerTendency, skillCloud, growthProgress } from '../assets/mock/data'
import ProgressBar from './ProgressBar.vue'

const user = userInfo
const isEditing = ref(false)
const newTag = ref('')

// 编辑中的用户数据
const editingUser = reactive({
  name: user.name,
  tags: [...user.tags]
})

// 切换编辑模式
const toggleEditMode = () => {
  if (isEditing.value) {
    // 保存编辑
    saveEdit()
  } else {
    // 进入编辑模式
    isEditing.value = true
    // 重置编辑数据
    editingUser.name = user.name
    editingUser.tags = [...user.tags]
  }
}

// 保存编辑
const saveEdit = () => {
  // 这里可以添加数据验证
  if (editingUser.name.trim()) {
    // 更新用户数据
    user.name = editingUser.name.trim()
    user.tags = editingUser.tags.filter(tag => tag.trim())
    // 退出编辑模式
    isEditing.value = false
  }
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
  // 清空输入
  newTag.value = ''
}

// 添加标签
const addTag = () => {
  if (newTag.value.trim() && !editingUser.tags.includes(newTag.value.trim())) {
    editingUser.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

// 删除标签
const removeTag = (index) => {
  editingUser.tags.splice(index, 1)
}
</script>

<style scoped>
.career-identity-card {
  margin-bottom: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-sm);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  flex: 1;
}

.edit-btn {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.edit-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.cancel-btn {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.cancel-btn:hover {
  background-color: rgba(245, 34, 45, 0.1);
  color: var(--error-color);
  border-color: rgba(245, 34, 45, 0.2);
  transform: translateY(-1px);
}

/* 编辑表单样式 */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.edit-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: all var(--transition-fast);
}

.edit-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  transform: translateY(-1px);
}

.tags-edit {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.tag-input-container {
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
}

.tag-input {
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: all var(--transition-fast);
}

.tag-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  transform: translateY(-1px);
}

.add-tag-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-lg);
  transition: all var(--transition-fast);
}

.add-tag-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--bg-primary);
  border-radius: var(--radius-full, 9999px);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-right: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
  position: relative;
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.tag:hover {
  background-color: var(--bg-secondary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.remove-tag-btn {
  background: none;
  border: none;
  color: var(--text-tertiary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.remove-tag-btn:hover {
  background-color: rgba(245, 34, 45, 0.1);
  color: var(--error-color);
}

.identity-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.identity-info {
  flex: 1;
}

.name {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-2xl);
  color: var(--text-primary);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}



/* 响应式设计 */
@media (max-width: 768px) {
  .career-identity-card {
    padding: var(--spacing-lg);
  }
  
  .identity-main {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-md);
  }
  
  .identity-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>