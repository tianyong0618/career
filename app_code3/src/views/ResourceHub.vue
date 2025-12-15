<script setup>
import { ref } from 'vue'
import { resources, resourceTypes } from '../data/mockData.js'

// 需求类型选择
const selectedType = ref('partners')

// 当前匹配的资源列表
const matchedResources = ref(resources.partners)

// 选中的资源详情
const selectedResource = ref(null)
const showResourceDetail = ref(false)

// 切换资源类型
const switchResourceType = (type) => {
  selectedType.value = type
  matchedResources.value = resources[type] || []
}

// 查看资源详情
const viewResourceDetail = (resource) => {
  selectedResource.value = resource
  showResourceDetail.value = true
}

// 关闭资源详情
const closeResourceDetail = () => {
  showResourceDetail.value = false
  selectedResource.value = null
}

// 模拟一键联系
const contactResource = () => {
  // 模拟联系功能
  alert(`已发送联系请求给${selectedResource.value.name}！（模拟功能）`)
  closeResourceDetail()
}
</script>

<template>
  <div class="resource-hub">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1>资源撮合Marketplace</h1>
    </header>
    
    <!-- 需求类型选择 -->
    <div class="card fade-in">
      <h2>选择需求类型</h2>
      <div class="type-tabs">
        <button 
          class="tab-btn" 
          v-for="type in resourceTypes" 
          :key="type.value"
          :class="{ active: selectedType === type.value }"
          @click="switchResourceType(type.value)"
        >
          {{ type.label }}
        </button>
      </div>
    </div>
    
    <!-- 资源匹配结果 -->
    <div class="card fade-in">
      <h2>匹配结果</h2>
      <div v-if="matchedResources.length === 0" class="no-resources">
        <div class="no-resources-icon">🔍</div>
        <h3>暂无匹配资源</h3>
        <p>请尝试选择其他需求类型或调整筛选条件</p>
      </div>
      <div v-else class="resources-list">
        <div 
          class="resource-card" 
          v-for="resource in matchedResources" 
          :key="resource.id"
          @click="viewResourceDetail(resource)"
        >
          <div class="resource-header">
            <div class="resource-avatar">
              <img :src="resource.avatar" alt="资源方头像" />
            </div>
            <div class="resource-info">
              <h4 class="resource-name">{{ resource.name }}</h4>
              <p class="resource-title">{{ resource.title || resource.skill }}</p>
              <div class="resource-rating" v-if="resource.rating">
                <span class="rating-stars">⭐</span>
                <span class="rating-value">{{ resource.rating }}</span>
              </div>
            </div>
          </div>
          <p class="resource-experience">{{ resource.experience }}</p>
          <div class="resource-footer">
            <div class="resource-location" v-if="resource.location">
              📍 {{ resource.location }}
            </div>
            <div class="resource-focus" v-if="resource.focus">
              专注领域：{{ resource.focus }}
            </div>
            <div class="resource-investment" v-if="resource.investmentStage">
              投资阶段：{{ resource.investmentStage }}
            </div>
          </div>
          <div class="resource-action">
            <button type="button" class="primary" @click.stop="viewResourceDetail(resource)">
              查看详情 →
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 资源详情模态框 -->
    <div v-if="showResourceDetail && selectedResource" class="modal-overlay" @click="closeResourceDetail">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedResource.name }}</h2>
          <button type="button" class="close-btn" @click="closeResourceDetail">
            ✕
          </button>
        </div>
        
        <div class="modal-body">
          <div class="resource-detail-header">
            <div class="resource-detail-avatar">
              <img :src="selectedResource.avatar" alt="资源方头像" />
            </div>
            <div class="resource-detail-info">
              <h3>{{ selectedResource.name }}</h3>
              <p class="resource-detail-title">{{ selectedResource.title || selectedResource.skill }}</p>
              <div class="resource-detail-rating" v-if="selectedResource.rating">
                <span class="rating-stars">⭐</span>
                <span class="rating-value">{{ selectedResource.rating }}</span>
              </div>
            </div>
          </div>
          
          <div class="resource-detail-section">
            <h3>详细介绍</h3>
            <p>{{ selectedResource.experience }}</p>
          </div>
          
          <div class="resource-detail-section" v-if="selectedResource.location || selectedResource.focus">
            <h3>基本信息</h3>
            <div class="info-grid">
              <div class="info-item" v-if="selectedResource.location">
                <span class="info-label">所在地：</span>
                <span class="info-value">{{ selectedResource.location }}</span>
              </div>
              <div class="info-item" v-if="selectedResource.focus">
                <span class="info-label">专注领域：</span>
                <span class="info-value">{{ selectedResource.focus }}</span>
              </div>
              <div class="info-item" v-if="selectedResource.investmentStage">
                <span class="info-label">投资阶段：</span>
                <span class="info-value">{{ selectedResource.investmentStage }}</span>
              </div>
              <div class="info-item" v-if="selectedResource.investmentAmount">
                <span class="info-label">投资金额：</span>
                <span class="info-value">{{ selectedResource.investmentAmount }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="secondary" @click="closeResourceDetail">
            关闭
          </button>
          <button type="button" class="success" @click="contactResource">
            📞 一键联系
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-hub {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 页面标题 */
.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

/* 需求类型选择 */
.type-tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin: 1.5rem 0;
}

.type-tabs::-webkit-scrollbar {
  height: 4px;
}

.type-tabs::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 2px;
}

.type-tabs::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

.tab-btn {
  flex-shrink: 0;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: var(--radius-lg);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.tab-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* 资源匹配结果 */
.no-resources {
  text-align: center;
  padding: 2rem;
  background-color: rgba(24, 144, 255, 0.05);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(24, 144, 255, 0.2);
}

.no-resources-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-resources h3 {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.no-resources p {
  color: var(--text-tertiary);
  font-size: 0.9rem;
}

.resources-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.resource-card {
  background-color: var(--bg-secondary);
  padding: 1.2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.resource-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 0.8rem;
}

.resource-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--primary-color);
}

.resource-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-info {
  flex: 1;
}

.resource-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.resource-title {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.resource-rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: var(--warning-color);
}

.resource-experience {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.resource-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.resource-action {
  text-align: right;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: all 0.3s;
}

.close-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}

.resource-detail-header {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.resource-detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
}

.resource-detail-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-detail-info h3 {
  margin: 0 0 0.3rem 0;
  font-size: 1.3rem;
}

.resource-detail-title {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.resource-detail-rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.95rem;
  color: var(--warning-color);
}

.resource-detail-section {
  margin-bottom: 2rem;
}

.resource-detail-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.resource-detail-section p {
  line-height: 1.6;
  font-size: 0.95rem;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.info-label {
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 80px;
}

.info-value {
  color: var(--text-primary);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .type-tabs {
    gap: 0.3rem;
  }
  
  .tab-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .resource-header {
    gap: 0.8rem;
  }
  
  .resource-avatar {
    width: 50px;
    height: 50px;
  }
  
  .resource-footer {
    gap: 0.5rem;
    font-size: 0.8rem;
  }
  
  .resource-detail-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .modal-content {
    margin: 0.5rem;
    max-height: 90vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer button {
    width: 100%;
  }
}
</style>