// pages/timeTale/timeTable.js
/* const mockTimeTable = require('../../mocks/timeTable.js') */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
  },
  // %s/?<=7": )5/" "
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading();
    try{
      const card = wx.getStorageSync('usercard')
      const word = wx.getStorageSync('password')
      if(card){
        console.log(card)
      }
      if(word){
        console.log(word)
      }
    }catch(e){

    }
    wx.cloud.callFunction({
      name:"user",
      data:{
        userCard:wx.getStorageSync('usercard'),
        passWord:wx.getStorageSync('password')
      },
      complete:res=>{
      /*  console.log(res) */
        this.setData({
          listData:res.result.course
        })
        wx.hideLoading();
      }
    })
  },
  
})