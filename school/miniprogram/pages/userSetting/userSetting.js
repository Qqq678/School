
Page({
  data:{
    login:'登录',
    signOut:',登出',
    reLogin:'',
    done:true
  },

  onReady: function () {
    /* this.setData({
      login:wx.getStorageSync('username')
    }) */
  },
  
  signOut(){
    wx.clearStorageSync();
    this.setData({
      done:true
    })
  },

  goLogin() {
      wx.navigateTo({
        url: 'userLogin/userLogin'
      })
    }
  })
