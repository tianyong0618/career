<script setup>
// 接收创业信息作为props
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="startup-card">
    <div class="card-header">
      <div class="avatar-container">
        <img :src="profile.avatar" :alt="profile.name" class="avatar" />
      </div>
      <div class="info-container">
        <h2 class="name">{{ profile.name }}</h2>
        <div class="tags-container">
          <span v-for="(tag, index) in profile.tags" :key="index" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <div class="milestones-section">
        <h3 class="section-title">当前里程碑</h3>
        <div class="milestones-list">
          <div v-for="(milestone, index) in profile.milestones" :key="index" class="milestone-item">
            <span class="milestone-icon">✅</span>
            <span class="milestone-text">{{ milestone }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.startup-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  margin-bottom: 24px;
  transition: var(--transition);
}

.startup-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.info-container {
  flex: 1;
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-block;
  padding: 6px 12px;
  background-color: rgba(24, 144, 255, 0.1);
  color: var(--primary-color);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.card-body {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.milestones-section {
  margin-bottom: 20px;
}

.milestones-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-primary);
}

.milestone-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.milestone-text {
  flex: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .tags-container {
    justify-content: center;
  }
}
</style>