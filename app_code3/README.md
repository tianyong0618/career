# VenturePilot创业智能体合伙人MVP

一个基于Vue 3和Vite开发的创业智能体合伙人系统，帮助创业者全方位管理创业过程，包括健康度监测、融资规划、政策匹配等核心功能。

## 功能特性

### 核心功能
- **创业健康度看板**：多维度监测创业健康状况，包括现金流、政策利用率和风险评估
- **融资路径规划**：根据企业阶段规划融资路线，包括股权结构设计和投资人推荐
- **政策匹配**：智能匹配适合企业的政府政策和补贴
- **商业计划书生成**：快速生成专业的商业计划书
- **风险预警**：实时监测和预警潜在风险
- **PDF报告导出**：支持导出创业健康度报告，包含核心指标和分析

### 辅助功能
- **AI导师**：提供创业相关的智能建议和指导
- **资源撮合**：对接创业所需的各类资源
- **创业进展跟踪**：记录和展示创业里程碑和进展情况
- **快捷行动区**：快速访问各项核心功能

## 技术栈

- **前端框架**：Vue 3 + Vite
- **路由管理**：Vue Router 4
- **图表库**：Chart.js
- **PDF导出**：jsPDF + html2canvas
- **构建工具**：Vite 7
- **部署方式**：IPFS (通过pinme工具)

## 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

开发服务器将在 http://localhost:5532/ 启动

## 构建和部署

### 构建生产版本
```bash
npm run build
```

构建结果将输出到 `dist` 目录

### 部署到IPFS
```bash
# 安装pinme工具（如果未安装）
npm install -g pinme

# 上传dist目录到IPFS
pinme upload dist
```

### 访问链接
- **预览URL**：https://pinme.eth.limo/#/preview/U2FsdGVkX18YhE2Vs9FiNBrppbz-GGlfvC-l8SEbgrVpp65wCXzzEDvduCdoQnvArNBYc0nXvOQv3r0Dwm8sLXMMdWvxNOQtTHuZRBG6xltRq-UtBWYMi6n3ViN26BV7LyJ--ZIp7lNK4vzQr1vL3Q
- **站点URL**：https://314686fa.pinit.eth.limo/

IPFS部署后可能需要约2分钟时间同步到网关，之后即可通过上述链接访问。

## 项目结构

```
app_code3/
├── src/
│   ├── assets/          # 静态资源文件
│   ├── components/      # 通用组件
│   ├── data/            # 模拟数据
│   ├── router/          # 路由配置
│   ├── views/           # 页面组件
│   │   ├── Dashboard.vue           # 主仪表盘
│   │   ├── HealthDashboard.vue     # 健康度看板
│   │   ├── FinancingPath.vue       # 融资路径规划
│   │   ├── BizPlanGen.vue          # 商业计划书生成
│   │   ├── AITutor.vue             # AI导师
│   │   ├── PolicyMatch.vue         # 政策匹配
│   │   ├── RiskAlert.vue           # 风险预警
│   │   └── ResourceHub.vue         # 资源撮合
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── public/              # 公共资源
├── dist/                # 构建输出目录
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
└── README.md            # 项目说明文档
```

## 页面说明

### 1. 首页（Dashboard）
- **创业身份卡**：展示创业者基本信息和标签
- **当前里程碑**：显示创业进展和里程碑
- **创业进展条**：可视化展示创业目标和进度
- **快捷行动区**：快速访问各项核心功能

### 2. 创业健康度看板
- **现金流安全线**：可视化展示近6个月现金流趋势
- **政策红利利用率**：统计政策申请和获批情况
- **风险热力图**：多维度风险评估和可视化
- **PDF导出**：支持导出创业健康度报告

### 3. 融资路径规划
- **企业阶段选择**：选择当前企业发展阶段
- **推荐投资机构**：根据阶段匹配合适的投资机构
- **可申报引导基金**：匹配适合的政府引导基金
- **股权结构设计**：提供股权分配建议
- **融资沙盘模拟**：模拟融资稀释和控制权变化

### 4. 商业计划书生成
- **模板选择**：选择适合行业的BP模板
- **分步生成**：按章节生成商业计划书
- **实时预览**：实时查看生成效果

### 5. AI导师
- **智能问答**：提供创业相关的智能回答
- **建议指导**：基于企业情况提供针对性建议

## 开发说明

### 代码规范
- 使用Vue 3 Composition API和`<script setup>`语法
- 组件命名采用PascalCase
- 变量和函数命名采用camelCase
- 遵循DRY原则，避免重复代码
- 保持函数职责单一，避免过长函数

### 测试
- 建议使用Vitest进行单元测试
- 使用Cypress进行端到端测试

## 许可证

MIT License

## 更新日志

### v1.0.0 (2026-01-05)
- 初始版本发布
- 实现核心功能模块
- 支持PDF报告导出
- 优化快捷行动区布局
- 部署到IPFS

## 联系方式

如有问题或建议，欢迎联系项目团队。

---

**VenturePilot** - 您的创业智能体合伙人