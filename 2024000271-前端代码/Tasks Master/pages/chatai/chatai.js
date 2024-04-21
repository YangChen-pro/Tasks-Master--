// pages/activity/activity.js
var app = getApp()
const api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInput: '吃饭',
   //activityList: [],
   // maxId: 0, //最大ID
   // minId: 0,
    startDate: '2024-01-01',
    endDate: '2024-6-31',
    steps: []
  },
  onput(e) {
    this.setData({ userInput: e.detail.value });
  },
   
    //选择起始日期
  bindStartDateChange: function(e) {
      this.setData({
        startDate: e.detail.value
      });
    },
    //选择结束日期
  bindEndDateChange: function(e) {
      this.setData({
        endDate: e.detail.value
      });
    },
    
    
      // ... 其他代码
    
      // 发送请求到Django后端的函数
    sendRequestToDjango() {
       
    
        // Django服务器的URL
        
    const url = 'http://10.21.189.162:8002/api/bank/aichat/';
        // 发送POST请求
        wx.request({
          url: url,
          method: 'POST',
          data: {
            chat_text: this.data.userInput,
            start_time: this.data.startDate,
            end_time: this.data.endDate
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: (res) => {
            // 请求成功时的处理逻辑
            //------------------认证通过不用打印了--------------------------------
            //console.log(res.data); // 打印返回的JSON数据
            //console.log(res.data.result);
           
      
            // 解析清理后的JSON字符串
            try {
              
              const jsonString = res.data.result.match(/(\{[\s\S]*\})/)[1];
              const result =  JSON.parse(jsonString);

              // 更新页面数据中的steps数组
              this.setData({
                steps: result.steps
              });
            } catch (e) {
              // 解析错误时的处理逻辑
              console.error("JSON解析错误：", e);
            }
          },
          fail: (err) => {
            // 请求失败时的处理逻辑
            console.error("请求失败：", err);
          }
        });
      },
    
      // ... 其他代码
    
    
      doApply(e) {
        const aid = e.currentTarget.dataset.aid;
        const stepIndex = this.data.steps.findIndex(step => step.id === aid);
      
        if (stepIndex !== -1) {
          const step = this.data.steps[stepIndex];
          const endtime = step.endtime;
          const content = step.task_content;
      
          const urls= 'http://10.21.189.162:8002/api/bank/tasks/';
  
         
          wx.request({
            url: urls,
            method: 'POST',
            data: {
              detail: content,
              deadline: endtime
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: (res) => {
              console.log(res.data);
              // 处理成功响应
              this.data.steps.splice(stepIndex, 1); // 从steps中删除步骤
              this.setData({ steps: this.data.steps }); // 更新steps数据
            },
            fail: (err) => {
              console.error(err);
              // 处理错误
            }
          });
        } else {
          console.error('没有找到对应的步骤');
        }
      },

   

  //用来得到任务拆解表单
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