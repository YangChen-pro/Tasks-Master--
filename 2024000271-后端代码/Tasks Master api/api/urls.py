from django.urls import path, re_path
from api.views import bank


urlpatterns = [
    re_path(r'^bank/$', bank.BankView.as_view()),
    re_path(r'^bank/(?P<pk>\d+)/$', bank.BankView.as_view()),
    re_path(r'^bank/tasks/$', bank.my_BankView.as_view()),
    re_path(r'^bank/tasks/(?P<pk>\d+)/$', bank.my_BankView.as_view()),
    re_path(r'^bank/statistics/$', bank.StatisticsView.as_view()),
    re_path(r'^bank/activity/$', bank.ActivityView.as_view()),
    re_path(r'^bank/goods/$', bank.GoodsView.as_view()),
    re_path(r'^bank/apply/$', bank.ApplyView.as_view()),
    re_path(r'^bank/exchange/$', bank.ExchangeView.as_view()),
    # 下面是人脸识别和声音识别的请求函数
    re_path(r'^bank/face/$', bank.FaceView.as_view()),
    re_path(r'^bank/aichat/$', bank.handle_wechat_request),
]



