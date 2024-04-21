// pages/face/face.js
const api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[]
  },

  takePhoto(e){
    wx.showLoading({
      title: '检测中',
      mask:true
    })

    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.uploadFile({
          url: api.bankFace,
          filePath: res.tempImagePath,
          name: 'avatar',
          success:(response)=>{
            let data = JSON.parse(response.data)
            if(data.status){
              data.content.avatar = res.tempImagePath

              var oldRecord = this.data.record
              oldRecord.unshift(data.content)
              console.log(oldRecord)
              this.setData({
                record:oldRecord
              })

            }else{
              wx.showToast({
                title: '请正常拍照',
                icon: none
              })
            }
          },
          complete:function(){
            wx.hideLoading()
          }
        })
        

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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