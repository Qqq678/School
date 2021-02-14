const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    news:'',
    date:'',
    DATE:''
  },

  bindRelease:function(e){
    this.setData({
      news:e.detail.value
    })
    console.log(this.data.news)
  },

  releaseNews(){
    if(this.data.news.length == 0){
      wx.showToast({
        title: '输入不能为空',
        icon: 'loading',
        duration: 1000,
      })
    }else{
      this.setData({
        user:wx.getStorageSync('username'),
        date:util.formatTime(new Date()),
        DATE:util.formatDate(new Date())
      })

      console.log(this.data.DATE)
      const db = wx.cloud.database()
      db
      .collection('news')
      .add({
        data: {
            user: this.data.user,
            date: this.data.date,
            news: this.data.news,
            DATE: this.data.DATE
        },
        success: res => {
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        }
      })

      wx.switchTab({
        url: '../index/index',
      });

      wx.showToast({
        title:'发布成功',
        icon:'success',
        duration:1000
      });
      const page = getCurrentPages();
      page[0].onReady()
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(!wx.getStorageSync('username')){
      wx.switchTab({
          url:'../userSetting/userSetting'
        })
        
      wx.showToast({
        title:'请先登录',
        icon:'loading',
        duration:2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})