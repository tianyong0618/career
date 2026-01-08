# MyCareer OS - AI驱动的职业合伙人

一个基于Vue 3和Vite构建的AI驱动职业发展平台，帮助用户进行职业规划、技能评估和路径模拟。

## 功能特性

### 1. 职业孪生 (Career Twin)
- 基于全网数据实时生成个人职业镜像
- 能力图谱 (Career Radar) 可视化展示
- 技能云图分析
- 今日推荐行动任务

### 2. 路径沙盒 (Path Sandbox)
- 职业目标设定与路径生成
- 模拟未来职业发展可能性
- 路径对比与成功率分析

### 3. 成长中心 (Growth Hub)
- 将目标转化为可执行任务流
- 成长数据概览
- 成就墙展示

### 4. AI测评 (AI Assessment)
- 科学的职业倾向测评
- 多维度能力分析
- 个性化职业建议

### 5. 生成镜像 (Onboarding)
- 身份选择
- 快速画像生成
- 数据融合与处理

### 6. AI经纪人 (AI Agent)
- 自动沟通与谈判
- 智能投递
- 信用资产管理

## 技术栈

- **前端框架**: Vue 3 + Vite
- **构建工具**: Vite 7.2.7
- **样式**: CSS3 + CSS变量
- **动画**: CSS animations + Font Awesome
- **状态管理**: localStorage
- **路由**: Vue Router
- **部署**: IPFS via PinMe

## 项目结构

```
web_code2/
├── src/
│   ├── components/          # 组件目录
│   │   ├── Layout.vue       # 布局组件
│   │   ├── SideNav.vue      # 侧边导航
│   │   ├── AIAgentPanel.vue # AI经纪人面板
│   │   ├── RadarChart.vue   # 雷达图组件
│   │   ├── SkillCloud.vue   # 技能云图组件
│   │   ├── PathGenerator.vue # 路径生成器
│   │   └── GrowthTasks.vue  # 成长任务组件
│   ├── views/              # 页面视图
│   │   ├── Home.vue        # 职业孪生
│   │   ├── PathSandbox.vue # 路径沙盒
│   │   ├── GrowthCenter.vue # 成长中心
│   │   ├── AIAssessment.vue # AI测评
│   │   ├── Onboarding.vue  # 生成镜像
│   │   └── AIPartner.vue   # AI合伙人
│   ├── assets/             # 资源目录
│   │   └── styles/         # 样式文件
│   ├── router.js           # 路由配置
│   └── main.js             # 入口文件
├── dist/                   # 构建产物
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
└── README.md               # 项目说明
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目特点

- **响应式设计**: 适配不同屏幕尺寸
- **现代UI**: 深色主题与流畅动画
- **模块化架构**: 组件化设计，易于维护
- **AI驱动**: 智能职业建议与分析
- **实时数据**: 基于用户输入生成个性化内容
- **IPFS部署**: 去中心化存储，访问更安全

## 核心功能亮点

1. **三栏布局**: 左侧导航(15%)、中间内容(60%)、右侧AI面板(25%)
2. **能力雷达图**: 多维度技能评估可视化
3. **职业路径模拟**: 智能生成职业发展路径
4. **AI测评系统**: 科学的职业倾向分析
5. **数据融合处理**: 多源数据整合与分析
6. **信用资产管理**: 职业信用评分与提升建议

## 部署信息

项目已部署到IPFS网络，可通过以下链接访问：
- **预览链接**: https://pinme.eth.limo/#/preview/U2FsdGVkX18N-U3zHGK9lh47xjwmz-ZMnwMzVj2ATF5_YPwlHJXobnWjoRoSDGgMcUjPlKbpC5X9WzQPZ_o-jiSaz8exdCfl8Z0xbSrzOntcc5pRKeZ2sdnbsq39vZfX4nND4OszvdX4WAHOcdo1KQ
- **站点链接**: https://346939d8.pinit.eth.limo

## 技术支持

如需技术支持或有任何问题，请联系项目维护者。

---

© 2026 MyCareer OS. All rights reserved.