// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
    
    ],
    name:'姓名',
    userName:'',
    card:'学号',
    userCard:''
  },
 
  onLoad: function (options) {

  },

  onReady: function () {
    wx.showLoading()
    wx.cloud.callFunction({
      name:'user',
      data:{
        userCard:wx.getStorageSync('usercard'),
        passWord:wx.getStorageSync('password')
      },
      complete:res=>{
        console.log(res)
        this.setData({
          list:res.result.myCourse,
          userName:res.result.userName,
          userCard:res.result.userCard
        })
        wx.hideLoading()
      }
    })
  }
})

