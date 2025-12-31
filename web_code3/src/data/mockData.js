// 模拟数据 - VenturePilot创业智能体合伙人MVP

// 用户创业概况数据
export const userProfile = {
  name: '张三',
  avatar: 'https://picsum.photos/id/1/200/200',
  tags: ['餐饮初创', '在筹备阶段', '目标区域：北京市朝阳区'],
  currentMilestone: ['已完成BP初稿', '正在申请政府补贴'],
  mainGoal: '完成首轮融资',
  progress: [
    { name: 'BP初稿', completed: true },
    { name: '政策匹配', completed: true },
    { name: '投资人评审', completed: false }
  ],
  hint: '还需完善财务预测部分'
};

// 政策匹配数据
export const policies = [
  {
    id: 1,
    title: '北京市朝阳区餐饮企业开业补贴',
    description: '对新开设的餐饮企业提供最高5万元的开业补贴',
    type: '政府补贴',
    deadline: '2026-03-31',
    eligibility: '朝阳区注册的餐饮企业，成立时间不超过6个月',
    applicationSteps: [
      '准备营业执照、租赁合同等材料',
      '登录朝阳区政务服务网提交申请',
      '等待审核，预计15个工作日',
      '审核通过后，补贴资金将打入企业账户'
    ],
    amount: '最高5万元'
  },
  {
    id: 2,
    title: '大学生创业税收优惠政策',
    description: '毕业5年内的大学生创业，可享受3年免征企业所得税',
    type: '税收优惠',
    deadline: '长期有效',
    eligibility: '毕业5年内的大学生，创办的小型微利企业',
    applicationSteps: [
      '准备毕业证、营业执照等材料',
      '向税务部门申请税收优惠备案',
      '备案通过后，即可享受税收优惠'
    ],
    amount: '3年免征企业所得税'
  },
  {
    id: 3,
    title: '创业园区入驻优惠',
    description: '符合条件的初创企业，可享受3个月免租金入驻创业园区',
    type: '创业园区',
    deadline: '2025-12-31',
    eligibility: '科技、文创类初创企业，团队规模不超过10人',
    applicationSteps: [
      '提交企业计划书',
      '参加园区评审',
      '评审通过后，签订入驻协议'
    ],
    amount: '3个月免租金'
  }
];

// 风险预警数据
export const risks = [
  {
    id: 1,
    title: '竞品增加风险',
    description: '您所在商圈新增3家同类店铺',
    level: '中等',
    recommendation: '建议调整定价策略，增加差异化服务',
    category: '市场风险'
  },
  {
    id: 2,
    title: '现金流风险',
    description: '您的现金流连续两个月呈负增长',
    level: '高',
    recommendation: '考虑引入外卖平台，增加销售渠道；优化库存管理，减少浪费',
    category: '财务风险'
  },
  {
    id: 3,
    title: '政策变化风险',
    description: '近期餐饮行业卫生检查标准可能提高',
    level: '低',
    recommendation: '提前了解新的卫生标准，做好准备工作',
    category: '政策风险'
  }
];

// 资源撮合数据
export const resources = {
  partners: [
    {
      id: 1,
      name: '李四',
      avatar: 'https://picsum.photos/id/2/200/200',
      experience: '10年餐饮行业经验，曾创办3家成功餐厅',
      skill: '运营管理',
      location: '北京市',
      tags: ['餐饮运营', '团队管理', '成本控制']
    },
    {
      id: 2,
      name: '王五',
      avatar: 'https://picsum.photos/id/3/200/200',
      experience: '5年餐饮供应链管理经验',
      skill: '供应链管理',
      location: '上海市',
      tags: ['食材采购', '供应链优化', '成本核算']
    }
  ],
  mentors: [
    {
      id: 1,
      name: '赵六',
      avatar: 'https://picsum.photos/id/4/200/200',
      title: '餐饮行业专家',
      experience: '20年餐饮行业经验，曾任知名连锁餐饮品牌CEO',
      rating: 4.8,
      location: '北京市',
      tags: ['连锁经营', '品牌战略', '市场营销']
    },
    {
      id: 2,
      name: '孙七',
      avatar: 'https://picsum.photos/id/5/200/200',
      title: '创业导师',
      experience: '15年创业指导经验，辅导过50+成功项目',
      rating: 4.9,
      location: '广州市',
      tags: ['创业规划', '融资指导', '团队建设']
    }
  ],
  investors: [
    {
      id: 1,
      name: '投资机构A',
      avatar: 'https://picsum.photos/id/6/200/200',
      title: '风险投资机构',
      focus: '餐饮、零售',
      investmentStage: '种子轮、天使轮',
      investmentAmount: '100万-500万',
      location: '北京市',
      tags: ['餐饮投资', '消费升级', '种子轮']
    },
    {
      id: 2,
      name: '投资人B',
      avatar: 'https://picsum.photos/id/7/200/200',
      title: '天使投资人',
      focus: '消费升级',
      investmentStage: '天使轮、A轮',
      investmentAmount: '500万-2000万',
      location: '上海市',
      tags: ['消费赛道', 'A轮融资', '品牌孵化']
    }
  ]
};

// 商业计划书模板数据
export const bpTemplates = [
  {
    id: 1,
    name: '餐饮行业标准版',
    sections: [
      '公司简介',
      '市场分析',
      '产品/服务描述',
      '商业模式画布',
      '财务预测模型'
    ]
  },
  {
    id: 2,
    name: '电商行业标准版',
    sections: [
      '公司简介',
      '市场分析',
      '产品/服务描述',
      '运营计划',
      '财务预测模型'
    ]
  },
  {
    id: 3,
    name: '科技行业标准版',
    sections: [
      '公司简介',
      '技术优势',
      '市场分析',
      '产品/服务描述',
      '财务预测模型'
    ]
  }
];

// AI导师对话历史数据
export const chatHistory = [
  {
    id: 1,
    role: 'user',
    content: '我想开一家奶茶店，能拿多少补贴？',
    timestamp: '2025-12-10 14:30'
  },
  {
    id: 2,
    role: 'assistant',
    content: '根据您的情况，您可以申请以下补贴：\n1. 北京市朝阳区餐饮企业开业补贴：最高5万元\n2. 大学生创业税收优惠政策：3年免征企业所得税\n\n建议您点击下方的政策匹配按钮，查看详细的申请条件和流程。',
    timestamp: '2025-12-10 14:31',
    actions: [
      { type: 'button', text: '政策匹配', link: '/policy-match' }
    ]
  },
  {
    id: 3,
    role: 'user',
    content: '帮我找一位有餐饮经验的合伙人',
    timestamp: '2025-12-11 09:15'
  },
  {
    id: 4,
    role: 'assistant',
    content: '为您推荐3位具有丰富餐饮行业经验的合伙人：',
    timestamp: '2025-12-11 09:16',
    actions: [
      { type: 'button', text: '查看合伙人', link: '/resource-hub?type=partners' }
    ]
  }
];

// 行业列表数据
export const industries = [
  '餐饮',
  '电商',
  '科技',
  '教育',
  '医疗健康',
  '金融',
  '零售',
  '文化创意',
  '物流',
  '房地产'
];

// 创业阶段数据
export const startupStages = [
  '筹备阶段',
  '种子期',
  '成长期',
  '扩张期'
];

// 监控指标数据
export const monitoringMetrics = [
  '社交媒体情绪',
  '现金流状况',
  '竞品动态',
  '行业趋势',
  '客户满意度',
  '供应链稳定性'
];

// 资源需求类型数据
export const resourceTypes = [
  { value: 'partners', label: '合伙人' },
  { value: 'mentors', label: '导师' },
  { value: 'suppliers', label: '供应商' },
  { value: 'investors', label: '投资人' },
  { value: 'government', label: '政府采购项目' }
];

// 风险雷达图数据
export const riskRadarData = {
  // 综合风险指数 (0-100，越高风险越大)
  overallRiskIndex: 65,
  
  // 风险等级定义
  riskLevels: [
    { level: 'normal', name: '正常', color: '#52c41a', maxValue: 33 },
    { level: 'warning', name: '警告', color: '#faad14', maxValue: 66 },
    { level: 'danger', name: '危险', color: '#f5222d', maxValue: 100 }
  ],
  
  // 各维度风险数据
  dimensions: [
    {
      id: 1,
      name: '社交媒体情绪',
      currentValue: 75,
      thresholds: [33, 66], // 正常(0-33), 警告(34-66), 危险(67-100)
      description: '社交媒体上的品牌情绪分析',
      recommendation: '建议增加正面内容发布，回应负面评论',
      riskLevel: 'danger',
      valueLabel: '负面情绪占比'
    },
    {
      id: 2,
      name: '现金流状况',
      currentValue: 60,
      thresholds: [33, 66],
      description: '企业现金流健康状况',
      recommendation: '考虑优化成本结构，增加融资渠道',
      riskLevel: 'warning',
      valueLabel: '现金流压力指数'
    },
    {
      id: 3,
      name: '竞品动态',
      currentValue: 55,
      thresholds: [33, 66],
      description: '竞争对手的市场活动',
      recommendation: '建议调整定价策略，增加差异化服务',
      riskLevel: 'warning',
      valueLabel: '竞品威胁指数'
    },
    {
      id: 4,
      name: '行业趋势',
      currentValue: 45,
      thresholds: [33, 66],
      description: '行业整体发展趋势',
      recommendation: '关注行业政策变化，调整发展战略',
      riskLevel: 'warning',
      valueLabel: '行业风险指数'
    }
  ]
};

// 融资相关数据

// 投资机构数据
export const investmentInstitutions = [
  {
    id: 1,
    name: '红杉资本中国',
    focus: '消费互联网、企业服务、硬科技',
    investmentStage: '种子轮、天使轮、A轮',
    investmentAmount: '100万-5000万',
    location: '北京市',
    successCases: ['字节跳动', '美团', '拼多多'],
    description: '全球知名的风险投资机构，专注于早期和成长阶段的科技创新企业'
  },
  {
    id: 2,
    name: '经纬中国',
    focus: '移动互联网、企业服务、医疗健康',
    investmentStage: '天使轮、A轮、B轮',
    investmentAmount: '500万-2亿',
    location: '上海市',
    successCases: ['滴滴出行', '饿了么', '瓜子二手车'],
    description: '专注于中国市场的早期投资机构，注重团队和商业模式'
  },
  {
    id: 3,
    name: '真格基金',
    focus: '消费升级、人工智能、教育科技',
    investmentStage: '种子轮、天使轮',
    investmentAmount: '100万-1000万',
    location: '北京市',
    successCases: ['小红书', '完美日记', '罗辑思维'],
    description: '由徐小平和王强创立的天使投资基金，专注于早期创新创业项目'
  },
  {
    id: 4,
    name: 'IDG资本',
    focus: '互联网、医疗健康、新能源',
    investmentStage: '种子轮、A轮、B轮',
    investmentAmount: '500万-3亿',
    location: '北京市',
    successCases: ['百度', '腾讯', '搜狐'],
    description: '中国最早的外资风险投资机构之一，投资领域广泛'
  },
  {
    id: 5,
    name: '金沙江创投',
    focus: '人工智能、企业服务、消费科技',
    investmentStage: '天使轮、A轮',
    investmentAmount: '300万-2亿',
    location: '北京市',
    successCases: ['滴滴出行', 'ofo', '饿了么'],
    description: '专注于TMT领域的早期投资，以敏锐的行业洞察力著称'
  }
];

// 引导基金数据
export const guidingFunds = [
  {
    id: 1,
    name: '国家中小企业发展基金',
    type: '国家级引导基金',
    supportedStage: '种子轮、天使轮、A轮',
    amount: '最高1000万',
    eligibility: '注册满1年以上，符合国家产业政策的中小企业',
    applicationProcess: [
      '在线填写申请表格',
      '提交商业计划书和财务报表',
      '专家评审',
      '现场答辩',
      '立项并签订协议'
    ],
    deadline: '2026-06-30',
    description: '由中央财政出资设立，用于支持中小企业发展的国家级基金'
  },
  {
    id: 2,
    name: '科技创新引导基金',
    type: '省部级引导基金',
    supportedStage: '种子轮、天使轮',
    amount: '最高500万',
    eligibility: '从事科技创新活动，拥有核心自主知识产权的企业',
    applicationProcess: [
      '提交项目可行性报告',
      '知识产权评估',
      '专家评审',
      '立项审批',
      '资金拨付'
    ],
    deadline: '2026-03-31',
    description: '支持科技创新型企业发展的省级引导基金'
  },
  {
    id: 3,
    name: '创业投资引导基金',
    type: '地市级引导基金',
    supportedStage: '种子轮',
    amount: '最高200万',
    eligibility: '注册在本地，成立时间不超过2年的初创企业',
    applicationProcess: [
      '向当地科技局提交申请',
      '项目路演',
      '评审委员会评审',
      '公示',
      '资金发放'
    ],
    deadline: '2026-09-30',
    description: '由地方政府设立，支持本地初创企业发展的引导基金'
  }
];

// 股权结构建议数据
export const equityStructureSuggestions = {
  '种子轮': {
    founderTeam: '70-80%',
    optionPool: '10-15%',
    investors: '10-20%',
    suggestions: [
      '创始人团队保持绝对控股权',
      '预留适当期权池用于后续团队扩张',
      '选择战略投资人，不仅提供资金还能带来资源',
      '建议采用动态股权分配机制'
    ]
  },
  '天使轮': {
    founderTeam: '60-70%',
    optionPool: '10-15%',
    investors: '15-25%',
    suggestions: [
      '创始人团队仍需保持相对控股权',
      '根据团队贡献调整股权比例',
      '引入专业投资人，提升公司治理水平',
      '明确股权兑现机制，避免团队不稳定'
    ]
  },
  'A轮': {
    founderTeam: '50-60%',
    optionPool: '10-15%',
    investors: '20-30%',
    suggestions: [
      '注意控制权稀释，避免失去公司控制权',
      '建立合理的董事会结构',
      '完善公司治理机制',
      '考虑股权激励计划，吸引优秀人才'
    ]
  }
};
