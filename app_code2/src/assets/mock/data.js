// 模拟数据文件

// 用户信息
export const userInfo = {
  id: 'user123',
  name: '张小帅',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZhangXiaoMing',
  age: 24,
  major: '计算机科学',
  status: '求职中',
  tags: ['24岁', '计算机专业', 'Python熟练', '求职中']
}


// 职业倾向雷达图数据
export const careerTendency = {
  labels: ['技术硬实力', '产品思维', '行业人脉', '软技能', '执行力', '学习速度'],
  data: [85, 60, 40, 50, 70, 90]
}


// 能力云图数据
export const skillCloud = {
  hardSkills: [
    { name: 'Python', level: '熟练', source: '简历解析+实训任务#123' },
    { name: 'SQL', level: '掌握', source: '简历解析+课程#456' },
    { name: 'Tableau', level: '入门', source: '课程#789' },
    { name: 'JavaScript', level: '掌握', source: '实训任务#321' },
    { name: '数据分析', level: '熟练', source: '项目经验#654' }
  ],
  softSkills: [
    { name: '逻辑思维', level: '强', source: 'AI测评' },
    { name: '沟通表达', level: '中', source: 'AI测评' },
    { name: '抗压能力', level: '待验证', source: 'AI测评' },
    { name: '团队协作', level: '中', source: '项目经验#654' },
    { name: '学习能力', level: '强', source: 'AI测评' }
  ]
}

// 成长进度数据
export const growthProgress = {
  mainGoal: '成为初级数据分析师',
  milestones: [
    { name: 'SQL掌握', completed: true },
    { name: '项目经验', completed: true },
    { name: 'Tableau入门', completed: false }
  ],
  hint: '还需完成1个可视化实战项目',
  progress: 67
}

// 快捷行动区数据
export const quickActions = [
  { id: 3, icon: '📌', text: '今日推荐', link: '/growth-center' }
]

// 职业路径数据 - 按职业目标分类
export const careerPaths = {
  '数据分析师': [
    {
      id: 1,
      title: '数据分析师路径1：技术深耕型',
      timeline: [
        { year: 1, content: '学习SQL+Tableau+实习' },
        { year: 2, content: '跳槽中级数据分析师' },
        { year: '3-5', content: '晋升高级数据分析师' }
      ],
      milestones: [
        { text: '主导1个DAU 10万+产品数据分析', completed: false },
        { text: '考取Tableau认证', completed: false }
      ],
      successRate: 82,
      risk: '当前缺乏用户调研经验 → 建议先完成“校园APP需求访谈”任务'
    },
    {
      id: 2,
      title: '数据分析师路径2：业务导向型',
      timeline: [
        { year: 1, content: '学习SQL+业务知识+实习' },
        { year: 2, content: '成为业务分析师' },
        { year: '3-5', content: '晋升数据运营经理' }
      ],
      milestones: [
        { text: '完成5个业务分析项目', completed: false },
        { text: '获得业务分析师认证', completed: false }
      ],
      successRate: 75,
      risk: '当前缺乏业务领域知识 → 建议先学习相关行业知识'
    },
    {
      id: 3,
      title: '数据分析师路径3：算法方向',
      timeline: [
        { year: 1, content: '学习Python+机器学习+实习' },
        { year: 2, content: '成为算法工程师助理' },
        { year: '3-5', content: '晋升算法工程师' }
      ],
      milestones: [
        { text: '发表1篇算法相关论文', completed: false },
        { text: '掌握至少3种机器学习算法', completed: false }
      ],
      successRate: 68,
      risk: '当前缺乏算法基础 → 建议先学习Python和算法基础'
    }
  ],
  '产品经理': [
    {
      id: 4,
      title: '产品经理路径1：互联网产品',
      timeline: [
        { year: 1, content: '学习Axure+用户调研+实习' },
        { year: 2, content: '跳槽中级产品经理' },
        { year: '3-5', content: '晋升高级产品经理' }
      ],
      milestones: [
        { text: '主导1个成功上线的产品功能', completed: false },
        { text: '考取PMP证书', completed: false }
      ],
      successRate: 65,
      risk: '当前缺乏产品设计经验 → 建议先完成“产品原型设计”任务'
    },
    {
      id: 5,
      title: '产品经理路径2：B端产品',
      timeline: [
        { year: 1, content: '学习B端产品设计+实习' },
        { year: 2, content: '成为B端产品经理' },
        { year: '3-5', content: '晋升B端产品负责人' }
      ],
      milestones: [
        { text: '主导1个B端产品的完整生命周期', completed: false },
        { text: '获得B端产品经理认证', completed: false }
      ],
      successRate: 72,
      risk: '当前缺乏B端业务知识 → 建议先了解企业级产品设计'
    },
    {
      id: 6,
      title: '产品经理路径3：AI产品',
      timeline: [
        { year: 1, content: '学习AI产品设计+机器学习基础+实习' },
        { year: 2, content: '成为AI产品经理' },
        { year: '3-5', content: '晋升AI产品负责人' }
      ],
      milestones: [
        { text: '主导1个AI产品的设计与落地', completed: false },
        { text: '掌握AI产品设计方法论', completed: false }
      ],
      successRate: 60,
      risk: '当前缺乏AI技术知识 → 建议先学习机器学习基础'
    }
  ],
  'AI训练师': [
    {
      id: 7,
      title: 'AI训练师路径1：数据标注专家',
      timeline: [
        { year: 1, content: '学习数据标注+机器学习基础+实习' },
        { year: 2, content: '成为高级数据标注师' },
        { year: '3-5', content: '晋升数据标注团队负责人' }
      ],
      milestones: [
        { text: '完成10万+数据标注任务', completed: false },
        { text: '获得数据标注专家认证', completed: false }
      ],
      successRate: 85,
      risk: '当前缺乏数据标注经验 → 建议先参与数据标注项目'
    },
    {
      id: 8,
      title: 'AI训练师路径2：模型训练方向',
      timeline: [
        { year: 1, content: '学习机器学习+深度学习+实习' },
        { year: 2, content: '成为AI模型训练师' },
        { year: '3-5', content: '晋升高级AI训练师' }
      ],
      milestones: [
        { text: '主导1个AI模型训练项目', completed: false },
        { text: '发表1篇AI相关文章', completed: false }
      ],
      successRate: 78,
      risk: '当前缺乏机器学习理论基础 → 建议先完成“机器学习入门”课程'
    },
    {
      id: 9,
      title: 'AI训练师路径3：算法优化方向',
      timeline: [
        { year: 1, content: '学习Python+算法+实习' },
        { year: 2, content: '成为算法优化工程师' },
        { year: '3-5', content: '晋升算法优化专家' }
      ],
      milestones: [
        { text: '优化3个AI模型的性能', completed: false },
        { text: '获得算法工程师认证', completed: false }
      ],
      successRate: 65,
      risk: '当前缺乏算法基础 → 建议先学习Python和算法基础'
    }
  ],
  '跨境电商运营': [
    {
      id: 10,
      title: '跨境电商运营路径1：平台运营',
      timeline: [
        { year: 1, content: '学习亚马逊运营+选品+实习' },
        { year: 2, content: '成为亚马逊运营主管' },
        { year: '3-5', content: '晋升跨境电商运营经理' }
      ],
      milestones: [
        { year: '完成100万+销售额', completed: false },
        { year: '获得亚马逊运营认证', completed: false }
      ],
      successRate: 70,
      risk: '当前缺乏跨境电商知识 → 建议先学习平台规则'
    },
    {
      id: 11,
      title: '跨境电商运营路径2：独立站运营',
      timeline: [
        { year: 1, content: '学习Shopify建站+SEO+实习' },
        { year: 2, content: '成为独立站运营专家' },
        { year: '3-5', content: '拥有自己的跨境电商品牌' }
      ],
      milestones: [
        { year: '建立1个月销售额10万+的独立站', completed: false },
        { year: '掌握SEO和SEM技能', completed: false }
      ],
      successRate: 62,
      risk: '当前缺乏建站和营销知识 → 建议先学习Shopify和SEO'
    },
    {
      id: 12,
      title: '跨境电商运营路径3：供应链管理',
      timeline: [
        { year: 1, content: '学习供应链管理+采购+实习' },
        { year: 2, content: '成为跨境供应链经理' },
        { year: '3-5', content: '晋升供应链总监' }
      ],
      milestones: [
        { year: '建立稳定的供应商网络', completed: false },
        { year: '降低15%的供应链成本', completed: false }
      ],
      successRate: 75,
      risk: '当前缺乏供应链知识 → 建议先学习供应链管理基础'
    }
  ]
}

// AI对话历史数据
export const chatHistory = [
  {
    id: 1,
    role: 'user',
    content: '我想转行做数据分析师，需要准备什么？'
  },
  {
    id: 2,
    role: 'ai',
    content: '转行做数据分析师，建议你：\n1. 学习SQL、Python等核心技能\n2. 掌握Tableau或Power BI等可视化工具\n3. 积累1-2个实战项目经验\n4. 了解数据分析方法论\n\n我已经为你生成了个性化学习路径，点击查看详情：[数据分析师路径]',
    actions: [
      { text: '查看数据分析师路径', link: '/path-sandbox' }
    ]
  },
  {
    id: 3,
    role: 'user',
    content: '帮我找一些数据分析的实战项目'
  },
  {
    id: 4,
    role: 'ai',
    content: '以下是适合你的数据分析实战项目：\n1. 电商用户行为分析\n2. 金融风险预测\n3. 社交媒体情感分析\n\n我已经将这些项目添加到你的成长中心，点击查看详情：[成长中心]',
    actions: [
      { text: '查看成长中心', link: '/growth-center' }
    ]
  }
]

// 成长中心数据
export const growthCenterData = {
  courses: [
    {
      id: 1,
      title: '30天成为数据分析师',
      category: '数据分析',
      progress: 60,
      duration: '30天',
      lectures: 24,
      image: 'https://picsum.photos/seed/course1/400/200'
    },
    {
      id: 2,
      title: 'SQL从入门到精通',
      category: '数据库',
      progress: 100,
      duration: '15天',
      lectures: 12,
      image: 'https://picsum.photos/seed/course2/400/200'
    },
    {
      id: 3,
      title: 'Tableau可视化实战',
      category: '数据可视化',
      progress: 30,
      duration: '20天',
      lectures: 16,
      image: 'https://picsum.photos/seed/course3/400/200'
    }
  ],
  tasks: [
    {
      id: 1,
      title: '电商用户分析微任务',
      type: '数据标注',
      reward: '50积分',
      deadline: '2025-12-20',
      difficulty: '初级',
      image: 'https://picsum.photos/seed/task1/100/100'
    },
    {
      id: 2,
      title: '为本地奶茶店写抖音脚本',
      type: '内容创作',
      reward: '100积分',
      deadline: '2025-12-25',
      difficulty: '中级',
      image: 'https://picsum.photos/seed/task2/100/100'
    },
    {
      id: 3,
      title: '标注AI训练数据',
      type: '数据标注',
      reward: '150积分',
      deadline: '2025-12-30',
      difficulty: '初级',
      image: 'https://picsum.photos/seed/task3/100/100'
    }
  ],
  achievements: [
    {
      id: 1,
      title: 'SQL掌握证书',
      type: '证书',
      date: '2025-11-15',
      image: 'https://picsum.photos/seed/achievement1/100/100'
    },
    {
      id: 2,
      title: '数据分析项目完成',
      type: '项目',
      date: '2025-12-01',
      image: 'https://picsum.photos/seed/achievement2/100/100'
    },
    {
      id: 3,
      title: '学习达人徽章',
      type: '徽章',
      date: '2025-12-10',
      image: 'https://picsum.photos/seed/achievement3/100/100'
    }
  ]
}

// 今日推荐数据
export const todayRecommendations = [
  {
    id: 1,
    title: '完成“电商用户分析”微任务',
    type: '任务',
    priority: '高',
    description: '帮助电商平台分析用户购买行为，提升转化率',
    link: '/growth-center'
  },
  {
    id: 2,
    title: '学习Tableau可视化课程',
    type: '课程',
    priority: '中',
    description: '掌握数据可视化技能，提升数据分析能力',
    link: '/growth-center'
  },
  {
    id: 3,
    title: '更新你的职业倾向评估',
    type: '测评',
    priority: '低',
    description: '重新评估你的职业倾向，获取更准确的推荐',
    link: '#'
  }
]