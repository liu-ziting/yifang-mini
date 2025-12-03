const defaultCuisines = [
  { name: '川菜', icon: '🌶️', id: 1 },
  { name: '粤菜', icon: '🥟', id: 2 },
  { name: '湘菜', icon: '🥘', id: 3 },
  { name: '鲁菜', icon: '🍖', id: 4 },
  { name: '日式', icon: '🍱', id: 5 },
  { name: '西餐', icon: '🍝', id: 6 },
  { name: '减脂', icon: '🥗', id: 7 },
  { name: '甜点', icon: '🍰', id: 8 },
];

const ingredientCategories = [
  { name: '荤菜', items: ['牛肉', '猪肉', '鸡肉', '羊肉', '鸭肉', '排骨', '培根', '火腿', '五花肉'] },
  { name: '素菜', items: ['土豆', '番茄', '白菜', '青菜', '胡萝卜', '茄子', '黄瓜', '西兰花', '洋葱'] },
  { name: '海鲜', items: ['虾', '鱼', '螃蟹', '鱿鱼', '蛤蜊', '带鱼', '三文鱼'] },
  { name: '菌菇', items: ['香菇', '金针菇', '杏鲍菇', '平菇', '木耳'] },
  { name: '豆制品', items: ['豆腐', '腐竹', '豆皮', '千张', '豆干'] },
];

Page({
  data: {
    currentStep: 0, // 0: 输入食材, 1: 选择风格
    inputValue: '', // 输入框内容
    basket: [], // 已选食材篮子
    ingredientCategories, // 食材分类数据
    currentCategoryIndex: 0, // 当前选中的分类索引
    showIngredientPopup: false, // 控制食材选择弹窗
    
    cuisines: defaultCuisines,
    selectedCuisineId: null,
    
    // AI 状态控制
    showResult: false, // 是否展示结果弹窗
    loading: false,
    loadingText: 'AI 正在热锅...',
    
    // 结果数据
    recipe: null,
    
    // 顶部导航栏高度适配
    navHeight: 44,
    statusBarHeight: 20,
  },

  onLoad() {
    // 获取系统状态栏高度，用于适配自定义导航
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      navHeight: systemInfo.statusBarHeight + 44
    });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  addIngredient() {
    const val = this.data.inputValue.trim();
    if (!val) return;
    
    if (this.data.basket.includes(val)) {
      wx.showToast({ title: '已经在篮子里啦', icon: 'none' });
      this.setData({ inputValue: '' });
      return;
    }

    this.setData({
      basket: [...this.data.basket, val],
      inputValue: ''
    });
  },

  removeIngredient(e) {
    const index = e.currentTarget.dataset.index;
    const newBasket = [...this.data.basket];
    newBasket.splice(index, 1);
    this.setData({ basket: newBasket });
  },

  switchCategory(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentCategoryIndex: index });
  },

  addFromCategory(e) {
    const item = e.currentTarget.dataset.item;
    if (this.data.basket.includes(item)) {
      wx.showToast({ title: '已经在篮子里啦', icon: 'none' });
      return;
    }
    this.setData({
      basket: [...this.data.basket, item]
    });
    wx.vibrateShort(); // 简单的触感反馈
  },

  openIngredientPopup() {
    this.setData({ showIngredientPopup: true });
  },

  closeIngredientPopup() {
    this.setData({ showIngredientPopup: false });
  },

  onSelectCuisine(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ selectedCuisineId: id });
  },

  nextStep() {
    if (this.data.currentStep === 0) {
      if (this.data.basket.length === 0) {
        wx.showToast({ title: '先告诉我冰箱里有什么食材~', icon: 'none' });
        return;
      }
      this.setData({ currentStep: 1 });
    }
  },

  prevStep() {
    if (this.data.currentStep > 0) {
      this.setData({ currentStep: this.data.currentStep - 1 });
    }
  },

  async onGenerate() {
    // 1. 启动 AI 动画
    this.setData({ loading: true, loadingText: '正在识别食材灵感...' });

    // 2. 模拟 AI 思考过程 (文案变化)
    setTimeout(() => {
      this.setData({ loadingText: '正在匹配最佳烹饪方式...' });
    }, 1500);

    setTimeout(() => {
      this.setData({ loadingText: '正在计算卡路里与摆盘...' });
    }, 3000);

    // 3. 模拟请求结束 (4秒后)
    setTimeout(() => {
      const mockResult = this.generateMockResult();
      this.setData({ 
        loading: false, 
        recipe: mockResult,
        showResult: true // 弹出结果层
      });
    }, 4500);
  },

  closeResult() {
    this.setData({ showResult: false });
  },

  // 模拟数据生成
  generateMockResult() {
    const cuisine = this.data.cuisines.find(c => c.id === this.data.selectedCuisineId)?.name || '融合菜';
    const ing = this.data.basket.join('、');
    return {
      title: `秘制${cuisine}风味${ing}`,
      tags: ['低卡路里', '大厨推荐', '15分钟快手'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // 更有食欲的图
      calories: 320,
      time: '20min',
      difficulty: '简单',
      wine: cuisine === '西餐' ? '干红葡萄酒' : '冰镇酸梅汤',
      desc: `这是一道将${ing}发挥到极致的料理。${cuisine}独特的烹饪技法锁住了食材的水分，搭配特制酱汁，每一口都是精华。`,
      steps: [
        { title: '备菜', desc: '将食材洗净，改刀成均匀的小块，沥干水分。' },
        { title: '爆香', desc: '热锅凉油，放入姜蒜爆出香味。' },
        { title: '烹饪', desc: '倒入食材大火快炒，加入灵魂酱汁焖煮5分钟。' },
        { title: '摆盘', desc: '撒上葱花或芝麻，淋上少许香油即可出锅。' }
      ]
    };
  }
});