<template>
  <div class="knowledge-graph card">
    <div class="card-header">
      <h3>职业知识图谱</h3>
    </div>
    <div class="card-content">
      <!-- 知识图谱展示区域 -->
      <div class="graph-container" ref="graphContainer">
        <!-- 可拖拽节点 -->
        <div 
          v-for="(node, index) in graphNodes" 
          :key="node.id"
          class="graph-node"
          draggable="true"
          @dragstart="onDragStart(node)"
          :style="{
            left: `${node.x}%`,
            top: `${node.y}%`
          }"
        >
          <div class="node-content">
            <div class="node-title">{{ node.title }}</div>
            <div class="node-type">{{ node.type }}</div>
          </div>
        </div>
      </div>
      <!-- 节点说明 -->
      <div class="graph-info">
        <div class="info-item">
          <span class="info-icon">💡</span>
          <span class="info-text">拖拽节点到推荐路径中，可调整职业发展路径</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 接收目标职业作为prop
const props = defineProps({
  targetCareer: {
    type: String,
    default: '数据分析师'
  }
})

// 知识图谱容器引用
const graphContainer = ref(null)

// 定义不同职业的知识图谱节点
const knowledgeGraphData = {
  '数据分析师': [
    { id: 'kg1', title: 'SQL', type: '硬技能', x: 20, y: 30 },
    { id: 'kg2', title: 'Python', type: '硬技能', x: 50, y: 15 },
    { id: 'kg3', title: 'Tableau', type: '硬技能', x: 80, y: 30 },
    { id: 'kg4', title: '统计学', type: '基础知识', x: 35, y: 60 },
    { id: 'kg5', title: '机器学习', type: '进阶技能', x: 65, y: 60 },
    { id: 'kg6', title: '业务分析', type: '软技能', x: 50, y: 85 }
  ],
  '产品经理': [
    { id: 'kg7', title: 'Axure', type: '工具', x: 20, y: 30 },
    { id: 'kg8', title: '用户调研', type: '方法', x: 50, y: 15 },
    { id: 'kg9', title: '需求管理', type: '技能', x: 80, y: 30 },
    { id: 'kg10', title: '原型设计', type: '技能', x: 35, y: 60 },
    { id: 'kg11', title: '数据分析', type: '技能', x: 65, y: 60 },
    { id: 'kg12', title: '项目管理', type: '软技能', x: 50, y: 85 }
  ],
  'AI训练师': [
    { id: 'kg13', title: 'Python', type: '硬技能', x: 20, y: 30 },
    { id: 'kg14', title: '机器学习', type: '硬技能', x: 50, y: 15 },
    { id: 'kg15', title: '深度学习', type: '进阶技能', x: 80, y: 30 },
    { id: 'kg16', title: '数据标注', type: '技能', x: 35, y: 60 },
    { id: 'kg17', title: '模型评估', type: '方法', x: 65, y: 60 },
    { id: 'kg18', title: '问题解决', type: '软技能', x: 50, y: 85 }
  ],
  '跨境电商运营': [
    { id: 'kg19', title: '亚马逊运营', type: '平台', x: 20, y: 30 },
    { id: 'kg20', title: '选品策略', type: '技能', x: 50, y: 15 },
    { id: 'kg21', title: '物流管理', type: '技能', x: 80, y: 30 },
    { id: 'kg22', title: 'SEO优化', type: '技能', x: 35, y: 60 },
    { id: 'kg23', title: '数据分析', type: '技能', x: 65, y: 60 },
    { id: 'kg24', title: '供应链管理', type: '管理', x: 50, y: 85 }
  ]
}

// 根据目标职业获取对应的知识图谱节点
const graphNodes = computed(() => {
  return knowledgeGraphData[props.targetCareer] || knowledgeGraphData['数据分析师']
})

// 拖拽开始事件
const onDragStart = (node) => {
  // 存储拖拽的节点数据
  event.dataTransfer.setData('application/json', JSON.stringify(node))
  event.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.knowledge-graph {
  margin-bottom: var(--spacing-lg);
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
}

.card-content {
  position: relative;
}

.graph-container {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

/* 知识图谱节点样式 */
.graph-node {
  position: absolute;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  cursor: move;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.graph-node:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  z-index: 20;
}

.node-content {
  text-align: center;
}

.node-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.node-type {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

/* 节点说明 */
.graph-info {
  display: flex;
  justify-content: center;
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.info-icon {
  font-size: var(--font-size-md);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .graph-container {
    height: 250px;
  }
  
  .graph-node {
    width: 100px;
  }
}
</style>