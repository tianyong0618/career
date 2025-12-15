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
      location: '北京市'
    },
    {
      id: 2,
      name: '王五',
      avatar: 'https://picsum.photos/id/3/200/200',
      experience: '5年餐饮供应链管理经验',
      skill: '供应链管理',
      location: '上海市'
    }
  ],
  mentors: [
    {
      id: 1,
      name: '赵六',
      avatar: 'https://picsum.photos/id/4/200/200',
      title: '餐饮行业专家',
      experience: '20年餐饮行业经验，曾任知名连锁餐饮品牌CEO',
      rating: 4.8
    },
    {
      id: 2,
      name: '孙七',
      avatar: 'https://picsum.photos/id/5/200/200',
      title: '创业导师',
      experience: '15年创业指导经验，辅导过50+成功项目',
      rating: 4.9
    }
  ],
  investors: [
    {
      id: 1,
      name: '投资机构A',
      avatar: 'https://picsum.photos/id/6/200/200',
      focus: '餐饮、零售',
      investmentStage: '种子轮、天使轮',
      investmentAmount: '100万-500万'
    },
    {
      id: 2,
      name: '投资人B',
      avatar: 'https://picsum.photos/id/7/200/200',
      focus: '消费升级',
      investmentStage: '天使轮、A轮',
      investmentAmount: '500万-2000万'
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
