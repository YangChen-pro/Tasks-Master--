// pages/login/login.js
var app = getApp();
var api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backFront: true
  },
  /**
   * 切换前置后置摄像头（默认后置）
   */
  switchCamera: function(e) {
    var old = this.data.backFront
    this.setData({
      backFront: !old
    })
  },

  takePhoto(){
    //1.获取照片
    //2.上传到后端API
    //3.调用百度AI识别
    //4.用户信息返回
    //5.登录信息持久化
    //6.返回上一个页面（状态变化）

    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {    
        // 获取照片 
        //console.log(res.tempImagePath);

        
        wx.uploadFile({
          filePath: res.tempImagePath,
          name: 'avatar',
          url: api.bankFace,
          success:(response)=>{
            var data = JSON.parse(response.data);
            if(data.status && data.content.error_code===0){
                var userDict = data.content.result.user_list[0]

                var uid = userDict.user_id
                var name = userDict.user_info
                var score = data.score
                var avatar = res.tempImagePath

                //console.log(name,score,avatar)
                app.initUserInfo(name,score,avatar, uid)

                //console.log(app.globalData.userInfo)
                // 找到上一个 + userInfo更新
                // 对上一个页面中的值，进行修改

                // var pages = getCurrentPages();
                // var prevPage = pages[pages.length - 2];
                // prevPage.setData({
                //   userInfo: app.globalData.userInfo
                // })

                wx.navigateBack()


            }else{
             
              wx.showToast({
                title: '识别失败，请先注册',
                icon:"none",
                duration: 500//显示一秒
              }),  
              //-------------------认证失败后跳转到注册界面-----------------------------
              setTimeout(() => {  
                wx.redirectTo({  
                  url: '/pages/form_rig/form_rig'   // 假设menu页面的路径是'/pages/menu/menu'  
                });  
              }, 500); // 延迟2秒执行   
            
          
          }
          }
        })

        
      }
    })




  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //console.log("login.onLoad")
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
    //console.log("login.onShow")
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