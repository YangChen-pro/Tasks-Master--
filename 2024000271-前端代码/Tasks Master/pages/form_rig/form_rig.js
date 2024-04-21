// pages/form/form.js
const api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "/images/camera.png",
    //------------------------这个事情重要程度就先不要了---------------------------------------
    // objectArray: [{
    //     id: 1,
    //     name: '非做不可的事情'
    //   },
    //   {
    //     id: 2,
    //     name: '一级紧急的事情'
    //   },
    //   {
    //     id: 3,
    //     name: '二级紧急的事情'
    //   },
    //   {
    //     id: 4,
    //     name: '#三级紧急的事情'
    //   }
    // ],
    index: -1,
    name:""
  },

  postUser(e){

    wx.showLoading({
      title: '提交中',
      mask:true
    })

    wx.uploadFile({
      url: api.bank,
      filePath: this.data.avatar,
      name: 'avatar',
      formData: {
        'name': this.data.name,
        //---------------------先把地区注释一下----------------------------------
        //'area': this.data.objectArray[this.data.index].id
      },
      success(res) {
        console.log(res);
        // 上一个页面新增数据
        var dataDict = JSON.parse(res.data)
        var row = {
          id: dataDict.id,
           //---------------------先把地区注释一下----------------------------------
          //area: dataDict.area_text,
          name: dataDict.name,
          avatar: dataDict.avatar,
        }
        //----------------显示提交成功--------------------
            // 显示提交成功提示  
        wx.showToast({  
          title: '注册成功',  
          icon: 'success',  
          duration: 1000 // 设置为1秒  
        }); 
            // 2秒后执行跳转逻辑  
        setTimeout(() => {  
          //------------------封印跳转到上一页的函数------------------
          // var pages = getCurrentPages();  
          // var prevPage = pages[pages.length - 2]; // 获取上一个页面  
          // // 假设prevPage有一个addRow方法用来添加数据  
          // prevPage.addRow(row);  
          // wx.navigateBack({}); // 跳转到上一页  
          wx.redirectTo({  
            url: '/pages/login/login' // 假设menu页面的url: '/pages/login/login'路径是'/pages/menu/menu'  
          });  
        }, 500); // 延迟2秒执行  
          
        // 注意：不需要在这里立即调用wx.navigateBack({})，因为我们已经设置了setTimeout  
      },  
      //-------------------先注释一下原来的跳转函数-------------------------------
      //   var pages = getCurrentPages();
      //   var prevPage = pages[pages.length - 2]; //上一个页面
      //   prevPage.addRow(row)
      //   wx.navigateBack({})
      //   // 跳转回上一页
      //   wx.navigateBack({});
     
      // },
      complete() {
        wx.hideLoading()
      }
    })


  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindNameChange(e){},
  bindToCamera(e){
    wx.navigateTo({
      url: '/pages/camera/camera',
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