Component({
  data: {
    value: '/pages/recipe/home/index',
    list: [
      { value: '/pages/recipe/home/index', icon: 'home', label: '首页' },
      { value: '/pages/recipe/profile/index', icon: 'user', label: '我的' }
    ]
  },

  methods: {
    onChange(e) {
      wx.switchTab({
        url: e.detail.value
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route : '';
      const value = '/' + route;
      
      this.setData({ value });
    }
  }
});