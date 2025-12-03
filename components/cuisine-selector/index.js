Component({
  properties: {
    cuisineSections: {
      type: Array,
      value: []
    },
    selectedCuisineId: {
      type: String,
      optionalTypes: [Number],
      value: null
    }
  },

  methods: {
    onSelectCuisine(e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('select', { id });
    },

    prevStep() {
      this.triggerEvent('prev');
    },

    onGenerate() {
      if (!this.properties.selectedCuisineId) {
        wx.showToast({ title: '请选择一种菜系', icon: 'none' });
        return;
      }
      this.triggerEvent('generate');
    }
  }
});