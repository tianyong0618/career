<template>
  <div class="ai-chat card">
    <div class="card-header">
      <h3>AI经纪人</h3>
      <span class="chat-status">在线</span>
    </div>
    <div class="card-content">
      <!-- 对话历史区域 -->
      <div class="chat-history" ref="chatHistoryRef">
        <div 
          class="message" 
          :class="{ 'user-message': msg.role === 'user', 'ai-message': msg.role === 'ai' }"
          v-for="msg in chatMessages" 
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
        <button class="function-btn" @click="sendQuickMessage('我想转行做短视频运营')">
          🔍 职业规划
        </button>
        <button class="function-btn" @click="sendQuickMessage('帮我找下周远程的数据分析兼职')">
          📋 找实战项目
        </button>
        <button class="function-btn" @click="sendQuickMessage('我刚做完飞书项目复盘')">
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
  
  // 1. 短视频运营转行请求
  if (lowerMessage.includes('转行') && lowerMessage.includes('短视频') && lowerMessage.includes('运营')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `根据你想转行做短视频运营的需求，我为你准备了个性化的职业发展方案：\n\n📌 **短视频运营核心路径**\n1. **基础认知阶段**：了解短视频平台算法、内容生态、运营模式\n2. **技能学习阶段**：掌握内容策划、脚本写作、拍摄剪辑、数据分析\n3. **实战积累阶段**：完成3-5个短视频项目，构建作品集\n4. **求职就业阶段**：优化简历，准备面试，投递目标岗位\n\n📚 **推荐课程**\n- 《30天爆款脚本写作》：系统学习短视频脚本创作技巧\n- 《抖音算法解密与运营策略》：深入理解平台规则\n- 《短视频数据分析与优化》：掌握数据驱动的运营方法\n\n✅ **微任务挑战**\n"为本地奶茶店写1条抖音脚本"\n要求：\n- 时长：15-30秒\n- 风格：轻松有趣，突出产品特色\n- 结构：钩子+内容+转化点\n\n我已为你生成了详细的学习路径和资源清单，点击查看完整内容！`,
      actions: [
        { text: '查看路径沙盒', link: '/path-sandbox' },
        { text: '学习《30天爆款脚本写作》', link: '/growth-center' },
        { text: '领取微任务', link: '/growth-center' }
      ]
    })
  }
  // 2. 找数据分析兼职请求
  else if (lowerMessage.includes('找') && lowerMessage.includes('远程') && lowerMessage.includes('数据分析') && lowerMessage.includes('兼职')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `已为你匹配到3个高匹配度的远程数据分析兼职任务：\n\n1. **电商用户行为分析**\n   - 任务内容：分析电商平台用户行为数据，生成周度分析报告\n   - 时间要求：每周10小时，持续4周\n   - 预估报价：¥2,500-¥3,500/周\n   - 技能要求：SQL、Python、Tableau\n   - 截止日期：本周日\n\n2. **金融数据可视化**\n   - 任务内容：为金融产品构建实时数据仪表盘\n   - 时间要求：每周15小时，持续3周\n   - 预估报价：¥3,000-¥4,500/周\n   - 技能要求：Power BI、SQL、金融知识\n   - 截止日期：下周一\n\n3. **社交媒体数据分析**\n   - 任务内容：分析社交媒体营销活动效果，优化投放策略\n   - 时间要求：每周8小时，持续6周\n   - 预估报价：¥2,000-¥3,000/周\n   - 技能要求：Python、数据分析、社交媒体知识\n   - 截止日期：下周三\n\n这些任务均为远程工作，时间灵活，适合你当前的技能水平和时间安排。点击查看详情并投递申请！`,
      actions: [
        { text: '查看任务详情', link: '/crowdsourcing' },
        { text: '投递申请', link: '/crowdsourcing' },
        { text: '查看更多任务', link: '/crowdsourcing' }
      ]
    })
  }
  // 3. 飞书项目复盘成果提取请求
  else if (lowerMessage.includes('飞书') && lowerMessage.includes('项目复盘')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `已成功调用生产力助手提取你的飞书项目复盘成果：\n\n**项目基本信息**\n📋 **项目概况**：\n   - 项目名称：飞书协同办公平台落地项目\n   - 项目周期：2024年3月-6月（3个月）\n   - 项目规模：覆盖公司5个部门，120+员工\n   - 核心目标：提升跨部门协作效率，实现文档管理规范化\n\n**核心成果提取**\n✅ **量化成果**：\n   - 跨部门审批效率提升68%\n   - 文档查找时间减少72%\n   - 全公司飞书使用率达95%+\n   - 跨部门协作效率提升56%\n\n🎯 **能力标签生成**：\n   - 跨团队协作（强）\n   - 项目管理（强）\n   - 工具落地（强）\n   - 培训赋能（中）\n   - 数据分析（中）\n\n📈 **成果应用建议**：\n   - 将量化成果写入简历，突出"跨团队协作"能力\n   - 在面试中重点阐述飞书项目的成功案例\n   - 考虑申请项目管理或协作工具实施相关岗位\n\n这些成果已自动更新到你的职业镜像中，系统将根据这些信息为你推荐更匹配的职业机会和发展建议。`,
      actions: [
        { text: '查看我的职业镜像', link: '/' },
        { text: '生成项目作品集', link: '/' }
      ]
    })
  }
  // 4. 职业规划请求（数据分析师）
  else if (lowerMessage.includes('转行') || lowerMessage.includes('职业规划') || lowerMessage.includes('需要准备')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `根据你希望转行数据分析师的需求，结合当前行业招聘趋势，我为你定制了一份详细的职业规划路径：\n\n**基础技能阶段（1.5-2个月）**\n📚 **学习内容**：\n   - SQL核心语法与实战：掌握JOIN、GROUP BY、子查询等数据分析必备SQL技能，完成50+实战练习\n   - Python编程基础：重点学习数据处理相关库（Pandas、NumPy），完成30+数据处理任务\n   - 数据分析基础：理解统计学核心概念（描述性统计、假设检验），掌握A/B测试原理\n\n💡 **学习资源推荐**：\n   - SQL：《SQL必知必会》+ LeetCode数据库题库（前100题）\n   - Python：Coursera《Python for Everybody》+ Kaggle入门教程\n   - 统计学：可汗学院统计学课程\n\n**进阶技能阶段（2-2.5个月）**\n📈 **核心技能提升**：\n   - 数据可视化：熟练使用Tableau/Power BI，能独立完成业务仪表盘制作\n   - 机器学习基础：掌握线性回归、逻辑回归等常用算法，能使用Scikit-learn实现\n   - 业务分析能力：学习如何将数据与业务场景结合，完成1个综合分析项目\n\n🏆 **实战任务**：\n   - 使用真实电商数据集（Kaggle提供）完成用户行为分析报告\n   - 构建销售预测模型，并用Power BI制作动态仪表盘\n\n**项目实战阶段（1.5-2个月）**\n📊 **项目积累**：\n   - 独立完成2-3个高质量项目：例如用户画像分析、流失预测模型、产品推荐系统\n   - 构建个人作品集网站：将项目整理成结构化案例，包含数据来源、分析过程、结论与建议\n   - 参与1-2个Kaggle竞赛，积累实战经验\n\n🎯 **求职准备**：\n   - 简历优化：突出数据分析技能和项目经验，量化成果（如"提高分析效率40%"）\n   - 面试准备：练习50+数据分析面试题，准备3-5个项目案例的STAR法则阐述\n   - 模拟面试：找同行进行1-2次模拟面试，优化表达逻辑\n\n**求职阶段**\n🚀 **投递策略**：\n   - 精准投递：针对JD关键词优化简历，重点投递20-30家目标公司\n   - 行业选择：优先考虑互联网、电商、金融等数据驱动型行业\n   - 职业发展：入职后持续学习，关注行业趋势，1-2年后可向数据科学家或业务分析专家方向发展\n\n我已为你整理了一份详细的学习计划表，包含每日学习任务和资源链接，点击查看详情。`,
      actions: [
        { text: '查看完整学习计划表', link: '/path-sandbox' },
        { text: '获取推荐学习资源', link: '/growth-center' }
      ]
    })
  }
  // 5. 找实战项目请求
  else if (lowerMessage.includes('实战项目') || lowerMessage.includes('项目经验') || lowerMessage.includes('找项目')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `根据数据分析职业目标，我为你精选了4个高质量实战项目，覆盖不同行业和技能点，能有效提升你的竞争力：\n\n1. **电商用户行为分析**\n📊 **项目背景**：基于某知名电商平台2024年真实用户行为数据（包含100万+用户记录）\n\n🔧 **技能栈**：\n   - SQL：复杂查询、数据清洗与预处理\n   - Python：Pandas数据处理、Matplotlib可视化\n   - Tableau：交互式仪表盘制作\n\n🎯 **核心任务**：\n   - 分析用户转化漏斗（浏览→加购→购买）\n   - 识别高价值用户群体，构建用户画像\n   - 分析用户购买行为模式，提出提升复购率建议\n   - 预测用户流失风险，制定挽留策略\n\n📈 **预期成果**：一份完整的用户行为分析报告，包含数据洞察和业务建议，以及交互式Tableau仪表盘\n\n2. **金融信贷风险预测**\n💳 **项目背景**：使用某银行2023-2024年信贷申请数据（50万+申请记录）\n\n🔧 **技能栈**：\n   - Python：Pandas数据处理、Scikit-learn机器学习\n   - 机器学习算法：逻辑回归、随机森林、XGBoost\n   - 评估指标：AUC-ROC、精确率、召回率\n\n🎯 **核心任务**：\n   - 清洗和预处理信贷数据，处理缺失值和异常值\n   - 构建信贷风险预测模型，识别高风险申请人\n   - 分析模型特征重要性，解释模型决策过程\n   - 生成风险评分卡，辅助信贷审批决策\n\n📈 **预期成果**：一个准确率达85%+的风险预测模型，以及一份详细的模型评估报告\n\n3. **社交媒体情感分析**\n📱 **项目背景**：基于2024年某热门产品在微博/抖音的10万+用户评论数据\n\n🔧 **技能栈**：\n   - Python：NLTK/Transformers文本处理、情感分析\n   - 自然语言处理：词云生成、主题建模、情感分类\n   - 可视化：Plotly交互式可视化\n\n🎯 **核心任务**：\n   - 分析用户对产品的整体情感倾向\n   - 识别用户关注的核心话题和痛点\n   - 追踪情感变化趋势，分析营销活动效果\n   - 生成产品改进建议，反馈给产品团队\n\n📈 **预期成果**：一份情感分析报告，包含情感分布、热点话题、改进建议\n\n4. **企业销售数据分析**\n📊 **项目背景**：某制造企业2023年全渠道销售数据（包含产品、渠道、区域等维度）\n\n🔧 **技能栈**：\n   - Excel：高级函数、数据透视表、Power Query\n   - SQL：多表关联查询、分组聚合\n   - Power BI：动态销售仪表盘制作\n\n🎯 **核心任务**：\n   - 分析销售趋势，识别季节性波动\n   - 评估不同渠道和区域的销售表现\n   - 分析产品组合，识别明星产品和潜力产品\n   - 制定下一季度销售目标和策略建议\n\n📈 **预期成果**：一份销售分析报告和交互式Power BI销售仪表盘\n\n每个项目都包含完整的数据集、详细的任务说明和参考解决方案，点击查看详情开始你的第一个项目吧！`,
      actions: [
        { text: '开始第一个项目', link: '/growth-center' },
        { text: '生成项目学习计划', link: '/growth-center' }
      ]
    })
  }
  // 6. 提取成果请求
  else if (lowerMessage.includes('复盘') || lowerMessage.includes('提取成果') || lowerMessage.includes('项目总结')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `已成功从你的飞书项目复盘中提取关键成果，以下是结构化分析：\n\n**项目基本信息**\n📋 **项目概况**：\n   - 项目名称：飞书协同办公平台落地项目\n   - 项目周期：2024年3月-6月（3个月）\n   - 项目规模：覆盖公司5个部门，120+员工\n   - 核心目标：提升跨部门协作效率，实现文档管理规范化\n\n**核心成果与价值**\n🏆 **量化成果**：\n   1. **流程优化**：\n      - 优化了跨部门审批流程，审批时间从平均2.5天缩短至0.8天，效率提升68%\n      - 建立了标准化文档管理流程，文档查找时间减少72%\n   2. **工具落地**：\n      - 成功部署飞书文档、日历、会议等核心功能，全公司使用率达95%+\n      - 整合了现有系统（CRM、OA），实现数据打通，减少重复工作\n   3. **团队赋能**：\n      - 组织3场专题培训，累计培训150人次，培训满意度达4.8/5.0\n      - 建立了飞书使用知识库，包含100+常见问题解决方案\n   4. **业务影响**：\n      - 跨部门项目协作效率提升56%，项目交付周期缩短28%\n      - 文档版本冲突问题减少90%，提升了工作准确性\n\n**能力体现与成长**\n🌟 **核心能力展示**：\n   - **项目管理能力**：完整负责项目从规划到落地的全流程，有效管理时间和资源\n   - **跨部门沟通能力**：协调5个部门的需求，成功推动变革\n   - **问题解决能力**：解决了系统集成、员工抵触等多个关键问题\n   - **培训赋能能力**：设计了有效的培训方案，提升了团队数字化能力\n   - **数据分析能力**：通过数据追踪项目效果，量化项目价值\n\n**经验总结与改进**\n📝 **成功因素**：\n   - 充分的需求调研：提前了解各部门痛点，设计针对性方案\n   - 有效的变革管理：分阶段推广，及时收集反馈并调整\n   - 强大的支持体系：获得了管理层的支持，建立了内部推广团队\n\n💡 **改进空间**：\n   - 可进一步优化系统集成深度，减少切换成本\n   - 建立长期的使用情况监控机制，持续优化\n   - 针对不同部门设计更个性化的使用方案\n\n**成果应用建议**\n🎯 **职业价值**：\n   - 将项目成果量化写入简历，突出"效率提升68%"等具体数据\n   - 在面试中用STAR法则阐述项目经历，重点突出解决的关键问题\n   - 作为数字化转型项目案例，展示你的综合能力\n\n这些成果已自动更新到你的职业镜像中，系统将根据这些信息为你推荐更匹配的职业机会和发展建议。`,
      actions: [
        { text: '查看我的职业镜像', link: '/' },
        { text: '生成项目作品集', link: '/' }
      ]
    })
  }
  // 7. 简历相关请求
  else if (lowerMessage.includes('简历') || lowerMessage.includes('求职')) {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `简历是求职的敲门砖，一份优秀的数据分析简历能让你在众多候选人中脱颖而出。以下是针对数据分析岗位的简历优化建议：\n\n**一、结构优化**\n📋 **黄金简历结构**（按重要性排序）：\n   1. 个人信息：姓名、联系方式、LinkedIn/GitHub链接\n   2. 求职目标：1-2句话明确目标岗位和核心优势\n   3. 核心技能：按熟练度分类（精通/熟练/了解），突出数据分析相关技能\n   4. 项目经验：3-4个重点项目，使用STAR法则描述\n   5. 工作经历：突出与数据分析相关的职责和成果\n   6. 教育背景：包含学历、专业、GPA（如果优秀）\n   7. 证书与荣誉：相关证书（如CDA、Tableau认证）\n\n**二、内容优化重点**\n🎯 **突出数据分析能力**：\n   - 使用数据化描述："优化了数据分析流程，提高效率45%"而非"改进了数据分析流程"\n   - 强调技术栈：明确写出使用的工具（SQL、Python、Tableau等）和具体库\n   - 展示分析思路：简要说明"如何分析"和"为什么这样分析"\n\n**三、关键词优化**\n🔍 **匹配JD关键词**：\n   - 仔细阅读目标岗位JD，提取核心关键词（如"用户画像"、"A/B测试"、"SQL优化"）\n   - 在简历中自然融入这些关键词，提高ATS系统匹配度\n   - 针对不同岗位定制简历，突出与该岗位最相关的技能和经验\n\n**四、项目经验写法示例**\n📊 **不良示例**："负责电商数据分析项目，使用Python处理数据"\n\n✨ **优秀示例**：\n   - **项目名称**：电商用户行为分析与转化优化\n   - **项目背景**：为提升电商平台转化率，针对100万+用户行为数据进行分析\n   - **核心职责**：使用SQL清洗和提取数据，用Python（Pandas）进行用户分群分析，用Tableau制作可视化报表\n   - **关键成果**：识别出3个高转化用户群体，提出5条优化建议，落地后转化率提升18%\n\n**五、求职准备建议**\n💡 **除了简历，你还需要准备**：\n   - 个人作品集：将项目整理成在线案例，包含数据来源、分析过程、代码和结论\n   - 面试准备：\n     - 准备3-5个项目案例的详细阐述（使用STAR法则）\n     - 练习SQL查询、Python编程、统计学等基础技能\n     - 了解目标公司业务，准备1-2个针对该公司的分析思路\n   - 模拟面试：找同行或导师进行模拟面试，优化表达逻辑和应变能力\n\n**六、简历投递策略**\n🚀 **提高投递成功率**：\n   - 精准投递：每天投递10-15家目标公司，而非海投\n   - 内推优先：利用LinkedIn、朋友等渠道获取内推机会\n   - 跟踪反馈：记录投递情况，及时总结调整\n\n你可以上传简历，我将为你提供具体的优化建议和修改方案，帮助你打造一份更具竞争力的数据分析简历。`,
      actions: [
        { text: '上传简历获取优化建议', link: '#' },
        { text: '查看数据分析简历模板', link: '/growth-center' }
      ]
    })
  }
  // 8. 默认回复
  else {
    chatMessages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `感谢你的提问！我是你的AI经纪人，致力于为你提供专业、个性化的职业发展建议。\n\n为了能给你更精准的帮助，我需要了解一些关于你的基本信息：\n\n1. **当前职业状态**：你现在从事什么工作？有多少年工作经验？\n2. **技能背景**：你掌握哪些技能？特别是数据分析、编程、业务分析等相关技能\n3. **职业目标**：你希望达到什么样的职业目标？例如转行数据分析、晋升管理层、创业等\n4. **当前挑战**：你目前在职业发展中遇到了什么问题或挑战？\n5. **时间规划**：你计划在多长时间内实现你的职业目标？\n\n你可以详细描述你的情况，我会根据你的具体背景为你提供定制化的建议和方案。\n\n如果你有特定的问题，也可以直接问我，例如：\n- "如何学习数据分析？"\n- "数据分析面试常见问题有哪些？"\n- "如何构建数据分析作品集？"\n\n我会尽力为你提供最实用、最真实的职业发展支持！`,
      actions: [
        { text: '详细了解我的需求', link: '#' }
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
        content: `已成功解析你的简历！\n\n解析结果：\n1. 识别出你擅长Python、SQL等技能\n2. 发现你有数据分析项目经验\n3. 建议强化"数据分析"关键词\n\n已自动更新你的职业镜像！`,
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