<script setup>
import { ref, computed } from 'vue';
import { mockData } from '../mock/data';

// 需求类型
const需求Type = ref('mentors'); // 默认选择导师

// 需求类型选项
const需求TypeOptions = [
  { value: 'partners', label: '合伙人', icon: '🤝' },
  { value: 'mentors', label: '导师', icon: '👨‍🏫' },
  { value: 'suppliers', label: '供应商', icon: '🏭' },
  { value: 'investors', label: '投资人', icon: '💰' },
  { value: 'government', label: '政府采购项目', icon: '🏛️' }
];

// 根据选择的需求类型过滤资源
const filteredResources = computed(() => {
  return mockData.resources[需求Type.value] || [];
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
  <div class="resource-hub-page">
    <h1 class="page-title">资源撮合Marketplace</h1>
    
    <div class="content-container">
      <!-- 需求类型选择 -->
      <div class="selection-section">
        <div class="selection-card">
          <h2 class="section-title">Step 1：选择需求类型</h2>
          
          <div class="需求-type-grid">
            <button 
              v-for="type in 需求TypeOptions" 
              :key="type.value"
              :class="['需求-type-btn', { active: 需求Type === type.value }]"
              @click="需求Type = type.value"
            >
              <span class="type-icon">{{ type.icon }}</span>
              <span class="type-label">{{ type.label }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 资源匹配结果 -->
      <div class="results-section">
        <div class="results-header">
          <h2 class="section-title">Step 2：匹配资源列表</h2>
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
              <div class="resource-info">
                <h3 class="resource-name">{{ resource.name }}</h3>
                <div class="resource-role">{{ resource.expertise || resource.focus }}</div>
              </div>
              <div class="resource-score">
                <span class="score-label">匹配度</span>
                <span class="score-value">{{ resource.matchScore }}%</span>
              </div>
            </div>
            
            <div class="resource-body">
              <div class="resource-details">
                <div class="detail-item">
                  <span class="detail-label">经验：</span>
                  <span class="detail-value">{{ resource.experience || resource.investmentRange }}</span>
                </div>
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
.resource-hub-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.content-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.selection-card,
.resource-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  transition: var(--transition);
}

.selection-card:hover,
.resource-card:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.需求-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.需求-type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: var(--transition);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.需求-type-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.需求-type-btn.active {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: var(--primary-blue);
  color: var(--primary-blue);
}

.type-icon {
  font-size: 24px;
}

.type-label {
  margin-top: 4px;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.results-stats {
  font-size: 14px;
  color: var(--text-secondary);
}

.resources-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.resource-card {
  display: flex;
  flex-direction: column;
  border-left: 4px solid var(--primary-blue);
}

.resource-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
}

.resource-info {
  flex: 1;
}

.resource-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.resource-role {
  font-size: 14px;
  color: var(--primary-blue);
  font-weight: 500;
}

.resource-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: rgba(82, 196, 26, 0.1);
  padding: 12px;
  border-radius: var(--border-radius);
  min-width: 80px;
}

.score-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.score-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--success-green);
}

.resource-body {
  flex: 1;
  margin-bottom: 20px;
}

.resource-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
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

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background-color: var(--primary-blue);
  color: white;
}

.btn-primary:hover {
  background-color: #40a9ff;
  box-shadow: var(--shadow-sm);
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--text-tertiary);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.empty-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .selection-card,
  .resource-card {
    padding: 16px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .需求类型-grid {
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
</style>