// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();

  try {
    const res = await db
      .collection('user')
      .where({
        userCard: event.userCard,
        passWord: event.passWord
      })
      .get()
     return res.data && res.data[0]
    
  } catch (e) {
    console.error(e)
  }
}