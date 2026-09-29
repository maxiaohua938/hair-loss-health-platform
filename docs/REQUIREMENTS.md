# 防脱发健康管理平台 - 需求文档

## 项目概述

**项目名称**: Hair Loss Health Platform（防脱发健康管理平台）

**项目定位**: 一个综合性的个人健康管理工具，帮助用户追踪睡眠、管理用药，并提供防脱发知识科普。未来逐步演变为社交分享平台。

**核心目标用户**: 面临脱发困扰的用户，需要规律作息和按时用药的人群。

---

## 功能需求清单

### Phase 1: MVP（最小可行产品）- 个人健康管理工具

#### 1.1 用户管理模块
- [x] 用户注册（邮箱/用户名 + 密码）
- [x] 用户登录
- [x] 个人信息完善（昵称、性别、年龄、脱发情况等）
- [x] 密码修改
- [x] 退出登录

#### 1.2 睡眠打卡模块
- [x] 每日睡眠时间记录
  - 入睡时间和起床时间录入
  - 或直接输入睡眠时长（小时）
  - 支持备注（如"睡眠质量：良好"）
- [x] 打卡历史查看
- [x] 睡眠数据可视化
  - 周图表：过去7天睡眠时长对比
  - 月图表：过去30天睡眠趋势
  - 统计数据：平均睡眠时长、最长/最短睡眠
- [x] 打卡提醒（可选设置每晚提醒时间）

#### 1.3 服药提醒模块
- [x] 新增用药计划
  - 药品名称、剂量、用法
  - 设定提醒时间（支持多个时间点）
  - 设定用药周期（每日/每周/自定义）
  - 用药开始日期和结束日期
- [x] 弹窗提醒
  - 当到达设定时间时，页面弹出提醒
  - 用户可选择"已服药"或"稍后提醒"
- [x] 用药打卡记录
  - 记录实际服药时间
  - 标记漏服情况
- [x] 用药历史查看
  - 统计本周/本月用药完成率
  - 柱状图展示用药完成情况
- [x] 用药计划管理
  - 编辑、删除、暂停用药计划

#### 1.4 防脱发科普模块
- [x] 科普文章列表
  - 脱发原因科普
  - 防脱方法建议
  - 用药指南
  - 生活习惯调整
- [x] 文章详情页
- [x] 收藏功能（用户可收藏感兴趣的文章）

#### 1.5 个人数据统计与导出
- [x] 统计仪表板
  - 本周睡眠统计
  - 本周用药完成率
  - 打卡天数统计
- [x] 数据导出
  - 支持导出PDF报告
  - 包含睡眠、用药、打卡等数据汇总
  - 可用于分享给医生

#### 1.6 响应式设计
- [x] PC端（1920px及以上）
- [x] 平板端（768px - 1024px）
- [x] 手机端（320px - 767px）

---

### Phase 2: 社交分享功能（后续迭代）

- [ ] 用户发布防脱经验分享
- [ ] 社区话题讨论
- [ ] 点赞、评论、收藏分享内容
- [ ] 用户关注功能
- [ ] 排行榜（坚持打卡排名、用药坚持度排名）

---

## 技术架构

### 前端技术栈
- **框架**: React 18.x
- **样式**: Tailwind CSS / Ant Design
- **数据管理**: Redux Toolkit
- **HTTP客户端**: Axios
- **图表库**: Chart.js 或 ECharts
- **通知库**: react-toastify 或 antd notification
- **PDF导出**: jsPDF + html2canvas

### 后端技术栈
- **运行环境**: Node.js
- **框架**: Express.js
- **数据库**: MySQL 8.0+
- **ORM**: Sequelize 或 TypeORM
- **认证**: JWT (JSON Web Token)
- **密码加密**: bcrypt
- **任务调度**: node-cron（用于定时检查提醒时间）
- **PDF生成**: pdfkit

### 部署方案
- **前端**: 可部署到 Vercel / Netlify / GitHub Pages
- **后端**: 可部署到云服务器（阿里云、腾讯云、Heroku等）或本地服务器
- **数据库**: MySQL 可部署到云数据库服务或本地

---

## 数据库设计

### 用户表 (users)
```
- id: INT PRIMARY KEY AUTO_INCREMENT
- username: VARCHAR(50) UNIQUE NOT NULL
- email: VARCHAR(100) UNIQUE NOT NULL
- password: VARCHAR(255) NOT NULL (bcrypt加密)
- nickname: VARCHAR(100)
- avatar: VARCHAR(255)
- gender: ENUM('male', 'female', 'other')
- age: INT
- hairLossStatus: VARCHAR(200) (脱发情况描述)
- createdAt: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updatedAt: TIMESTAMP
```

### 睡眠记录表 (sleep_records)
```
- id: INT PRIMARY KEY AUTO_INCREMENT
- userId: INT NOT NULL FOREIGN KEY
- recordDate: DATE NOT NULL
- bedTime: TIME (入睡时间)
- wakeTime: TIME (起床时间)
- sleepDuration: DECIMAL(5,2) (睡眠时长，小时)
- quality: VARCHAR(50) (睡眠质量描述)
- notes: TEXT
- createdAt: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updatedAt: TIMESTAMP
- UNIQUE(userId, recordDate)
```

### 用药计划表 (medication_plans)
```
- id: INT PRIMARY KEY AUTO_INCREMENT
- userId: INT NOT NULL FOREIGN KEY
- drugName: VARCHAR(100) NOT NULL
- dosage: VARCHAR(100) NOT NULL (剂量)
- usage: VARCHAR(200) (用法，如"口服")
- remindTimes: JSON (提醒时间数组，如["08:00", "20:00"])
- frequency: VARCHAR(50) NOT NULL (用药频率，如"daily", "weekly")
- frequencyDetails: JSON (频率详情，如周日��数组)
- startDate: DATE NOT NULL
- endDate: DATE (结束日期，NULL表示长期用药)
- isActive: BOOLEAN DEFAULT TRUE
- notes: TEXT
- createdAt: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updatedAt: TIMESTAMP
```

### 用药记录表 (medication_records)
```
- id: INT PRIMARY KEY AUTO_INCREMENT
- userId: INT NOT NULL FOREIGN KEY
- planId: INT NOT NULL FOREIGN KEY
- recordDate: DATE NOT NULL
- remindTime: TIME NOT NULL (原定提醒时间)
- actualTime: TIME (实际服药时间)
- status: ENUM('taken', 'missed', 'pending') NOT NULL (已服药/漏服/待定)
- notes: TEXT
- createdAt: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updatedAt: TIMESTAMP
- UNIQUE(planId, recordDate, remindTime)
```

### 科普文章表 (articles)
```
- id: INT PRIMARY KEY AUTO_INCREMENT
- title: VARCHAR(200) NOT NULL
- category: VARCHAR(50) (分类，如"脱发原因"、"防脱方法"、"用药指南")
- content: LONGTEXT NOT NULL
- author: VARCHAR(100)
- coverImage: VARCHAR(255)
- tags: JSON (标签数组)
- createdAt: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updatedAt: TIMESTAMP
```

### 用户收藏表 (user_favorites)
```
- id: INT PRIMARY KEY AUTO_INCREMENT
- userId: INT NOT NULL FOREIGN KEY
- articleId: INT NOT NULL FOREIGN KEY
- createdAt: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- UNIQUE(userId, articleId)
```

---

## API 设计概览

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/user` - 获取当前用户信息

### 用户信息相关
- `GET /api/user/profile` - 获取用户个人信息
- `PUT /api/user/profile` - 更新用户个人信息
- `PUT /api/user/password` - 修改密码

### 睡眠打卡相关
- `POST /api/sleep/record` - 新增睡眠记录
- `GET /api/sleep/records?startDate=&endDate=` - 获取睡眠记录列表
- `GET /api/sleep/records/:id` - 获取单条睡眠记录
- `PUT /api/sleep/records/:id` - 更新睡眠记录
- `DELETE /api/sleep/records/:id` - 删除睡眠记录
- `GET /api/sleep/stats?period=week|month` - 获取睡眠统计数据

### 用药提醒相关
- `POST /api/medication/plans` - 新增用药计划
- `GET /api/medication/plans` - 获取用药计划列表
- `GET /api/medication/plans/:id` - 获取单个用药计划
- `PUT /api/medication/plans/:id` - 更新用药计划
- `DELETE /api/medication/plans/:id` - 删除用药计划
- `POST /api/medication/records` - 新增用药记录
- `GET /api/medication/records?startDate=&endDate=` - 获取用药记录列表
- `PUT /api/medication/records/:id` - 更新用药记录
- `GET /api/medication/stats?period=week|month` - 获取用药统计数据
- `GET /api/medication/today-reminders` - 获取今天的用药提醒列表

### 科普文章相关
- `GET /api/articles` - 获取文章列表（分页、分类筛选）
- `GET /api/articles/:id` - 获取文章详情
- `POST /api/user/favorites/:articleId` - 收藏文章
- `DELETE /api/user/favorites/:articleId` - 取消收藏
- `GET /api/user/favorites` - 获取用户收藏列表

### 数据导出相关
- `GET /api/export/pdf?startDate=&endDate=` - 导出PDF报告

---

## 页面结构设计

### 页面树

```
├── 登录页 (Login)
├── 注册页 (Register)
├── 忘记密码页 (Forgot Password)
├── 首页/仪表板 (Dashboard)
│   ├── 本周睡眠统计卡片
│   ├── 本周用药完成率卡片
│   ├── 打卡天数统计卡片
│   └── 快速操作按钮（新增睡眠、新增用药）
├── 睡眠管理 (Sleep)
│   ├── 今日睡眠打卡表单
│   ├── 睡眠历史列表
│   ├── 睡眠统计图表（周/月）
│   └── 睡眠提醒设置
├── 服药提醒 (Medication)
│   ├── 用药计划列表
│   ├── 新增/编辑用药计划表单
│   ├── 用药记录列表
│   ├── 用药统计图表（周/月）
│   └── 今日用药提醒（弹窗）
├── 防脱科普 (Articles)
│   ├── 科普文章列表（分类筛选）
│   ├── 文章详情页
│   └── 我的收藏
├── 个人中心 (Profile)
│   ├── 个人信息编辑
│   ├── 密码修改
│   ├── 数据统计仪表板
│   ├── 数据导出（PDF）
│   └── 设置页面
└── 404 / 错误页面
```

---

## 非功能性需求

1. **性能**
   - 页面加载时间 < 3s
   - API响应时间 < 500ms

2. **安全性**
   - 所有密码使用bcrypt加密
   - 使用JWT进行身份认证
   - HTTPS加密通信
   - SQL注入防护（使用ORM）
   - CSRF防护

3. **可用性**
   - 完整的错误提示和验证反馈
   - 响应式设计支持多设备
   - 无障碍设计（ARIA标签等）

4. **可维护性**
   - 代码结构清晰，模块化设计
   - 详细的API文档
   - 单元测试覆盖关键功能

---

## 优先级排列

**Priority 1 (必须)**:
- 用户注册/登录
- 睡眠打卡（记录和查看）
- 用药提醒（设置和打卡）
- 弹窗提醒功能

**Priority 2 (重要)**:
- 数据统计图表
- 用药/睡眠历史查看
- 个人信息管理
- 防脱科普文章

**Priority 3 (可选)**:
- 数据导出PDF
- 用药提醒设置微调
- 排行榜和社交功能

---

## 开发时间预估

| 模块 | 预估时间 |
|------|--------|
| 项目初始化和基础框架 | 2-3天 |
| 用户认证模块 | 2-3天 |
| 睡眠打卡模块 | 3-4天 |
| 用药提醒模块 | 4-5天 |
| 防脱科普模块 | 2-3天 |
| 数据统计与导出 | 2-3天 |
| 响应式设计优化 | 2-3天 |
| 测试和调试 | 3-4天 |
| **总计** | **约20-30天** |

---

## 下一步行动

1. ✅ 需求文档确认
2. ⬜ 页面框架搭建（原型设计）
3. ⬜ 数据库脚本编写
4. ⬜ 项目文件结构初始化
5. ⬜ 前后端代码开发
6. ⬜ 测试和部署

