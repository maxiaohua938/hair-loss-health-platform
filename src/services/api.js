// Mock API service for development
// In production, replace with actual API calls to backend server

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Mock data storage (in real app, this would be on server)
const mockUsers = [
  {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    nickname: 'Test User',
    avatar: 'https://i.pravatar.cc/150?img=1',
    gender: 'male',
    age: 28,
    hairLossStatus: '轻度脱发'
  }
];

const mockArticles = [
  {
    id: 1,
    title: '脱发的主要原因分析',
    category: '脱发原因',
    content: '脱发是现代社会中常见的健康问题。根据医学研究，脱发的主要原因包括：\n\n1. **遗传因素**：约占脱发原因的80%，这是最常见的原因。\n\n2. **压力和焦虑**：长期的精神压力会导致毛囊进入休止期，引发休止期脱发。\n\n3. **不规律的作息**：熬夜、睡眠不足会导致内分泌失调，加重脱发。\n\n4. **营养不足**：缺乏蛋白质、铁、锌等营养元素会影响头发生长。\n\n5. **激素变化**：如甲状腺问题、激素失衡等。\n\n6. **不正确的护理习惯**：频繁烫染、过度洗头等会损伤毛囊。\n\n预防脱发的关键是：养成良好的生活习惯、保证充足睡眠、减少压力、均衡饮食。',
    author: '脱发防治专家',
    coverImage: 'https://via.placeholder.com/400x200?text=Hair+Loss+Causes',
    tags: ['脱发原因', '医学知识', '预防'],
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: '如何建立科学的防脱发日常护理',
    category: '防脱方法',
    content: '防脱发不是一朝一夕的事，需要长期坚持科学的护理方法。以下是一些有效的防脱发建议：\n\n## 日常护理建议\n\n### 1. 正确的洗头方法\n- 使用温水（不要太热），温度约37-40°C\n- 选择温和的洗发水，避免含硅油\n- 洗头频率：油性头皮2-3天一次，干性头皮3-4天一次\n- 轻轻按摩头皮，不要用指甲抠\n\n### 2. 头皮护理\n- 定期做头皮护理，如头皮精油按摩\n- 避免频繁烫染\n- 保持头皮清洁和健康\n\n### 3. 生活方式调整\n- **睡眠**：每晚保证7-8小时睡眠\n- **运动**：每周3-5次，30分钟的有氧运动\n- **压力管理**：学习放松技巧，如冥想、瑜伽\n- **饮食**：多吃黑芝麻、黑豆、海带、鸡蛋等益发食物\n\n### 4. 头发护理\n- 洗完头后自然干或用低温吹风\n- 避免过紧的发型（如马尾、辫子）\n- 定期修剪，去除分叉\n\n### 5. 营养补充\n- 蛋白质：鸡蛋、鱼、肉类\n- 铁元素：红肉、菠菜\n- 锌：海鲜、坚果\n- B族维生素：全谷物、绿叶蔬菜\n\n坚持这些方法，你会看到明显的改善！',
    author: '皮肤科医生',
    coverImage: 'https://via.placeholder.com/400x200?text=Hair+Care',
    tags: ['防脱方法', '日常护理', '实用建议'],
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    title: '常见防脱发药物指南',
    category: '用药指南',
    content: '目前市场上有多种防脱发药物，以下是常见的几种：\n\n## 常用防脱发药物\n\n### 1. 米诺地尔（Minoxidil）\n- **效果**：促进毛发生长\n- **用法**：外用液体或泡沫\n- **浓度**：男性5%，女性2%\n- **疗程**：通常需要3-6个月才能看到效果\n- **副作用**：可能导致头皮瘙痒\n\n### 2. 非那雄胺（Finasteride）\n- **效果**：阻止DHT（导致脱发的激素）\n- **用法**：口服\n- **剂量**：1mg/日\n- **疗程**：需要3-6个月\n- **注意**：仅适用于男性\n\n### 3. 生物素（Biotin）\n- **效果**：促进头发健康生长\n- **用法**：口服补充剂\n- **剂量**：每天2.5mg\n- **特点**：天然、安全\n\n### 4. 维生素B复合体\n- **作用**：支持头发和头皮健康\n- **用法**：口服\n- **优势**：全面营养支持\n\n## 用药建议\n\n1. **咨询医生**：选择任何药物前，务必咨询皮肤科医生\n2. **坚持用药**：防脱发药物需要长期使用才能看到效果\n3. **记录用药**：使用APP追踪用药情况\n4. **观察效果**：3个月后评估是否有改善\n\n**重要提示**：本信息仅供参考，不构成医学建议。请在医生指导下用药。',
    author: '药学专家',
    coverImage: 'https://via.placeholder.com/400x200?text=Medications',
    tags: ['用药指南', '药物知识', '医学建议'],
    createdAt: '2024-01-25'
  },
  {
    id: 4,
    title: '良好睡眠与防脱发的关系',
    category: '生活习惯',
    content: '睡眠质量和脱发之间有密切关系。充足的睡眠对头发生长至关重要。\n\n## 睡眠对头发的影响\n\n### 1. 激素平衡\n- 充足睡眠能维持正常的激素水平\n- 缺乏睡眠会导致压力激素升高\n- 高压力激素会加速毛囊进入休止期\n\n### 2. 毛囊恢复\n- 夜间是毛囊修复的关键时段\n- 深度睡眠期间，身体分配更多资源进行细胞修复\n- 每晚7-8小时的睡眠是最佳选择\n\n### 3. 免疫系统\n- 睡眠不足会削弱免疫系统\n- 可能导致自身免疫性脱发（斑秃）\n\n## 改善睡眠的建议\n\n1. **规律作息**：每天同一时间睡觉和起床\n2. **睡前准备**：\n   - 避免蓝光刺激（手机、电脑）\n   - 进行放松活动（冥想、深呼吸）\n   - 保持卧室凉爽和黑暗\n3. **避免刺激物**：\n   - 睡前2小时避免咖啡因\n   - 避免睡前饱食或空腹\n4. **运动**：白天适度运动有助改善睡眠质量\n\n使用本平台的睡眠追踪功能，记录你的睡眠情况，找出最适合自己的睡眠规律！',
    author: '睡眠医学专家',
    coverImage: 'https://via.placeholder.com/400x200?text=Sleep+Health',
    tags: ['睡眠', '生活习惯', '防脱发'],
    createdAt: '2024-02-01'
  }
];

// Auth Services
export const authService = {
  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: mockUsers.length + 1,
          ...userData,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };
        mockUsers.push(newUser);
        localStorage.setItem('currentUser', JSON.stringify({ ...newUser, password: undefined }));
        localStorage.setItem('token', `token_${newUser.id}`);
        resolve({ success: true, user: newUser });
      }, 500);
    });
  },

  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify({ ...user, password: undefined }));
          localStorage.setItem('token', `token_${user.id}`);
          resolve({ success: true, user });
        } else {
          reject({ error: '邮箱或密码错误' });
        }
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};

// User Services
export const userService = {
  updateProfile: async (userId, profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          Object.assign(user, profileData);
          localStorage.setItem('currentUser', JSON.stringify({ ...user, password: undefined }));
        }
        resolve({ success: true, user });
      }, 500);
    });
  },

  changePassword: async (userId, oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        if (user && user.password === oldPassword) {
          user.password = newPassword;
          resolve({ success: true });
        } else {
          reject({ error: '原密码错误' });
        }
      }, 500);
    });
  }
};

// Sleep Services
export const sleepService = {
  addRecord: async (userId, recordData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const record = {
          id: Math.random(),
          userId,
          ...recordData,
          createdAt: new Date().toISOString()
        };
        const records = JSON.parse(localStorage.getItem('sleepRecords') || '[]');
        records.push(record);
        localStorage.setItem('sleepRecords', JSON.stringify(records));
        resolve({ success: true, record });
      }, 300);
    });
  },

  getRecords: async (userId, startDate, endDate) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = JSON.parse(localStorage.getItem('sleepRecords') || '[]');
        const filtered = records.filter(r => {
          if (r.userId !== userId) return false;
          const rDate = new Date(r.recordDate);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return rDate >= start && rDate <= end;
        });
        resolve({ success: true, records: filtered });
      }, 300);
    });
  },

  updateRecord: async (recordId, recordData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = JSON.parse(localStorage.getItem('sleepRecords') || '[]');
        const index = records.findIndex(r => r.id === recordId);
        if (index !== -1) {
          records[index] = { ...records[index], ...recordData };
          localStorage.setItem('sleepRecords', JSON.stringify(records));
          resolve({ success: true, record: records[index] });
        }
      }, 300);
    });
  },

  deleteRecord: async (recordId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = JSON.parse(localStorage.getItem('sleepRecords') || '[]');
        const filtered = records.filter(r => r.id !== recordId);
        localStorage.setItem('sleepRecords', JSON.stringify(filtered));
        resolve({ success: true });
      }, 300);
    });
  },

  getStats: async (userId, period = 'week') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = JSON.parse(localStorage.getItem('sleepRecords') || '[]');
        const userRecords = records.filter(r => r.userId === userId);
        
        const now = new Date();
        const days = period === 'week' ? 7 : 30;
        const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        
        const filtered = userRecords.filter(r => new Date(r.recordDate) >= startDate);
        const total = filtered.reduce((sum, r) => sum + (r.sleepDuration || 0), 0);
        const avg = filtered.length > 0 ? (total / filtered.length).toFixed(1) : 0;
        
        resolve({
          success: true,
          stats: {
            totalDays: filtered.length,
            averageSleep: parseFloat(avg),
            totalSleep: total.toFixed(1),
            maxSleep: Math.max(...filtered.map(r => r.sleepDuration || 0), 0),
            minSleep: Math.min(...filtered.map(r => r.sleepDuration || 0), 24),
            data: filtered.sort((a, b) => new Date(a.recordDate) - new Date(b.recordDate))
          }
        });
      }, 300);
    });
  }
};

// Medication Services
export const medicationService = {
  addPlan: async (userId, planData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plan = {
          id: Math.random(),
          userId,
          ...planData,
          isActive: true,
          createdAt: new Date().toISOString()
        };
        const plans = JSON.parse(localStorage.getItem('medicationPlans') || '[]');
        plans.push(plan);
        localStorage.setItem('medicationPlans', JSON.stringify(plans));
        resolve({ success: true, plan });
      }, 300);
    });
  },

  getPlans: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plans = JSON.parse(localStorage.getItem('medicationPlans') || '[]');
        const userPlans = plans.filter(p => p.userId === userId);
        resolve({ success: true, plans: userPlans });
      }, 300);
    });
  },

  updatePlan: async (planId, planData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plans = JSON.parse(localStorage.getItem('medicationPlans') || '[]');
        const index = plans.findIndex(p => p.id === planId);
        if (index !== -1) {
          plans[index] = { ...plans[index], ...planData };
          localStorage.setItem('medicationPlans', JSON.stringify(plans));
          resolve({ success: true, plan: plans[index] });
        }
      }, 300);
    });
  },

  deletePlan: async (planId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plans = JSON.parse(localStorage.getItem('medicationPlans') || '[]');
        const filtered = plans.filter(p => p.id !== planId);
        localStorage.setItem('medicationPlans', JSON.stringify(filtered));
        resolve({ success: true });
      }, 300);
    });
  },

  addRecord: async (userId, recordData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const record = {
          id: Math.random(),
          userId,
          ...recordData,
          createdAt: new Date().toISOString()
        };
        const records = JSON.parse(localStorage.getItem('medicationRecords') || '[]');
        records.push(record);
        localStorage.setItem('medicationRecords', JSON.stringify(records));
        resolve({ success: true, record });
      }, 300);
    });
  },

  getRecords: async (userId, startDate, endDate) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = JSON.parse(localStorage.getItem('medicationRecords') || '[]');
        const filtered = records.filter(r => {
          if (r.userId !== userId) return false;
          const rDate = new Date(r.recordDate);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return rDate >= start && rDate <= end;
        });
        resolve({ success: true, records: filtered });
      }, 300);
    });
  },

  getStats: async (userId, period = 'week') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = JSON.parse(localStorage.getItem('medicationRecords') || '[]');
        const userRecords = records.filter(r => r.userId === userId);
        
        const now = new Date();
        const days = period === 'week' ? 7 : 30;
        const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        
        const filtered = userRecords.filter(r => new Date(r.recordDate) >= startDate);
        const taken = filtered.filter(r => r.status === 'taken').length;
        const total = filtered.length;
        const rate = total > 0 ? Math.round((taken / total) * 100) : 0;
        
        resolve({
          success: true,
          stats: {
            totalRecords: total,
            takenCount: taken,
            missedCount: filtered.filter(r => r.status === 'missed').length,
            completionRate: rate,
            data: filtered.sort((a, b) => new Date(a.recordDate) - new Date(b.recordDate))
          }
        });
      }, 300);
    });
  },

  getTodayReminders: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plans = JSON.parse(localStorage.getItem('medicationPlans') || '[]');
        const userPlans = plans.filter(p => p.userId === userId && p.isActive);
        const today = new Date().toISOString().split('T')[0];
        
        const reminders = userPlans.flatMap(plan => {
          const remindTimes = Array.isArray(plan.remindTimes) ? plan.remindTimes : [plan.remindTimes];
          return remindTimes.map(time => ({
            planId: plan.id,
            planName: plan.drugName,
            dosage: plan.dosage,
            time: time,
            reminded: false
          }));
        });
        
        resolve({ success: true, reminders });
      }, 300);
    });
  }
};

// Article Services
export const articleService = {
  getArticles: async (category = null, page = 1, pageSize = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = mockArticles;
        if (category) {
          filtered = filtered.filter(a => a.category === category);
        }
        
        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const paginated = filtered.slice(start, start + pageSize);
        
        resolve({
          success: true,
          articles: paginated,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize)
        });
      }, 300);
    });
  },

  getArticle: async (articleId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const article = mockArticles.find(a => a.id === articleId);
        if (article) {
          resolve({ success: true, article });
        } else {
          resolve({ success: false, error: '文章不存在' });
        }
      }, 300);
    });
  },

  addFavorite: async (userId, articleId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
        if (!favorites.find(f => f.userId === userId && f.articleId === articleId)) {
          favorites.push({ userId, articleId, createdAt: new Date().toISOString() });
          localStorage.setItem('userFavorites', JSON.stringify(favorites));
        }
        resolve({ success: true });
      }, 300);
    });
  },

  removeFavorite: async (userId, articleId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
        const filtered = favorites.filter(f => !(f.userId === userId && f.articleId === articleId));
        localStorage.setItem('userFavorites', JSON.stringify(filtered));
        resolve({ success: true });
      }, 300);
    });
  },

  getFavorites: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
        const userFavorites = favorites.filter(f => f.userId === userId);
        const articles = userFavorites.map(f => mockArticles.find(a => a.id === f.articleId)).filter(Boolean);
        resolve({ success: true, articles });
      }, 300);
    });
  }
};

// Export Service
export const exportService = {
  generatePDF: async (userId, startDate, endDate) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'PDF已生成',
          filename: `health_report_${new Date().getTime()}.pdf`
        });
      }, 1000);
    });
  }
};
