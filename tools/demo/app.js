App({
  globalData: Object,

  // 小程序启动之后 触发
  onLaunch(options) {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.statusBarHeight = res.statusBarHeight
      }
    })
  }
})
