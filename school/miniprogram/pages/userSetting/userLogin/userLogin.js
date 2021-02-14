// pages/userSetting/userLogin/userLogin.js
const app = getApp();
/* const getUserData = require('../../mine/mine.js') */

Page({
  /**
   * 页面的初始数据
   */
  data: {
    login: true,
    userNameValue: '',
    userPasswordValue: '',
    response: '',     //存取返回数据
    username: '',
    usercard: '',
    password: '',
    myCourse: '',
    course: ''
  },

  bindUserName: function (e) {
    this.setData({
      userNameValue: e.detail.value,
    })
  },

  bindUserPassword: function (e) {
    this.setData({
      userPasswordValue: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindLogin: function () {
    var that = this;
    if (this.data.userNameValue.length == 0 || this.data.userPasswordValue.length == 0) {
      wx.showToast({
        title: '输入不能为空',
        icon: 'loading',
        duration: 1000,
      });
    } else {
      wx.cloud.callFunction({
        name: 'user',
        data: {
          uesrCard: that.data.userNameValue,
          passWord: that.data.userPasswordValue,
        },
        complete: res => {
          
          if (res.result!== null) {
            that.setData({
              response: res,
              userNameValue: '',
              userPasswordValue: '',
              username: res.result.userName,
              usercard: res.result.userCard,
              password: res.result.passWord,
              myCourse: res.result.myCourse,
              course: res.result.course,
              login: false
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000,
            });

            try {
              wx.setStorageSync('usercard', this.data.usercard);
              wx.setStorageSync('password', this.data.password);
              wx.setStorageSync('username', this.data.username);
            } catch (e) {

            }
            const page = getCurrentPages();
            page[0].setData({
              done: false,
              reLogin: wx.getStorageSync('username')
            })

            wx.switchTab({
              url: '../userSetting',
            });
            console.log(page[0].data.reLogin)
            console.log(this.data.response)
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'loading',
              duration: 1000,
            });
            console.log(res);
            console.log('is failed')
          }
        }
      })
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

  },

})