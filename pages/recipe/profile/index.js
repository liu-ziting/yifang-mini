const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwBHJrRn51zByDJ96bP3094i1HuQ2fgnsgE5tR10j2011jF0waK0505317631b531e1131131131131131131/0';

Page({
  data: {
    navbarHeight: 88,
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '微信用户',
    },
    hasUserInfo: false,
  },

  onLoad() {
    const { statusBarHeight } = wx.getWindowInfo();
    this.setData({ navbarHeight: statusBarHeight + 44 });
    
    // Load saved user info
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      });
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    const { userInfo } = this.data;
    userInfo.avatarUrl = avatarUrl;
    this.setData({
      userInfo,
      hasUserInfo: true
    });
    wx.setStorageSync('userInfo', userInfo);
  },

  onInputNickname(e) {
    const nickName = e.detail.value;
    const { userInfo } = this.data;
    userInfo.nickName = nickName;
    this.setData({
      userInfo,
      hasUserInfo: true
    });
    wx.setStorageSync('userInfo', userInfo);
  },
});