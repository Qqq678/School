//index.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    likeLogo:'../../images/icon_API.png',
    commentLogo:'../../images/icon_component.png',
    favorLogo:'../../images/icon_API.png',
    list:[],
  },

  onLoad: function (options) {
    wx.clearStorage();
  },

  onReady: function() {
    wx.cloud.callFunction({
      name:'news',
      data:{
        DATE:util.formatDate(new Date())
      },
      complete:res=>{
        console.log(res)
        this.setData({
          list:res.result
        })
      }
    })
  },

  likeThis(){
    this.setData({
      likeLogo:'../../images/icon_API_HL.png'
    })
  },

  goReleaseNews(){
    wx.navigateTo({
      url: '../news/news',
  })
}
















  /* // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  }, */

})
