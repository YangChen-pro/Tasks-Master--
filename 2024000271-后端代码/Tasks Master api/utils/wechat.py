import os
import requests
import datetime
from django.conf import settings


class WechatMessage(object):
    """
    微信消息发送
    """

    def __init__(self):
        self.app_id = settings.WECHAT_APP_ID
        self.app_secret = settings.WECHAT_APP_SECRET

        self.token = None
        self.expires = None

        self.file_path = os.path.join(settings.BASE_DIR, 'openid.txt')

    def get_access_token(self):
        """
        获取微信全局接口的凭证(默认有效期俩个小时)
        如果不每天请求次数过多, 通过设置缓存即可
        """
        if self.expires and datetime.datetime.now() < self.expires:
            return self.token

        result_dict = requests.get(
            url="https://api.weixin.qq.com/cgi-bin/token",
            params={
                "grant_type": "client_credential",
                "appid": self.app_id,
                "secret": self.app_secret,
            }
        ).json()
        print(result_dict)
        token = result_dict.get('access_token')
        expires = result_dict.get('expires_in')

        if token and expires:
            self.token = token
            self.expires = datetime.datetime.now() + datetime.timedelta(seconds=expires)
            return token

    def notify(self, username, value, date, data_list, title="心率报警提醒，请尽快处理。"):
        token = self.get_access_token()
        if not token:
            return False

        if not os.path.exists(self.file_path):
            return

        with open(self.file_path, mode='r', encoding='utf-8') as f:
            openid_list = f.readlines()

        for openid in openid_list:
            print(openid)
            res = requests.post(
                url="https://api.weixin.qq.com/cgi-bin/message/template/send",
                params={
                    'access_token': token
                },
                json={
                    "touser": openid,
                    "template_id": '_pIlO6oWvCbdcj73oepSYp7138i9_YnTwzPXXf2T_20',
                    "data": {
                        "first": {
                            "value": title,
                        },
                        "keyword1": {
                            "value": "心率异常报警"
                        },
                        "keyword2": {
                            "value": "社区办事处",
                        },
                        "keyword3": {
                            "value": username
                        },
                        "keyword4": {
                            "value": "连续五次心率小于{}".format(value)
                        },
                        "keyword5": {
                            "value": date
                        },
                        "remark": {
                            "value": "连续五次心率的数据分别为：{}。".format(",".join(data_list)),
                            "color": "#173177"
                        },
                    }
                }
            )


wechat = WechatMessage()

if __name__ == '__main__':
    # success = wechat.send_comment_notify('基础入门', '武沛齐', '2020-11-11', '说得好')
    # success = wechat.answer_notify(111, '武沛齐', '2020-11-11', '说得好')
    pass
