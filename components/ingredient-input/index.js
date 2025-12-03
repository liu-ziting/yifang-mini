Component({
  properties: {
    basket: {
      type: Array,
      value: []
    },
    ingredientCategories: {
      type: Array,
      value: []
    },
    selectedRestrictions: {
      type: Array,
      value: []
    }
  },

  data: {
    inputValue: '',
    currentCategoryIndex: 0,
    showIngredientPopup: false,
    restrictions: ['不吃香菜', '不吃葱', '不吃蒜', '不吃姜', '不吃辣', '低油', '低盐', '低糖']
  },

  methods: {
    toggleRestriction(e) {
      const { item } = e.currentTarget.dataset;
      const { selectedRestrictions } = this.properties;
      const index = selectedRestrictions.indexOf(item);
      
      let newSelection;
      if (index > -1) {
        newSelection = selectedRestrictions.filter(i => i !== item);
      } else {
        newSelection = [...selectedRestrictions, item];
      }
      
      this.triggerEvent('dietaryChange', { value: newSelection });
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

      this.triggerEvent('add', { item: val });
      this.setData({ inputValue: '' });
    },

    removeIngredient(e) {
      const index = e.currentTarget.dataset.index;
      this.triggerEvent('remove', { index });
    },

    switchCategory(e) {
      const index = e.currentTarget.dataset.index;
      this.setData({ currentCategoryIndex: index });
    },

    addFromCategory(e) {
      const item = e.currentTarget.dataset.item;
      
      if (this.data.basket.includes(item)) {
        const index = this.data.basket.indexOf(item);
        this.triggerEvent('remove', { index });
      } else {
        this.triggerEvent('add', { item });
        wx.vibrateShort();
      }
    },

    openIngredientPopup() {
      this.setData({ showIngredientPopup: true });
    },

    closeIngredientPopup() {
      this.setData({ showIngredientPopup: false });
    },

    nextStep() {
      if (this.properties.basket.length === 0) {
        wx.showToast({ title: '先告诉我冰箱里有什么食材~', icon: 'none' });
        return;
      }
      this.triggerEvent('next');
    }
  }
});
