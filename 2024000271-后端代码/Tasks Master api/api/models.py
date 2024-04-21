from django.db import models


# Create your models here.
class UserInfo(models.Model):
    """ 用户信息 """
    uid = models.CharField(verbose_name="ID", max_length=64)

    name = models.CharField(verbose_name="姓名", max_length=32)
    avatar = models.FileField(verbose_name="头像", max_length=128, upload_to='bank/%Y/%m/%d/')
    create_date = models.DateField(verbose_name="日期", auto_now_add=True)
    score = models.IntegerField(verbose_name="积分", default=0)
    face_token = models.CharField(verbose_name="FaceToken", max_length=32)

class TasksText(models.Model):
    """ 任务 """
    # 任务具体信息
    detail = models.TextField(verbose_name="任务具体信息", null=True, blank=True)
    avatar = models.FileField(verbose_name="任务图片记录", max_length=128, upload_to='bank/%Y/%m/%d/', null=True)
    #avatar = models.FileField(verbose_name="头像", max_length=128, upload_to='bank/%Y/%m/%d/')
    # 任务截止时间

    deadline = models.CharField(verbose_name="任务截止时间",max_length=16)


class Activity(models.Model):
    """ 活动 """
    title = models.CharField(verbose_name="活动标题", max_length=128)
    text = models.TextField(verbose_name="活动描述", null=True, blank=True)
    date = models.DateField(verbose_name="举办活动日期")

    count = models.IntegerField(verbose_name='报名人数', default=0)
    score = models.IntegerField(verbose_name="积分", default=0)

    xxx = models.ManyToManyField(verbose_name="参与者",
                                 through="JoinRecord",
                                 through_fields=("activity", "user"),
                                 to="UserInfo")

class JoinRecord(models.Model):
    """ 活动报名记录 """
    user = models.ForeignKey(verbose_name='用户', to="UserInfo", on_delete=models.CASCADE)
    activity = models.ForeignKey(verbose_name="活动", to="Activity", on_delete=models.CASCADE, related_name='ac')

    exchange = models.BooleanField(verbose_name="是否已兑换", default=False)


class Goods(models.Model):
    """ 商品和服务 """
    img = models.ImageField(verbose_name="图片", max_length=128, upload_to='bank/%Y/%m/%d/')
    title = models.CharField(verbose_name="标题", max_length=32)
    price = models.IntegerField(verbose_name="积分", default=0)
