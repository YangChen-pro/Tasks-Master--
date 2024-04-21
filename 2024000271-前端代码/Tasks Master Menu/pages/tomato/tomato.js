const app = getApp();

Page({
  data: {
    timer: null,
    minutes: '25',
    seconds: '00',
    inputMinutes: '25',  // 默认时间
    running: false
  },

  inputChange: function(e) {
    this.setData({ inputMinutes: e.detail.value });
  },

  startTimer: function() {
    if (this.data.running) return;
    let totalSeconds = parseInt(this.data.inputMinutes) * 60;
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      wx.showToast({
        title: '请输入有效的分钟数',
        icon: 'none'
      });
      return;
    }

    this.setData({ 
      running: true,
      minutes: String(Math.floor(totalSeconds / 60)).padStart(2, '0'),
      seconds: '00'
    });

    this.data.timer = setInterval(() => {
      totalSeconds--;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      this.setData({
        minutes: minutes < 10 ? '0' + minutes : '' + minutes,
        seconds: seconds < 10 ? '0' + seconds : '' + seconds
      });

      if (totalSeconds <= 0) {
        clearInterval(this.data.timer);
        this.setData({ running: false });
        this.playEndSound();
        wx.showToast({
          title: '时间到！',
          icon: 'success'
        });
      }
    }, 1000);
  },

  stopTimer: function() {
    clearInterval(this.data.timer);
    this.setData({ running: false });
  },

  resetTimer: function() {
    clearInterval(this.data.timer);
    this.setData({ 
      minutes: this.data.inputMinutes.padStart(2, '0'), 
      seconds: '00', 
      running: false 
    });
  },

  playEndSound: function() {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = '/sounds/sounds.mp3'; // 确保将声音文件放在sounds文件夹中
    innerAudioContext.play();
  }
});
