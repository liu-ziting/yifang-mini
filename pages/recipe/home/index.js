const defaultCuisines = [
  {
      id: 'su',
      name: '苏菜大师',
      description: '江南水乡的精致美味',
      avatar: '🦐',
      specialty: '清淡鲜美，刀工精细',
      prompt: `作为苏菜传承人，你精通淮扬菜系精髓。苏菜以清鲜雅致、刀工精湛、造型玲珑著称。请基于用户食材设计一道正统苏菜，突出食材本味与养生搭配。回答需包含：创意菜名、分步烹饪流程、刀工技法解析、营养平衡说明。`
  },
  {
      id: 'lu',
      name: '鲁菜大师',
      description: '齐鲁大地的豪放风味',
      avatar: '🐟',
      specialty: '咸鲜为主，火候精准',
      prompt: `身为鲁菜宗师，你深谙孔府宫廷菜真谛。鲁菜讲究咸鲜纯正、火功严谨、礼仪考究。请依据用户食材创作经典鲁菜，强调火候层次与五味调和。回答需包含：传统菜名、分步烹饪图解、关键火候节点、宫廷技法溯源。`
  },
  {
      id: 'chuan',
      name: '川菜大师',
      description: '巴蜀之地的麻辣传奇',
      avatar: '🌶️',
      specialty: '麻辣鲜香，变化多端',
      prompt: `作为川味掌门，你掌握二十三味型精髓。川菜擅长麻辣平衡、复合调味、一菜一格。请针对用户食材设计地道川味，突出口感层次与红油运用。回答需包含：特色菜名、七步烹饪法、秘制调料配方、味型创新解析。`
  },
  {
      id: 'yue',
      name: '粤菜大师',
      description: '岭南文化的鲜美诠释',
      avatar: '🦆',
      specialty: '清淡鲜美，原汁原味',
      prompt: `身为粤菜泰斗，你崇尚清中求鲜理念。粤菜注重时令本味、镬气逼人、养生之道。请根据用户食材构思广府佳肴，凸显生猛鲜香与少油烹饪。回答需包含：意境菜名、精准火候时序、锁鲜技巧、药膳融合建议。`
  },
  {
      id: 'zhe',
      name: '浙菜大师',
      description: '江南水乡的清雅之味',
      avatar: '🐠',
      specialty: '清香淡雅，鲜嫩爽滑',
      prompt: `作为浙菜传人，你深得南宋遗风真传。浙菜追求清雅时鲜、南料北烹、滑嫩见长。请基于用户食材创作江南风韵菜，突出时令搭配与脆嫩口感。回答需包含：诗意菜名、分步滑炒技法、时令食材解析、勾芡要诀。`
  },
  {
      id: 'xiang',
      name: '湘菜大师',
      description: '湖湘文化的辣味人生',
      avatar: '🔥',
      specialty: '香辣浓郁，口味厚重',
      prompt: `身为湘味宗师，你精通腊熏剁椒秘技。湘菜讲究酸辣透味、油重色浓、乡野本真。请针对用户食材设计火辣湘肴，突出发酵辣味与油色融合。回答需包含：霸气菜名、三重辣味调制法、腊味处理秘笈、油色控制要诀。`
  },
  {
      id: 'min',
      name: '闽菜大师',
      description: '八闽大地的海鲜盛宴',
      avatar: '🦀',
      specialty: '鲜香清淡，汤鲜味美',
      prompt: `作为闽菜大家，你传承佛跳墙精髓。闽菜擅长汤醇味隽、糟香四溢、山珍海味。请依据用户食材创作闽派珍馐，突出红糟提鲜与汤品层次。回答需包含：典故菜名、吊汤八法详解、海鲜保鲜术、糟汁调配比例。`
  },
  {
      id: 'hui',
      name: '徽菜大师',
      description: '徽州文化的朴实醇香',
      avatar: '🐷',
      specialty: '重油重色，醇厚朴实',
      prompt: `身为徽菜掌门，你掌握文火炖焖绝技。徽菜强调重油保色、火腿提鲜、山野本味。请针对用户食材设计徽州古韵菜，突出炭火慢炖与油色控制。回答需包含：徽派菜名、三阶段火功法、火腿吊味技巧、收汁成色要诀。`
  }
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
    currentStep: 0, // 0: 输入食材, 1: 选择菜系
    basket: [], // 已选食材篮子
    ingredientCategories, // 食材分类数据
    
    cuisineSections: [
      { title: '🇨🇳 中华八大菜系', items: defaultCuisines.slice(0, 8) }
    ],
    selectedCuisineId: null
  },

  onLoad() {
  },

  onAddIngredient(e) {
    const item = e.detail.item;
    this.setData({
      basket: [...this.data.basket, item]
    });
  },

  onRemoveIngredient(e) {
    const index = e.detail.index;
    const newBasket = [...this.data.basket];
    newBasket.splice(index, 1);
    this.setData({ basket: newBasket });
  },

  onSelectCuisine(e) {
    const id = e.detail.id;
    this.setData({ selectedCuisineId: id });
  },

  nextStep() {
    if (this.data.basket.length === 0) {
      wx.showToast({ title: '先告诉我冰箱里有什么食材~', icon: 'none' });
      return;
    }
    this.setData({ currentStep: 1 });
  },

  prevStep() {
    this.setData({ currentStep: 0 });
  },

  onGenerate() {
    const ingredients = JSON.stringify(this.data.basket);
    const cuisineId = this.data.selectedCuisineId;
    
    wx.navigateTo({
      url: `/pages/recipe/detail/index?ingredients=${ingredients}&cuisineId=${cuisineId}`
    });
  }
});