# MyCareer OS - 个人职业操作系统

## 项目简介

MyCareer OS 是一个个人职业操作系统，旨在帮助用户管理职业发展，提供个性化的职业建议和成长路径。

## 核心功能

1. **AI经纪人**：提供专业的职业发展建议和指导
2. **成长中心**：包含学习课程、微任务和成就系统
3. **职业画像**：快速生成个人职业镜像
4. **路径沙盒**：职业发展路径模拟和规划
5. **冷启动流程**：新用户引导和身份选择

## 技术栈

- Vue 3 + Vite
- JavaScript
- CSS3

## 项目结构

```
app_code2/
├── public/              # 静态资源
├── src/
│   ├── assets/          # 资源文件
│   │   ├── mock/        # 模拟数据
│   │   └── styles/      # 样式文件
│   ├── components/      # 组件
│   ├── views/           # 页面
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   ├── router.js        # 路由配置
│   └── style.css        # 全局样式
├── index.html           # HTML模板
├── package.json         # 项目配置
└── vite.config.js       # Vite配置
```

## 主要修改记录

1. **AI经纪人组件**：
   - 将"AI职业合伙人"改为"AI经纪人"
   - 更新了相关的介绍文本

2. **成长中心**：
   - 优化了任务卡片的样式，使其更加现代简约
   - 调整了布局结构，提升用户体验

3. **冷启动页面**：
   - 修复了分割线显示问题
   - 优化了页面布局，使其更加紧凑
   - 增强了视觉效果和用户体验

4. **响应式设计**：
   - 优化了移动端显示效果
   - 确保在不同设备上都有良好的用户体验

## 构建与发布

### 构建项目
```bash
npm run build
```

### 发布到 IPFS
```bash
pinme upload dist
```

## 发布记录

### 最新发布
- **日期**：2026-01-08
- **版本**：v1.0.0
- **预览URL**：https://pinme.eth.limo/#/preview/U2FsdGVkX18wYUisxPnUepVp0TB2uclylH4jwOHwoX2vERMCRLeTqlyQssZ3MOAtua2CPbE2R2FYbjyXhJGQDt1DtLeTjBcpVOXPSTc9ZMvG612uZY4oDs2afjvLZEzd_D5QzQTZbtdvBbnhSgGJIQ
- **站点URL**：https://ba590dfc.pinit.eth.limo
## 开发命令

### 安装依赖
```bash
npm install
```

### 开发服务器
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

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！
