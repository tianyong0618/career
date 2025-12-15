<template>
  <div class="path-generator card">
    <div class="card-header">
      <h3>路径生成器</h3>
    </div>
    <div class="card-content">
      <!-- 目标设定区域 - 始终显示 -->
      <div class="goal-setting-section">
        <h5 class="section-title">设定目标</h5>
        <div class="goal-input-container">
          <input 
            type="text" 
            class="goal-input" 
            placeholder="我想在5年内成为______"
            v-model="careerGoal"
          />
          <button class="generate-btn" @click="generatePaths">生成路径</button>
        </div>
        <div class="goal-suggestions">
          <span class="suggestion-tag" v-for="suggestion in goalSuggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
            {{ suggestion }}
          </span>
        </div>
      </div>
      

    </div>
  </div>
  
  <!-- 路径展示区域 - 先显示知识图谱，再显示推荐路径 -->
  <div v-if="showPaths" class="paths-display-section">
    <div class="container">
      <!-- 职业知识图谱 - 显示在推荐路径之上 -->
      <div class="knowledge-graph-container">
        <KnowledgeGraph :target-career="currentTargetCareer" />
      </div>
      
      <h5 class="section-title">推荐路径</h5>
      <div class="paths-container">
        <div 
          class="path-card" 
          v-for="(path, index) in pathsData" 
          :key="path.id"
        >
          <div class="path-header">
            <h6 class="path-title">{{ path.title }}</h6>
            <div class="path-success-rate">
              <span class="rate-label">成功率</span>
              <span class="rate-value" :class="{ 'high-success': path.successRate > 80 }">
                {{ path.successRate }}%
              </span>
              <span class="success-message" v-if="path.successRate > 80">你很有机会！</span>
            </div>
          </div>
          
          <!-- 可拖拽接收区域 -->
          <div 
            class="path-timeline"
            @dragover.prevent
            @drop="onDrop($event, path)"
          >
            <draggable 
              v-model="path.timeline" 
              item-key="year"
              handle=".timeline-item"
              @end="onDragEnd(path.id, path.timeline)"
              :animation="200"
              ghost-class="ghost"
            >
              <template #item="{ element }">
                <div class="timeline-item">
                  <div class="timeline-year">{{ element.year }}年</div>
                  <div class="timeline-content">{{ element.content }}</div>
                  <div class="drag-handle">☰</div>
                  <button class="remove-node-btn" @click="removeNode(path, element)">×</button>
                </div>
              </template>
            </draggable>
            <!-- 拖拽提示 -->
            <div class="drop-hint" v-if="path.timeline.length === 0">
              拖拽知识图谱中的节点到此处，构建你的职业发展路径
            </div>
          </div>
          
          <div class="path-milestones">
            <h7 class="milestones-title">关键里程碑</h7>
            <div class="milestones-list">
              <div class="milestone" v-for="(milestone, i) in path.milestones" :key="i">
                <span class="milestone-icon">📌</span>
                <span class="milestone-text">{{ milestone.text }}</span>
              </div>
            </div>
          </div>
          
          <div class="path-risk">
            <div class="risk-icon">⚠️</div>
            <div class="risk-text">{{ path.risk }}</div>
          </div>
          
          <div class="path-actions">
            <button class="action-btn primary" @click="startPath(path)">开始这条路径</button>
            <button class="action-btn secondary" @click="comparePath(path)">对比</button>
          </div>
        </div>
      </div>
      
      <!-- 路径对比区域 - 放在推荐路径下面 -->
      <div v-if="showComparison" class="path-comparison">
        <h5 class="section-title">路径对比</h5>
        <div class="comparison-container">
          <!-- 并排对比内容 -->
          <div class="comparison-content">
            <!-- 并排对比容器 -->
            <div class="side-by-side-comparison">
              <!-- 路径A卡片 -->
              <div class="path-comparison-card path-a">
                <div class="path-comparison-header">
                  <h6 class="path-comparison-title">{{ comparedPaths[0]?.title || '路径A' }}</h6>
                  <div class="path-comparison-success-rate">成功率: {{ comparedPaths[0]?.successRate || 0 }}%</div>
                </div>
                
                <div class="comparison-indicators">
                  <!-- 收入曲线 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">收入曲线</span>
                    <div class="income-chart-container">
                      <div class="income-chart">
                        <!-- 年份标签 -->
                        <div class="year-label" style="left: 15%">第1年</div>
                        <div class="year-label" style="left: 35%">第2年</div>
                        <div class="year-label" style="left: 55%">第3年</div>
                        <div class="year-label" style="left: 75%">第4年</div>
                        <div class="year-label" style="left: 95%">第5年</div>
                        
                        <!-- SVG收入曲线 -->
                        <svg class="income-line-container" width="100%" height="100%" viewBox="0 0 1000 300">
                          <!-- 路径A曲线 -->
                          <path 
                            class="income-line path-a" 
                            d="M 50,250 C 150,220 250,180 350,150 C 450,120 550,100 650,120 C 750,140 850,180 950,150"
                          />
                          <!-- 路径A数据点 -->
                          <circle class="data-point path-a" cx="50" cy="250" r="4" />
                          <circle class="data-point path-a" cx="150" cy="220" r="4" />
                          <circle class="data-point path-a" cx="250" cy="180" r="4" />
                          <circle class="data-point path-a" cx="350" cy="150" r="4" />
                          <circle class="data-point path-a" cx="450" cy="120" r="4" />
                          <circle class="data-point path-a" cx="550" cy="100" r="4" />
                          <circle class="data-point path-a" cx="650" cy="120" r="4" />
                          <circle class="data-point path-a" cx="750" cy="140" r="4" />
                          <circle class="data-point path-a" cx="850" cy="180" r="4" />
                          <circle class="data-point path-a" cx="950" cy="150" r="4" />
                          <!-- 路径A收入标签 -->
                          <text class="income-label" x="50" y="240" text-anchor="middle">15K</text>
                          <text class="income-label" x="350" y="140" text-anchor="middle">25K</text>
                          <text class="income-label" x="550" y="90" text-anchor="middle">30K</text>
                          <text class="income-label" x="950" y="140" text-anchor="middle">35K</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 压力指数 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">压力指数</span>
                    <div class="stress-level-container">
                      <div class="stress-bar">
                        <div class="stress-fill path-a" :style="{ width: comparedPaths[0]?.stressLevel || '65%' }"></div>
                      </div>
                      <span class="indicator-value">{{ comparedPaths[0]?.stressLevel || '65%' }}</span>
                    </div>
                  </div>
                  
                  <!-- 时间周期 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">时间周期</span>
                    <span class="indicator-value">{{ comparedPaths[0]?.timePeriod || '5年' }}</span>
                  </div>
                  
                  <!-- 技能要求 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">技能要求</span>
                    <div class="skills-comparison">
                      <div class="skills-tags">
                        <span class="skill-tag" v-for="(skill, i) in comparedPaths[0]?.requiredSkills || ['Python', '机器学习', '数据标注', '模型评估']" :key="i">{{ skill }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 里程碑数量 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">里程碑数量</span>
                    <span class="indicator-value">{{ comparedPaths[0]?.milestones?.length || 0 }}个</span>
                  </div>
                </div>
              </div>
              
              <!-- 路径B卡片 -->
              <div class="path-comparison-card path-b">
                <div class="path-comparison-header">
                  <h6 class="path-comparison-title">{{ comparedPaths[1]?.title || '路径B' }}</h6>
                  <div class="path-comparison-success-rate">成功率: {{ comparedPaths[1]?.successRate || 0 }}%</div>
                </div>
                
                <div class="comparison-indicators">
                  <!-- 收入曲线 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">收入曲线</span>
                    <div class="income-chart-container">
                      <div class="income-chart">
                        <!-- 年份标签 -->
                        <div class="year-label" style="left: 15%">第1年</div>
                        <div class="year-label" style="left: 35%">第2年</div>
                        <div class="year-label" style="left: 55%">第3年</div>
                        <div class="year-label" style="left: 75%">第4年</div>
                        <div class="year-label" style="left: 95%">第5年</div>
                        
                        <!-- SVG收入曲线 -->
                        <svg class="income-line-container" width="100%" height="100%" viewBox="0 0 1000 300">
                          <!-- 路径B曲线 -->
                          <path 
                            class="income-line path-b" 
                            d="M 50,260 C 150,240 250,220 350,190 C 450,160 550,130 650,100 C 750,70 850,90 950,110"
                          />
                          <!-- 路径B数据点 -->
                          <circle class="data-point path-b" cx="50" cy="260" r="4" />
                          <circle class="data-point path-b" cx="150" cy="240" r="4" />
                          <circle class="data-point path-b" cx="250" cy="220" r="4" />
                          <circle class="data-point path-b" cx="350" cy="190" r="4" />
                          <circle class="data-point path-b" cx="450" cy="160" r="4" />
                          <circle class="data-point path-b" cx="550" cy="130" r="4" />
                          <circle class="data-point path-b" cx="650" cy="100" r="4" />
                          <circle class="data-point path-b" cx="750" cy="70" r="4" />
                          <circle class="data-point path-b" cx="850" cy="90" r="4" />
                          <circle class="data-point path-b" cx="950" cy="110" r="4" />
                          <!-- 路径B收入标签 -->
                          <text class="income-label" x="50" y="250" text-anchor="middle">12K</text>
                          <text class="income-label" x="350" y="180" text-anchor="middle">20K</text>
                          <text class="income-label" x="650" y="90" text-anchor="middle">32K</text>
                          <text class="income-label" x="950" y="100" text-anchor="middle">38K</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 压力指数 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">压力指数</span>
                    <div class="stress-level-container">
                      <div class="stress-bar">
                        <div class="stress-fill path-b" :style="{ width: comparedPaths[1]?.stressLevel || '75%' }"></div>
                      </div>
                      <span class="indicator-value">{{ comparedPaths[1]?.stressLevel || '75%' }}</span>
                    </div>
                  </div>
                  
                  <!-- 时间周期 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">时间周期</span>
                    <span class="indicator-value">{{ comparedPaths[1]?.timePeriod || '5年' }}</span>
                  </div>
                  
                  <!-- 技能要求 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">技能要求</span>
                    <div class="skills-comparison">
                      <div class="skills-tags">
                        <span class="skill-tag" v-for="(skill, i) in comparedPaths[1]?.requiredSkills || ['Python', '深度学习', '模型调优', '分布式训练']" :key="i">{{ skill }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 里程碑数量 -->
                  <div class="comparison-indicator-item">
                    <span class="indicator-label">里程碑数量</span>
                    <span class="indicator-value">{{ comparedPaths[1]?.milestones?.length || 0 }}个</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 差异总结 -->
            <div class="difference-summary">
              <div class="difference-title">差异总结</div>
              <div class="difference-items">
                <div class="difference-item">
                  <span class="difference-icon">📊</span>
                  成功率差异: {{ comparedPaths[0] && comparedPaths[1] ? Math.abs(comparedPaths[0].successRate - comparedPaths[1].successRate) + '%' : '0%' }}
                </div>
                <div class="difference-item">
                  <span class="difference-icon">⚡</span>
                  {{ comparedPaths[0]?.successRate > (comparedPaths[1]?.successRate || 0) ? comparedPaths[0]?.title : comparedPaths[1]?.title }} 的成功率更高
                </div>
                <div class="difference-item">
                  <span class="difference-icon">💼</span>
                  {{ comparedPaths[0]?.requiredSkills?.length > (comparedPaths[1]?.requiredSkills?.length || 0) ? comparedPaths[0]?.title : comparedPaths[1]?.title }} 需要掌握更多技能
                </div>
                <div class="difference-item">
                  <span class="difference-icon">🎯</span>
                  两条路径的核心技能差异: {{ comparedPaths[0]?.requiredSkills?.filter(skill => !comparedPaths[1]?.requiredSkills?.includes(skill)).join(', ') || '无' }} vs {{ comparedPaths[1]?.requiredSkills?.filter(skill => !comparedPaths[0]?.requiredSkills?.includes(skill)).join(', ') || '无' }}
                </div>
              </div>
            </div>
          </div>
          <button class="clear-compare-btn" @click="clearComparison">清除对比</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { careerPaths } from '../assets/mock/data'
import draggable from 'vuedraggable'
import KnowledgeGraph from './KnowledgeGraph.vue'

// 创建router实例
const router = useRouter()

const careerGoal = ref('')
const goalSuggestions = ['数据分析师', '产品经理', 'AI训练师', '跨境电商运营']
const showPaths = ref(false)
const showComparison = ref(false)
const comparedPaths = ref([])

// 复制职业路径数据，避免直接修改原始数据
const pathsData = ref([])

const selectSuggestion = (suggestion) => {
  careerGoal.value = `我想在5年内成为${suggestion}`
}

// 定义当前目标职业，用于知识图谱
const currentTargetCareer = ref('数据分析师')

const generatePaths = () => {
  if (careerGoal.value.trim()) {
    // 从输入中提取目标职业
    let targetCareer = ''
    const suggestions = goalSuggestions
    
    // 检查是否匹配预设的职业建议
    for (const suggestion of suggestions) {
      if (careerGoal.value.includes(suggestion)) {
        targetCareer = suggestion
        break
      }
    }
    
    // 如果没有匹配到预设职业，使用默认职业
    if (!targetCareer) {
      // 从输入中提取职业关键词
      const match = careerGoal.value.match(/成为(.+?)$/)
      if (match && match[1]) {
        targetCareer = match[1].trim()
      } else {
        // 默认使用第一个职业建议
        targetCareer = suggestions[0]
      }
    }
    
    // 更新当前目标职业
    currentTargetCareer.value = targetCareer
    
    // 获取对应的路径数据
    let paths = []
    if (careerPaths[targetCareer]) {
      // 如果有匹配的职业路径，使用对应的路径
      paths = careerPaths[targetCareer]
    } else {
      // 如果没有匹配的职业路径，使用所有职业的第一条路径
      paths = Object.values(careerPaths).map(pathGroup => pathGroup[0])
    }
    
    // 深拷贝数据，避免直接修改原始数据
    pathsData.value = JSON.parse(JSON.stringify(paths))
    showPaths.value = true
  }
}

const startPath = (path) => {
  console.log('开始路径:', path.title)
  
  // 1. 生成学习计划（基于路径内容）
  const generatedCourses = generateLearningPlan(path)
  
  // 2. 生成首期任务（基于路径的第一年内容）
  const generatedTasks = generateFirstTasks(path)
  
  // 3. 保存到localStorage，供成长中心使用
  saveToLocalStorage(generatedCourses, generatedTasks, path)
  
  // 4. 跳转到成长中心
  router.push('/growth-center')
}

// 生成学习计划
const generateLearningPlan = (path) => {
  // 根据路径内容生成相关课程
  const courses = []
  
  // 分析路径内容，提取关键词和路径类型
  const pathKeywords = []
  let pathType = ''
  
  // 1. 确定路径类型
  if (path.title.includes('数据分析师')) pathType = '数据分析'
  else if (path.title.includes('AI训练师') || path.title.includes('机器学习') || path.title.includes('深度学习')) pathType = 'AI/机器学习'
  else if (path.title.includes('产品经理')) pathType = '产品管理'
  else if (path.title.includes('跨境电商')) pathType = '跨境电商'
  else pathType = '通用'
  
  // 2. 提取路径关键词
  path.timeline.forEach(item => {
    // 技术关键词
    if (item.content.includes('SQL')) pathKeywords.push('SQL')
    if (item.content.includes('Tableau') || item.content.includes('可视化')) pathKeywords.push('数据可视化')
    if (item.content.includes('Python')) pathKeywords.push('Python')
    if (item.content.includes('机器学习')) pathKeywords.push('机器学习')
    if (item.content.includes('深度学习')) pathKeywords.push('深度学习')
    if (item.content.includes('数据分析')) pathKeywords.push('数据分析')
    if (item.content.includes('JavaScript') || item.content.includes('JS')) pathKeywords.push('JavaScript')
    if (item.content.includes('HTML') || item.content.includes('CSS')) pathKeywords.push('Web前端')
    if (item.content.includes('React') || item.content.includes('Vue')) pathKeywords.push('前端框架')
    
    // 业务关键词
    if (item.content.includes('业务')) pathKeywords.push('业务分析')
    if (item.content.includes('运营')) pathKeywords.push('运营管理')
    if (item.content.includes('产品')) pathKeywords.push('产品管理')
    if (item.content.includes('项目')) pathKeywords.push('项目管理')
    if (item.content.includes('管理')) pathKeywords.push('团队管理')
    
    // 特定领域关键词
    if (item.content.includes('跨境') || item.content.includes('电商')) pathKeywords.push('跨境电商')
    if (item.content.includes('AI') || item.content.includes('人工智能')) pathKeywords.push('人工智能')
    if (item.content.includes('标注') || item.content.includes('数据处理')) pathKeywords.push('数据标注')
  })
  
  // 3. 去重并添加路径类型作为关键词
  const uniqueKeywords = [...new Set([pathType, ...pathKeywords])]
  
  // 4. 基于关键词生成更丰富的课程
  uniqueKeywords.forEach((keyword, index) => {
    // 根据关键词生成更具体的课程标题
    let courseTitle = ''
    let courseDuration = 20 + index * 5
    let courseLectures = 15 + index * 5
    
    // 为不同关键词生成更具体的课程标题
    if (keyword === '数据分析') courseTitle = '数据分析全栈实战课程'
    else if (keyword === 'SQL') courseTitle = 'SQL高级查询与优化'
    else if (keyword === '数据可视化') courseTitle = 'Tableau/Power BI数据可视化大师课'
    else if (keyword === 'Python') courseTitle = 'Python数据分析与可视化'
    else if (keyword === '机器学习') courseTitle = '机器学习基础与实战'
    else if (keyword === '深度学习') courseTitle = '深度学习与神经网络'
    else if (keyword === 'AI/机器学习') courseTitle = 'AI训练师核心技能课程'
    else if (keyword === '业务分析') courseTitle = '业务分析与决策支持'
    else if (keyword === '产品管理') courseTitle = '产品经理实战指南'
    else if (keyword === '跨境电商') courseTitle = '跨境电商运营全攻略'
    else if (keyword === '项目管理') courseTitle = '敏捷项目管理实战'
    else if (keyword === 'JavaScript') courseTitle = '现代JavaScript开发'
    else if (keyword === 'Web前端') courseTitle = 'Web前端开发基础'
    else if (keyword === '前端框架') courseTitle = 'React/Vue前端框架实战'
    else if (keyword === '数据标注') courseTitle = 'AI数据标注与处理'
    else courseTitle = `${keyword}核心课程`
    
    // 调整课程时长和章节数
    if (keyword === '数据分析' || keyword === 'AI/机器学习') {
      courseDuration += 10
      courseLectures += 10
    }
    
    courses.push({
      id: `generated-course-${Date.now()}-${index}`,
      title: courseTitle,
      category: keyword,
      progress: 0,
      duration: `${courseDuration}天`,
      lectures: courseLectures,
      image: `https://picsum.photos/seed/generated-${keyword}-${Date.now()}/400/200`
    })
  })
  
  return courses
}

// 生成首期任务
const generateFirstTasks = (path) => {
  // 基于路径的第一年内容生成任务
  const tasks = []
  const firstYearContent = path.timeline[0]?.content || ''
  
  // 分析第一年内容，生成相关任务
  if (firstYearContent.includes('学习')) {
    tasks.push({
      id: `generated-task-${Date.now()}-1`,
      title: `完成路径第一年学习任务`,
      type: '学习任务',
      reward: '100积分',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30天后
      difficulty: '初级',
      image: 'https://picsum.photos/seed/generated-task-1/100/100'
    })
  }
  
  if (firstYearContent.includes('实习')) {
    tasks.push({
      id: `generated-task-${Date.now()}-2`,
      title: `寻找相关实习机会`,
      type: '职业发展',
      reward: '150积分',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15天后
      difficulty: '中级',
      image: 'https://picsum.photos/seed/generated-task-2/100/100'
    })
  }
  
  // 额外添加一个通用任务
  tasks.push({
    id: `generated-task-${Date.now()}-3`,
    title: `制定详细的月度学习计划`,
    type: '规划任务',
    reward: '50积分',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7天后
    difficulty: '初级',
    image: 'https://picsum.photos/seed/generated-task-3/100/100'
  })
  
  return tasks
}

// 保存到localStorage
const saveToLocalStorage = (courses, tasks, path) => {
  // 清除旧数据，确保只显示当前路径的课程和任务
  localStorage.removeItem('generatedCourses')
  localStorage.removeItem('generatedTasks')
  localStorage.removeItem('currentPath')
  
  // 保存生成的学习计划
  localStorage.setItem('generatedCourses', JSON.stringify(courses))
  
  // 保存生成的首期任务
  localStorage.setItem('generatedTasks', JSON.stringify(tasks))
  
  // 保存当前选择的路径信息
  localStorage.setItem('currentPath', JSON.stringify({
    id: path.id,
    title: path.title,
    startTime: new Date().toISOString()
  }))
  
  console.log('学习计划和首期任务已生成并保存到成长中心')
}

const comparePath = (path) => {
  if (comparedPaths.value.length < 2) {
    comparedPaths.value.push(path)
  } else {
    comparedPaths.value[1] = path
  }
  showComparison.value = comparedPaths.value.length >= 2
}

const clearComparison = () => {
  comparedPaths.value = []
  showComparison.value = false
}

// 拖拽结束后重新计算
const onDragEnd = (pathId, newTimeline) => {
  console.log('拖拽结束，重新计算路径:', pathId)
  // 重新计算成功率
  recalculateSuccessRate(pathId)
}

// 从知识图谱拖拽节点到路径中
const onDrop = (event, path) => {
  try {
    const nodeData = JSON.parse(event.dataTransfer.getData('application/json'))
    if (nodeData) {
      // 确定节点添加到第几年
      const year = path.timeline.length + 1
      // 创建新的时间线节点
      const newNode = {
        year: year,
        content: `学习${nodeData.title}`
      }
      // 添加到路径中
      path.timeline.push(newNode)
      // 重新计算成功率
      recalculateSuccessRate(path.id)
      // 重新计算时间线
      recalculateTimeline(path)
    }
  } catch (error) {
    console.error('拖拽数据解析失败:', error)
  }
}

// 移除路径节点
const removeNode = (path, node) => {
  const index = path.timeline.indexOf(node)
  if (index > -1) {
    // 移除节点
    path.timeline.splice(index, 1)
    // 重新计算时间线
    recalculateTimeline(path)
    // 重新计算成功率
    recalculateSuccessRate(path.id)
  }
}

// 重新计算时间线
const recalculateTimeline = (path) => {
  // 重新分配年份
  path.timeline.forEach((node, index) => {
    node.year = index + 1
  })
  // 如果是最后几年，更新为范围
  if (path.timeline.length > 3) {
    const lastNode = path.timeline[path.timeline.length - 1]
    lastNode.year = `${lastNode.year}-5`
  }
}

// 重新计算成功率
const recalculateSuccessRate = (pathId) => {
  const pathIndex = pathsData.value.findIndex(p => p.id === pathId)
  if (pathIndex !== -1) {
    const path = pathsData.value[pathIndex]
    // 基于节点数量和类型计算成功率
    // 基础成功率
    let baseRate = 70
    
    // 根据节点数量调整
    const nodeCount = path.timeline.length
    if (nodeCount < 3) {
      // 节点太少，成功率降低
      baseRate -= (3 - nodeCount) * 10
    } else if (nodeCount > 5) {
      // 节点太多，成功率略微降低
      baseRate -= (nodeCount - 5) * 2
    }
    
    // 根据节点内容调整
    let skillCount = 0
    let experienceCount = 0
    
    path.timeline.forEach(node => {
      if (node.content.includes('学习') || node.content.includes('掌握')) {
        skillCount++
      } else if (node.content.includes('实习') || node.content.includes('跳槽') || node.content.includes('晋升')) {
        experienceCount++
      }
    })
    
    // 技能和经验平衡调整
    if (skillCount > 0 && experienceCount > 0) {
      // 有技能学习也有经验积累，成功率提升
      baseRate += 5
    } else if (skillCount === 0) {
      // 只有经验没有技能学习，成功率降低
      baseRate -= 5
    } else if (experienceCount === 0) {
      // 只有技能学习没有经验，成功率降低
      baseRate -= 5
    }
    
    // 确保成功率在合理范围内
    const newRate = Math.max(30, Math.min(95, baseRate + Math.floor(Math.random() * 10) - 5))
    path.successRate = newRate
  }
}

// 暴露当前目标职业，用于知识图谱
const getCurrentTargetCareer = () => {
  return currentTargetCareer.value
}

// 获取显示状态，用于父组件
const getShowStatus = () => {
  return {
    showKnowledgeGraph: showPaths.value,
    showPaths: showPaths.value,
    showComparison: showComparison.value
  }
}

// 使用defineExpose导出方法，以便父组件调用
defineExpose({
  getCurrentTargetCareer,
  getShowStatus
})
</script>

<style scoped>
.path-generator {
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

.section-title {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  font-weight: 600;
}

.goal-setting-section {
  margin-bottom: var(--spacing-lg);
}

.goal-input-container {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.goal-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.goal-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.generate-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.generate-btn:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.goal-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.suggestion-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full, 9999px);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.suggestion-tag:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.paths-section {
  margin-bottom: var(--spacing-lg);
}

.paths-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

/* 路径展示区域样式 */
.paths-display-section {
  margin-top: var(--spacing-xl);
  width: 100%;
}

.paths-display-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.knowledge-graph-container {
  margin-bottom: var(--spacing-xl);
  width: 100%;
}

.paths-display-section .section-title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.path-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.path-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.path-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.path-title {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}

.path-success-rate {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.rate-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.rate-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--success-color);
}

.path-timeline {
  margin-bottom: var(--spacing-lg);
}

.timeline-item {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 25px;
  top: 24px;
  bottom: -16px;
  width: 2px;
  background-color: var(--border-color);
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-year {
  font-weight: 600;
  color: var(--primary-color);
  min-width: 50px;
}

.timeline-content {
  flex: 1;
  color: var(--text-primary);
}

.timeline-item {
  cursor: move;
  transition: all var(--transition-fast);
}

.timeline-item:hover {
  background-color: var(--bg-secondary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.drag-handle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  cursor: move;
  margin-left: auto;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}

.timeline-item:hover .drag-handle {
  opacity: 1;
}

/* 拖拽时的样式 */
.ghost {
  opacity: 0.5;
  background-color: var(--primary-color);
  color: white;
}

/* 成功率样式 */
.rate-value.high-success {
  color: var(--success-color);
  font-weight: 700;
}

.success-message {
  font-size: var(--font-size-xs);
  color: var(--success-color);
  margin-left: var(--spacing-xs);
  font-weight: 500;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.path-milestones {
  margin-bottom: var(--spacing-lg);
}

.milestones-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  display: block;
}

.milestones-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.milestone {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.path-risk {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: rgba(250, 173, 20, 0.1);
  border: 1px solid rgba(250, 173, 20, 0.2);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.risk-icon {
  font-size: var(--font-size-lg);
  min-width: 20px;
  margin-top: -2px;
}

.risk-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--warning-color);
}

.path-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.action-btn {
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.action-btn.primary {
  background-color: var(--primary-color);
  color: white;
}

.action-btn.primary:hover {
  background-color: #40a9ff;
  transform: translateY(-1px);
}

.action-btn.secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.action-btn.secondary:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-1px);
}

.path-comparison {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.comparison-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.comparison-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* 并排对比容器 */
.side-by-side-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

/* 路径对比卡片 */
.path-comparison-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.path-comparison-header {
  text-align: center;
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--primary-color);
}

.path-comparison-title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.path-comparison-success-rate {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--success-color);
}

/* 对比指标项 */
.comparison-indicators {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.comparison-indicator-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.indicator-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.indicator-value {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-weight: 600;
}

/* 收入曲线对比 */
.income-chart-container {
  height: 150px;
  position: relative;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.income-chart {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 5%;
}

/* 曲线背景网格线 */
.income-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(to right, transparent 0%, transparent 95%, rgba(0, 0, 0, 0.1) 95%, rgba(0, 0, 0, 0.1) 100%),
    linear-gradient(to top, transparent 0%, transparent 95%, rgba(0, 0, 0, 0.1) 95%, rgba(0, 0, 0, 0.1) 100%);
  background-size: 20% 25%;
  z-index: 0;
}

/* 收入曲线容器 */
.income-line-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

/* 收入曲线 */
.income-line {
  position: absolute;
  bottom: 20px;
  left: 5%;
  right: 5%;
  height: calc(100% - 40px);
  stroke-width: 3;
  fill: none;
  transition: all 0.3s ease;
  animation: drawPath 1.5s ease-out forwards;
}

/* 路径A曲线 */
.income-line.path-a {
  stroke: var(--primary-color);
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

/* 路径B曲线 */
.income-line.path-b {
  stroke: var(--success-color);
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

/* 动画效果 */
@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

/* 数据点样式 */
.data-point {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  border: 2px solid var(--bg-primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
  animation: dataPointAppear 0.5s ease-out forwards;
  animation-delay: 1.2s;
  opacity: 0;
}

/* 数据点出现动画 */
@keyframes dataPointAppear {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 路径A数据点 */
.data-point.path-a {
  background-color: var(--primary-color);
}

/* 路径B数据点 */
.data-point.path-b {
  background-color: var(--success-color);
}

/* 收入数值标签 */
.income-label {
  position: absolute;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  transform: translateX(-50%);
  z-index: 3;
  animation: labelAppear 0.5s ease-out forwards;
  animation-delay: 1.4s;
  opacity: 0;
}

@keyframes labelAppear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 年份标签 */
.year-label {
  position: absolute;
  bottom: 5px;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  transform: translateX(-50%);
  z-index: 3;
}

/* 压力指数对比 */
.stress-level-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.stress-bar {
  height: 12px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.stress-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

.stress-fill.path-a {
  background-color: var(--primary-color);
  width: 65%;
}

.stress-fill.path-b {
  background-color: var(--success-color);
  width: 75%;
}

/* 技能对比 */
.skills-comparison {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

/* 差异总结 */
.difference-summary {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.difference-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.difference-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.difference-item {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.difference-icon {
  font-size: var(--font-size-xs);
  color: var(--primary-color);
}

/* 技能标签 */
.skill-tag {
  padding: 2px 8px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.skill-tag:hover {
  background-color: var(--bg-secondary);
  transform: translateY(-1px);
}

.clear-compare-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  align-self: flex-start;
}

.clear-compare-btn:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .paths-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .side-by-side-comparison {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .goal-input-container {
    flex-direction: column;
  }
  
  .paths-container {
    grid-template-columns: 1fr;
  }
  
  .path-actions {
    flex-direction: column;
  }
}
</style>