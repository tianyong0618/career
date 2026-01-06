# 创业健康度监测系统

一个基于Vue 3和Vite开发的创业健康度监测与管理系统，帮助创业者实时掌握企业运营状况，包括现金流、政策红利利用率和风险评估等核心指标。

## 功能特性

### 核心功能
- **现金流安全线监测**：可视化展示近6个月现金流趋势，与安全线对比分析
- **政策红利利用率**：统计可申请政策总数、已申请数、已获批数和利用率
- **风险热力图**：多维度风险评估，包括市场风险、财务风险、政策风险等
- **创业进展跟踪**：记录和展示创业里程碑和进展情况
- **PDF报告导出**：支持导出创业健康度报告，包含核心指标和分析

### 辅助功能
- **AI导师**：提供创业相关的智能建议和指导
- **融资路径规划**：根据企业情况规划融资路线图
- **政策匹配**：智能匹配适合企业的政府政策
- **风险预警**：实时监测和预警潜在风险
- **资源撮合**：对接创业所需的各类资源

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

开发服务器将在 http://localhost:5531/ 启动

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
- **预览URL**：https://pinme.eth.limo/#/preview/U2FsdGVkX1-gCDMl71_TlKHkWYEWo8mrSfIQLMGr-_wGDva_7oOUAbdJy9GKsFX2Ach-jkxhaNSHO3Gxu0PprJIspUR_cZuPxTIUooqOOaM9n_5wrtwGdqh_eHfTfu5wIqREzlHoJkzBqFtJHawmxA
- **站点URL**：https://179b8bc6.pinit.eth.limo

IPFS部署后可能需要约2分钟时间同步到网关，之后即可通过上述链接访问。

## 项目结构

```
web_code3/
├── src/
│   ├── assets/          # 静态资源文件
│   │   ├── styles/      # 全局样式
│   │   └── fonts/       # 字体文件
│   ├── components/      # 通用组件
│   ├── data/            # 模拟数据
│   ├── mock/            # 模拟数据
│   ├── router/          # 路由配置
│   ├── views/           # 页面组件
│   │   ├── Dashboard.vue           # 主仪表盘
│   │   ├── HealthDashboard.vue     # 健康度看板
│   │   ├── BizPlanGen.vue          # 商业计划书生成
│   │   ├── AITutor.vue             # AI导师
│   │   └── ...
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

### 1. 创业健康度看板
- **现金流安全线**：展示近6个月现金流趋势，与安全线对比
- **政策红利利用率**：统计政策申请和获批情况
- **风险热力图**：多维度风险评估和可视化

### 2. 商业计划书生成
- 分步生成商业计划书
- 支持多种格式导出
- 实时预览和编辑

### 3. AI导师
- 智能问答系统
- 创业建议和指导
- 资源推荐

### 4. 融资路径规划
- 融资阶段划分
- 融资策略建议
- 投资人匹配

## 开发说明

### 代码规范
- 使用Vue 3 Composition API和`<script setup>`语法
- 遵循ESLint和Prettier代码规范
- 组件命名采用PascalCase
- 变量和函数命名采用camelCase

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
- 部署到IPFS

## 联系方式

如有问题或建议，欢迎联系项目团队。

---

**创业健康度监测系统** - 助力创业者健康成长