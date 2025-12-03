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
  { 
      id: 'meat', 
      name: '荤菜', 
      icon: '🥩', 
      color: 'bg-red-100 border-red-300 text-red-800', 
      items: [ 
          '猪肉', '牛肉', '羊肉', '鸡肉', '鸭肉', '鹅肉', '兔肉', '驴肉', 
          '猪排骨', '牛排', '羊排', '鸡翅', '鸡腿', '鸡胸肉', '鸡爪', '鸭腿', 
          '五花肉', '瘦肉', '肉丝', '肉片', '肉丁', '肉馅', '里脊肉', '梅花肉', 
          '腊肉', '香肠', '火腿', '培根', '腊肠', '咸肉', '风干肉', '牛肉干', 
          '猪蹄', '猪肚', '猪肝', '猪心', '猪肺', '猪腰', '牛肚', '羊肚', 
          '鸡心', '鸡肝', '鸡胗', '鸭血', '猪血' 
      ] 
  }, 
  { 
      id: 'seafood', 
      name: '海鲜', 
      icon: '🦀', 
      color: 'bg-blue-100 border-blue-300 text-blue-800', 
      items: [ 
          '鲈鱼', '鲫鱼', '草鱼', '鲤鱼', '带鱼', '黄鱼', '鳕鱼', '三文鱼', 
          '金枪鱼', '鲳鱼', '石斑鱼', '桂鱼', '鲢鱼', '青鱼', '武昌鱼', '比目鱼', 
          '鳗鱼', '刀鱼', '大虾', '基围虾', '龙虾', '白虾', '河虾', '明虾', 
          '对虾', '皮皮虾', '螃蟹', '大闸蟹', '梭子蟹', '青蟹', '毛蟹', '扇贝', 
          '蛤蜊', '生蚝', '牡蛎', '花甲', '蚬子', '海螺', '田螺', '鱿鱼', 
          '章鱼', '墨鱼', '海参', '鲍鱼', '海带', '紫菜', '裙带菜' 
      ] 
  }, 
  { 
      id: 'vegetables', 
      name: '蔬菜', 
      icon: '🥬', 
      color: 'bg-green-100 border-green-300 text-green-800', 
      items: [ 
          '白菜', '大白菜', '小白菜', '娃娃菜', '菠菜', '韭菜', '韭黄', '芹菜', 
          '西芹', '生菜', '油菜', '小油菜', '菜心', '芥菜', '空心菜', '苋菜', 
          '茼蒿', '西红柿', '樱桃番茄', '黄瓜', '小黄瓜', '茄子', '长茄子', '圆茄子', 
          '豆角', '四季豆', '扁豆', '豇豆', '荷兰豆', '豌豆', '毛豆', '青椒', 
          '红椒', '黄椒', '彩椒', '尖椒', '朝天椒', '小米椒', '泡椒', '土豆', 
          '红薯', '紫薯', '山药', '芋头', '莲藕', '荸荠', '慈姑', '萝卜', 
          '白萝卜', '胡萝卜', '青萝卜', '心里美萝卜', '樱桃萝卜', '洋葱', '大葱', 
          '小葱', '香葱', '蒜苗', '蒜黄', '大蒜', '生姜', '冬瓜', '南瓜', 
          '丝瓜', '苦瓜', '西葫芦', '佛手瓜', '蛇瓜', '豆芽', '绿豆芽', 
          '黄豆芽', '豆苗', '萝卜苗', '香椿', '蕨菜', '马齿苋', '菜花', '西兰花', 
          '包菜', '紫甘蓝', '芥蓝', '花椰菜' 
      ] 
  }, 
  { 
      id: 'mushrooms', 
      name: '菌菇', 
      icon: '🍄', 
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800', 
      items: [ 
          '香菇', '花菇', '平菇', '金针菇', '杏鲍菇', '茶树菇', '草菇', '口蘑', 
          '蟹味菇', '白玉菇', '海鲜菇', '鸡腿菇', '滑子菇', '秀珍菇', '木耳', 
          '黑木耳', '银耳', '雪耳', '毛木耳', '竹荪', '猴头菇', '松茸', 
          '牛肝菌', '羊肚菌', '鸡油菌', '榛蘑', '元蘑' 
      ] 
  }, 
  { 
      id: 'beans', 
      name: '豆类', 
      icon: '🫘', 
      color: 'bg-orange-100 border-orange-300 text-orange-800', 
      items: [ 
          '豆腐', '嫩豆腐', '老豆腐', '内酯豆腐', '豆腐干', '香干', '白干', 
          '豆皮', '腐竹', '千张', '豆泡', '油豆腐', '冻豆腐', '臭豆腐', 
          '毛豆', '豌豆', '蚕豆', '绿豆', '红豆', '黑豆', '黄豆', '芸豆', 
          '豆芽', '豆苗', '豆角', '四季豆', '扁豆', '豇豆', '荷兰豆', 
          '腐乳', '豆豉', '纳豆', '豆浆', '豆花' 
      ] 
  }
];

Page({
  data: {
    currentStep: 0, // 0: 输入食材, 1: 选择菜系
    basket: [], // 已选食材篮子
    ingredientCategories, // 食材分类数据
    
    cuisineSections: [
      { title: '🇨🇳 中华八大菜系', items: defaultCuisines.slice(0, 8) }
    ],
    selectedCuisineId: null,
    dietaryRestrictions: [] // 用户忌口
  },

  onLoad() {
  },
  
  onDietaryChange(e) {
    this.setData({
      dietaryRestrictions: e.detail.value
    });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
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
    
    // Default select the first master
    const firstMasterId = this.data.cuisineSections[0].items[0].id;

    this.setData({ 
      currentStep: 1,
      selectedCuisineId: firstMasterId
    });
  },

  prevStep() {
    this.setData({ currentStep: 0 });
  },

  onGenerate() {
    const ingredients = JSON.stringify(this.data.basket);
    const cuisineId = this.data.selectedCuisineId;
    const dietary = JSON.stringify(this.data.dietaryRestrictions);
    
    wx.navigateTo({
      url: `/pages/recipe/detail/index?ingredients=${ingredients}&cuisineId=${cuisineId}&dietary=${dietary}`
    });
  }
});