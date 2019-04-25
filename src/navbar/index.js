// eslint-disable-next-line no-undef
const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: 'Wechat',

    },
    backgroundColor: {
      type: String,
      value: '#ffffff'
    },
    back: {
      type: Boolean,
      value: false
    },
    home: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 'px',
    navigationBarHeight: (app.globalData.statusBarHeight + 44) + 'px',
  },
  methods: {
    backHome() {
      const pages = getCurrentPages()
      wx.navigateBack({
        delta: pages.length
      })
    },
    back() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
