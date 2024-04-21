// app.js
App({
  onLaunch() {
    //storage
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo: null
  },
  initUserInfo: function(name,score,avatar,uid) {
    var info = {
      name: name,
      score: score,
      avatar: avatar,
      uid:uid
    };
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo', info);
  },
  logoutUserInfo:function(){
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo=null;
  }
})
