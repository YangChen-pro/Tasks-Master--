// pages/goods/goods.js
const api = require("../../config/api.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[]
  },

  doExchange(e){
    var nid = e.target.dataset.gid
    
    console.log("点击报名", nid)
    //1.判断是否已登录(vuex)

    //2.未登录，则跳转到登录页面
    var userInfo = app.globalData.userInfo;
    if (!userInfo) {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
      return
    }

    //3.已登录，继续请求【用户是否已报名；未报名和报名】
    console.log(userInfo, nid)

    // 额外的：对于活动列表（已报名，已过期）

  },
  getGoodsList:function(){
    wx.request({
      url: api.bankGoods,
      method:"GET",
      success:(res)=>{
        this.setData({
          goodsList:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})