// components/authorized-userInfo/authorized-userInfo.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showAuthModal: false, // 是否显示确认授权弹窗
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    content: '我的FA请求获取您的昵称、头像等公开信息，以便继续使用我的FA小程序', // 授权弹窗内容
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        wx.showToast({
          title: '未授权获取用户信息',
          icon: 'none',
          duration: 2000
        });
        // 点击拒绝后，重新打开是否确认授权的弹窗
        this.setData({
          showAuthModal: true
        });
        return
      }
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      const common = require('../../utils/common')
      common.Common.decryptionUserInfo(e.detail.encryptedData, e.detail.iv);
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(e.detail.userInfo)
      }
    },
    // 隐藏是否授权的弹窗
    hideAuthModal() {
      this.setData({
        showAuthModal: false
      })
    }
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    /**
     * 组件实例刚刚被创建时执行
     */
    created() {

    },
    /**
     * 组件实例进入页面节点树时执行
     */
    attached() {
      if (app.globalData.userInfo) {
        this.setData({
          showAuthModal: false,
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = (res) => {
          this.setData({
            showAuthModal: false,
            userInfo: res,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              showAuthModal: false,
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
      wx.getSetting({
        success: (res) => {
          if (!(res.authSetting['scope.userInfo'])) {
            this.setData({
              showAuthModal: true
            })
          }
        }
      });
    },
    /**
     * 组件在视图层布局完成后执行
     */
    ready() {

    },
    /**
     * 组件实例被移动到节点树另一个位置时执行
     */
    moved() {

    },
    /**
     * 组件实例被从页面节点树移除时执行
     */
    detached() {
    },
    /**
     * 每当组件方法抛出错误时执行
     */
    error() {

    }
  },
  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    /**
     * 组件所在的页面被展示时执行
     */
    show() {
    },
    /**
     * 组件所在的页面被隐藏时执行
     */
    hide() {
    },
    /**
     * 组件所在的页面尺寸变化时执行
     */
    resize(size) {
    }
  },
})
