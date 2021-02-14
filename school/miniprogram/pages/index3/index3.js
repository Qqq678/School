Page({
  data: {
    userId: '',
  },

  bindGoReportCardPage() {
    wx.navigateTo({
      url: '../reportCard/reportCard',
    })
  },

  bindGoTimeTablePage() {
    wx.navigateTo({
      url: '../timeTable/timeTable',
    })
  },

  bindGetUserData() {
    wx.request({
      url: 'https://test.com/getinfo',
      success: function (res) {
        console.log(res)
      }
    })
  },

  bindGoCet() {
    wx.navigateTo({
      url: '../cet/cet',
    })
  },

  bindAddUserData() {
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        userName: '',
        userCard: '',
        passWord: '',
        course: [],
        mycourse: []
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          userId: res._id,

        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  
})