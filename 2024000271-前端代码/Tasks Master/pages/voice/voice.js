// pages/voice/voice.js
const recorderManager = wx.getRecorderManager()
const api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    record:false
  },

  recordStart:function(){
    this.setData({record:true})
    const options = {
      // duration: 6000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 48000,//编码码率
      format: 'PCM'//音频格式，有效值 aac/mp3
    }
    //开始录音
    recorderManager.start(options)
  },
  recordCancel:function(){
    console.log("停止");
    this.setData({record:false})
    wx.hideLoading()
  },
  recordStop:function(){
    if(!this.data.record){return}
    recorderManager.stop();
    recorderManager.onStop((res) => {
      // this.tempFilePath = res.tempFilePath 音频文件
      wx.showLoading()
      wx.uploadFile({
        filePath: res.tempFilePath,
        name: 'voice',
        url: api.bankVoice,
        success:(response)=>{
          console.log(response)
          // {'corpus_no': '6847771638436561158', 'result': ['你是不是打过来？'], 'sn': '15921476781594371078', 'err_msg': 'success.', 'err_no': 0}

          // {'err_msg': 'recognition error.', 'sn': '42272488611594371098', 'err_no': 3307}
          response = JSON.parse(response.data)
          if(response.err_no == 0){
              this.setData({
                content:this.data.content + response.result[0]
              })
          }else{
            wx.showToast({
              title: '识别失败，请重新操作！',
              icon: "none"
            })
          }
        },
        complete:()=>{
          wx.hideLoading()
        }
      },
      )
    })
    this.setData({record:false})
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