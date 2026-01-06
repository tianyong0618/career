<script setup>
import { ref, computed } from 'vue';
import { resources, resourceTypes } from '../data/mockData';

// 需求类型
const resourceType = ref('mentors'); // 默认选择导师

// 需求类型选项
const resourceTypeOptions = [
  { value: 'partners', label: '合伙人', icon: '🤝' },
  { value: 'mentors', label: '导师', icon: '👨‍🏫' },
  { value: 'suppliers', label: '供应商', icon: '🏭' },
  { value: 'investors', label: '投资人', icon: '💰' },
  { value: 'government', label: '政府采购项目', icon: '🏛️' }
];

// 根据选择的需求类型过滤资源
const filteredResources = computed(() => {
  return resources[resourceType.value] || [];
});

// 联系资源
const contactResource = (resourceId) => {
  const resource = filteredResources.value.find(r => r.id === resourceId);
  if (resource) {
    alert(`已为您建立与 "${resource.name}" 的联系渠道！（模拟功能）`);
  }
};
</script>

<template>
  <div class="resource-hub">
    <div class="content-container">
      <!-- 需求类型选择 -->
      <div class="card">
        <h3 class="section-title">Step 1：选择需求类型</h3>
        
        <div class="resource-type-grid">
          <button 
            v-for="type in resourceTypeOptions" 
            :key="type.value"
            :class="['resource-type-btn', { active: resourceType === type.value }]"
            @click="resourceType = type.value"
          >
            <span class="type-icon">{{ type.icon }}</span>
            <span class="type-label">{{ type.label }}</span>
          </button>
        </div>
      </div>
      
      <!-- 资源匹配结果 -->
      <div class="card">
        <div class="results-header">
          <h3 class="section-title">Step 2：匹配资源列表</h3>
          <div class="results-stats">
            <span class="stats-text">共 {{ filteredResources.length }} 个匹配资源</span>
          </div>
        </div>
        
        <div class="resources-list">
          <div 
            v-for="resource in filteredResources" 
            :key="resource.id" 
            class="resource-card"
          >
            <div class="resource-header">
              <!-- 新增头像 -->
              <div class="resource-avatar">
                <img :src="resource.avatar" :alt="resource.name" class="avatar-img" />
              </div>
              
              <div class="resource-info">
                <h3 class="resource-name">{{ resource.name }}</h3>
                <!-- 职位信息 -->
                <div class="resource-role">{{ resource.title || resource.skill || resource.focus }}</div>
                <!-- 所在地信息 -->
                <div class="resource-location" v-if="resource.location">
                  <span class="location-icon">📍</span>
                  <span class="location-text">{{ resource.location }}</span>
                </div>
              </div>
              <div class="resource-score">
                <span class="score-label">匹配度</span>
                <span class="score-value">{{ resource.matchScore || '85' }}%</span>
              </div>
            </div>
            
            <div class="resource-body">
              <div class="resource-details">
                <div class="detail-item">
                  <span class="detail-label">经验：</span>
                  <span class="detail-value">{{ resource.experience || resource.investmentRange }}</span>
                </div>
                
                <!-- 根据资源类型显示不同的额外信息 -->
                <!-- 导师特有信息 -->
                <div class="detail-item" v-if="resource.rating">
                  <span class="detail-label">评分：</span>
                  <span class="detail-value">{{ resource.rating }}⭐</span>
                </div>
                
                <!-- 投资人特有信息 -->
                <div class="detail-item" v-if="resource.focus">
                  <span class="detail-label">专注领域：</span>
                  <span class="detail-value">{{ resource.focus }}</span>
                </div>
                
                <div class="detail-item" v-if="resource.investmentStage">
                  <span class="detail-label">投资阶段：</span>
                  <span class="detail-value">{{ resource.investmentStage }}</span>
                </div>
                
                <div class="detail-item" v-if="resource.investmentAmount">
                  <span class="detail-label">投资金额：</span>
                  <span class="detail-value">{{ resource.investmentAmount }}</span>
                </div>
              </div>
              
              <!-- 标签区域 -->
              <div class="resource-tags" v-if="resource.tags && resource.tags.length > 0">
                <span 
                  v-for="(tag, index) in resource.tags" 
                  :key="index" 
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <div class="resource-footer">
              <button 
                type="button" 
                class="btn btn-primary" 
                @click="contactResource(resource.id)"
              >
                一键联系
              </button>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-if="filteredResources.length === 0" class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3 class="empty-title">暂无匹配资源</h3>
            <p class="empty-text">请尝试调整需求类型或稍后再试</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-hub {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1.5rem;
}

.content-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* 卡片样式 */
.card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem;
}

/* 需求类型选择 */
.resource-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.resource-type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.resource-type-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.resource-type-btn.active {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.type-icon {
  font-size: 1.5rem;
}

.type-label {
  margin-top: 0.25rem;
}

/* 结果头部 */
.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.results-stats {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* 资源列表 */
.resources-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.resource-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--primary-color);
  transition: var(--transition);
}

.resource-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.resource-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
}

/* 头像样式 */
.resource-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.resource-info {
  flex: 1;
  min-width: 0;
}

.resource-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-role {
  font-size: 0.875rem;
  color: var(--primary-color);
  font-weight: 500;
  margin: 0 0 0.25rem;
}

/* 所在地样式 */
.resource-location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.location-icon {
  font-size: 0.875rem;
}

.location-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background-color: rgba(82, 196, 26, 0.1);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  min-width: 80px;
}

.score-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.score-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--success-color);
}

.resource-body {
  flex: 1;
  margin-bottom: 1.25rem;
}

.resource-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.detail-label {
  color: var(--text-secondary);
}

.detail-value {
  color: var(--text-primary);
  font-weight: 500;
}

.resource-footer {
  display: flex;
  justify-content: flex-end;
}

/* 按钮样式 */
.btn {
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* 标签样式 */
.resource-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-color);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #40a9ff;
  box-shadow: var(--shadow-sm);
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3.75rem 1.25rem;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-tertiary);
}

.empty-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.empty-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .resource-hub {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .card {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 1rem;
  }
  
  .resource-type-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .resources-list {
    grid-template-columns: 1fr;
  }
  
  .resource-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .resource-score {
    align-self: flex-end;
  }
}

@media (max-width: 1024px) {
  .resources-list {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>