// 模拟数据
export const mockData = {
  // 创业概况数据
  startupProfile: {
    name: "张三",
    avatar: "https://via.placeholder.com/100",
    tags: ["餐饮初创", "在筹备阶段", "目标区域：XX区"],
    milestones: ["已完成BP初稿", "正在申请政府补贴"],
    progress: {
      mainGoal: "完成首轮融资",
      steps: [
        { name: "BP初稿", completed: true },
        { name: "政策匹配", completed: true },
        { name: "投资人评审", completed: false }
      ],
      hint: "还需完善财务预测部分"
    }
  },

  // 政策匹配数据
  policies: [
    {
      id: 1,
      name: "XX区餐饮企业开业补贴",
      amount: "最高5万元",
      deadline: "2026年3月",
      description: "对在XX区新开设的餐饮企业提供开业补贴，最高5万元",
      requirements: ["营业执照注册时间在6个月内", "经营面积≥50㎡"],
      applicationSteps: ["准备材料", "在线申请", "审核", "拨款"]
    },
    {
      id: 2,
      name: "大学生创业扶持计划",
      amount: "2-10万元",
      deadline: "2025年12月",
      description: "为毕业5年内大学生创业提供资金支持",
      requirements: ["毕业5年内", "注册资本≤500万元"],
      applicationSteps: ["提交创业计划书", "路演", "评审", "签约"]
    },
    {
      id: 3,
      name: "小微企业税收减免",
      amount: "减免50%增值税",
      deadline: "长期有效",
      description: "对符合条件的小微企业减免50%增值税",
      requirements: ["年销售额≤500万元", "员工人数≤30人"],
      applicationSteps: ["资格认定", "申报", "审核", "享受政策"]
    }
  ],

  // 风险预警数据
  risks: [
    {
      id: 1,
      type: "竞品动态",
      level: "中",
      message: "您所在商圈新增3家同类店铺，建议调整定价策略",
      suggestions: ["考虑引入外卖平台，增加销售渠道", "优化库存管理，减少浪费"]
    },
    {
      id: 2,
      type: "现金流",
      level: "高",
      message: "您的现金流连续两个月呈负增长，建议优化成本结构",
      suggestions: ["减少不必要的开支", "与供应商协商账期", "考虑短期贷款"]
    },
    {
      id: 3,
      type: "行业趋势",
      level: "低",
      message: "健康轻食市场增长放缓，建议拓展产品线",
      suggestions: ["增加健康饮品选项", "推出季节性套餐", "开展会员活动"]
    }
  ],

  // 资源匹配数据
  resources: {
    partners: [
      { id: 1, name: "李四", expertise: "餐饮运营", experience: "10年", matchScore: 95 },
      { id: 2, name: "王五", expertise: "品牌策划", experience: "8年", matchScore: 90 },
      { id: 3, name: "赵六", expertise: "供应链管理", experience: "12年", matchScore: 88 }
    ],
    mentors: [
      { id: 1, name: "钱七", expertise: "餐饮连锁", experience: "15年", matchScore: 98 },
      { id: 2, name: "孙八", expertise: "互联网+餐饮", experience: "9年", matchScore: 92 },
      { id: 3, name: "周九", expertise: "融资辅导", experience: "13年", matchScore: 94 }
    ],
    investors: [
      { id: 1, name: "投资机构A", focus: "餐饮消费", investmentRange: "50-500万", matchScore: 96 },
      { id: 2, name: "投资机构B", focus: "初创企业", investmentRange: "10-100万", matchScore: 91 },
      { id: 3, name: "天使投资人C", focus: "餐饮连锁", investmentRange: "5-50万", matchScore: 93 }
    ]
  },

  // 商业计划书模板数据
  bpTemplate: {
    companyInfo: {
      name: "XX健康轻食",
      description: "专注于提供健康、新鲜的轻食产品，适合现代都市人群",
      industry: "餐饮",
      stage: "筹备阶段"
    },
    marketAnalysis: {
      industryOverview: "健康轻食市场年增长率达20%，预计2025年市场规模将突破1000亿元",
      targetAudience: "20-40岁都市白领、健身爱好者、注重健康的消费人群",
      competitors: [
        { name: "轻食品牌A", strength: "品牌知名度高", weakness: "价格较高" },
        { name: "轻食品牌B", strength: "产品线丰富", weakness: "配送范围有限" },
        { name: "轻食品牌C", strength: "性价比高", weakness: "产品创新不足" }
      ]
    },
    productService: {
      products: ["健康沙拉", "谷物碗", "果汁饮品", "健身餐"],
      features: ["新鲜食材", "营养均衡", "定制化", "快速配送"]
    },
    businessModel: {
      revenueStreams: ["堂食销售", "外卖配送", "企业团餐", "零售产品"],
      costStructure: ["食材成本", "人力成本", "租金成本", "营销成本"],
      pricingStrategy: "中端定价，性价比优先"
    },
    financialForecast: {
      year1: { revenue: "50万", profit: "-10万" },
      year2: { revenue: "150万", profit: "20万" },
      year3: { revenue: "300万", profit: "80万" }
    }
  },

  // AI聊天回复模板
  aiResponses: [
    {
      question: "我想开一家奶茶店，能拿多少补贴？",
      answer: "1. 展示政策匹配引擎链接\n2. 推荐相关成功案例\n3. 提供开店初期预算估算",
      actions: [{ type: "navigate", target: "/policy-match" }]
    },
    {
      question: "我需要一份详细的市场调研报告",
      answer: "调用市场洞察引擎 → 返回行业趋势、竞品分析报告",
      actions: [{ type: "navigate", target: "/biz-plan-gen" }]
    },
    {
      question: "帮我找一位有餐饮经验的合伙人",
      answer: "调用资源撮合Marketplace → 返回3个高匹配候选人",
      actions: [{ type: "navigate", target: "/resource-hub" }]
    }
  ]
};
