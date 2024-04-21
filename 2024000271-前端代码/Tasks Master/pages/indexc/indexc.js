const app = getApp();

Page({
  data: {
     




    spotMap: {
      y2022m5d9: 'deep-spot',
      y2022m5d10: 'spot',
      y2022m6d10: 'spot',
      y2022m7d10: 'spot',
      y2022m8d10: 'spot',
      y2022m10d1: 'spot',
      y2023m5d10: 'spot',
    },
    // 例子，今天之后的日期不能被选中
    // disabledDate({ day, month, year }) {
    //   const now = new Date();
    //   const date = new Date(year, month - 1, day);
    //   return date > now;
    // },
    // 需要改变日期时所使用的字段
    changeTime: '',
    // 存储已经获取过的日期
    dateListMap: [],
    dataDict: {
      data: [
        {
        "id": 20,
        "name": "原神",
        //"area": "#19",
        "avatar": "http://10.21.189.162:8002/media/bank/2023/03/26/Da8MrcRbPrlP88ba2275f8eed46877cd88ee2fa37789.jpg" } ]
     }





  },
  // 获取日期数据，通常用来请求后台接口获取数据
  getDateList({ detail }) {
    // 检查是否已经获取过该月的数据
    if (this.filterGetList(detail)) {
      // 获取数据
      console.log(detail, '获取数据');
    





      
    }
  },
  // 过滤重复月份请求的方法
  filterGetList({ setYear, setMonth }) {
    const dateListMap = new Set(this.data.dateListMap);
    const key = `y${setYear}m${setMonth}`;
    if (dateListMap.has(key)) {
      return false;
    }
    dateListMap.add(key);
    this.setData({
      dateListMap: [...dateListMap],
    });
    return true;
  },
  // 日期改变的回调
  //在这里修改完成
  selectDay({ detail }) {
    console.log(detail, '在这里改哦');
    var month = ('0' + detail.month).slice(-2); // 确保月份是两位数
    var day = ('0' + detail.day).slice(-2); // 确保日期是两位数
    var date = detail.year + '-' + month + '-' + day;
    console.log(date); // 输出: "year-month-date"
    
    
         
        
  },

       
     

  // 展开收起时的回调
  openChange({ detail }) {
    console.log(detail, 'openChange detail');
  },
  
  
});
