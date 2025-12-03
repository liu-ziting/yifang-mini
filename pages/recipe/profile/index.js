Page({
  data: {
    navbarHeight: 88,
  },
  onLoad() {
    const { statusBarHeight } = wx.getWindowInfo();
    this.setData({ navbarHeight: statusBarHeight + 44 });
  },
});