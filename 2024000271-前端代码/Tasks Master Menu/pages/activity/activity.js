// pages/activity/activity.js
var app = getApp()
const api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    maxId: 0, //最大ID
    minId: 0
  },

  doApply(e) {
    var nid = e.target.dataset.aid
    //console.log("点击报名", nid)
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
    console.log(userInfo.uid, nid)

    // 额外的：对于活动列表（已报名，已过期）
    wx.request({
      url: api.bankApply,
      method: "POST",
      data: {
        user_uid: userInfo.uid,
        activity_id: nid
      },
      success: (result) => {
        if (result.data.status) {
          wx.showToast({
            title: result.data.msg,
            duration: 2000
          })
        } else {
          wx.showToast({
            title: result.data.error,
            duration: 2000,
            icon: "none"
          })
        }
      }
    })

  },
  
  getDataList(){
    wx.request({
      method: "GET",
      url: api.bankActivity,
      data: {},
      success: (res) => {
        if (res.data.length > 0) {
          this.data.maxId = res.data[0]['id']
          this.data.minId = res.data[res.data.length - 1]['id']
        }

        this.setData({
          activityList: res.data
        })
      },
      complete: () => {
        wx.stopPullDownRefresh() //数据获取到之后
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //发送网络请求，获取社区活动
    this.getDataList()

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
    if(this.data.maxId===0){
      this.getDataList()
      return
    }
    console.log("要下拉刷新")
    wx.showLoading({
      title: '加载中',
    })

    // 获取最新数据
    //   1.获取哪些数据？ 所有？  新活动
    //   2.获取 id>maxId值的数据
    // console.log(this.data.maxId)

    wx.request({
      method: "GET",
      url: api.bankActivity,
      data: {
        max_id: this.data.maxId
      },
      success: (res) => {
        //var response = res.data.reverse()
        var response = res.data
        if (response.length > 0) {
          this.setData({
            activityList: response.concat(this.data.activityList),
            maxId: response[0].id
          })
        } else {
          wx.showToast({
            title: '没有新数据了',
            icon: "none"
          })
        }
      },
      complete: () => {
        wx.stopPullDownRefresh() //数据获取到之后
        wx.hideLoading()
      }
    })


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

    if(this.data.minId===0){
      getDataList()
      return
    }

    //1.发送请求，获取 min_id=minId，比这个id更小的数据
    this.getReachButtomData()
  },

  doLoadMore(){
    if(this.data.minId===0){
      this.getDataList()
      return
    }
    this.getReachButtomData()
  },

  getReachButtomData(){

    //1.发送请求，获取 min_id=minId，比这个id更小的数据
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: "GET",
      url: api.bankActivity,
      data: {
        min_id: this.data.minId
      },
      success: (res) => {
        var response = res.data
        if (response.length > 0) {
          this.setData({
            activityList: this.data.activityList.concat(response),
            minId: response[response.length-1].id
          })
        } else {
          wx.showToast({
            title: '已经到底了',
            icon: "none"
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})