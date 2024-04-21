// pages/myActivity/myActivity.js
var app = getApp()
const api = require("../../config/api.js")

Page({  
  data: {  
    loadingMore: false, // 控制是否显示“正在加载...”  
    // 其他数据...  
  },  
  doLoadMore: function() {  
    // 显示正在加载...  
    this.setData({  
      loadingMore: true  
    });  
      
    // 模拟异步加载数据的过程，这里用setTimeout代替实际的请求  
    setTimeout(() => {  
      // 假设数据加载完成，更新状态并显示弹窗提示  
      this.setData({  
        loadingMore: false // 隐藏“正在加载...”  
        // 如果还有更多数据可以加载，这里不隐藏加载更多按钮  
      });  
        
      // 显示加载完成的弹窗提示  
      wx.showToast({  
        title: '加载完成',  
        icon: 'success',  
        duration: 500 // 持续时间，单位毫秒  
      });  
        
      // 如果需要加载更多数据到页面，可以在这里调用函数来更新页面数据  
      // this.loadMoreData();  
    }, 1000); // 假设1秒后加载完成，实际开发中应该是请求数据的时间  
  },  
  // 其他函数...  
});

//暂时不用了
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     activityList: [],
//     maxId: 0, //最大ID
//     minId: 0
//   },
//   getDataList() {
//     wx.request({
//       method: "GET",
//       url: api.bankActivity,
//       data: {
//         user_id:app.globalData.userInfo.uid
//       },
//       success: (res) => {
//         if (res.data.length > 0) {
//           this.data.maxId = res.data[0]['id']
//           this.data.minId = res.data[res.data.length - 1]['id']
//         }

//         this.setData({
//           activityList: res.data
//         })
//       },
//       complete: () => {
//         wx.stopPullDownRefresh() //数据获取到之后
//       }
//     })
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad(options) {
//     this.getDataList()
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh() {

//   },

//   doLoadMore(){
//     if(this.data.minId===0){
//       this.getDataList()
//       return
//     }
//     this.getReachButtomData()
//   },

//   getReachButtomData(){

//     //1.发送请求，获取 min_id=minId，比这个id更小的数据
//     wx.showLoading({
//       title: '加载中',
//     })
//     wx.request({
//       method: "GET",
//       url: api.bankActivity,
//       data: {
//         min_id: this.data.minId,
//         user_id:app.globalData.userInfo.uid
//       },
//       success: (res) => {
//         var response = res.data
//         if (response.length > 0) {
//           this.setData({
//             activityList: this.data.activityList.concat(response),
//             minId: response[response.length-1].id
//           })
//         } else {
//           wx.showToast({
//             title: '已经到底了',
//             icon: "none"
//           })
//         }
//       },
//       complete: () => {
//         wx.hideLoading()
//       }
//     })
//   },


//   bindExchange:function(e){
//     let activityId = e.currentTarget.dataset.aid
//     let index = e.currentTarget.dataset.index


//     wx.request({
//       url: api.bankExchange,
//       data:{
//         user_id:app.globalData.userInfo.uid,
//         activity_id:activityId
//       },
//       method:"GET",
//       success:(res) =>{
//         if(!res.data.status){
//           wx.showToast({
//             title: res.data.error,
//             icon: "none"
//           })
//         }else{
          
//           // activityList中  index 位置,  exchange=true
//           // 传统：1.读取activityList
//           // this.data.activityList[index].exchange=true
//           //       var tmp = this.data.activityList;
//           //       temp[index].exchange=true
//           //        
//           // 小程序：


//           this.setData({
//             ["activityList[" + index + "].exchange"]: true
//           })


//           wx.showToast({
//             title: '兑换成功，您目前的积分为' + res.data.score + "。",
//             icon:"none",
//             duration:25006
//           })
//         }
//       }
//     })

//   },
//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage() {

//   }
// })