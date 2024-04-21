const rootUrl = 'http://10.21.189.162:8002/api'
//'http://127.0.0.1:8002/api';   
   //http://10.21.189.162:8002/
// const rootUrl = 'https://bank.pythonav.com/api';
module.exports = {
  bank: rootUrl + "/bank/",
  bankStatistics: rootUrl + "/bank/statistics/",
  bankFace: rootUrl + "/bank/face/",
  bankVoice: rootUrl + "/bank/voice/",
  bankActivity: rootUrl + "/bank/activity/",
  bankGoods: rootUrl + "/bank/goods/",
  bankApply: rootUrl + "/bank/apply/",
  bankExchange: rootUrl + "/bank/exchange/",
  bankaichat:rootUrl+"/bank/aichat/",
  banktasks:rootUrl+"bank/tasks/",
  
  bankHrv: rootUrl + "/bank/hrv/",
  bankScore: rootUrl + "/bank/score/",
  bankexchangeRecord: rootUrl + "/bank/exchange/record/",
}