#!/usr/bin/env python
# -*- coding:utf-8 -*-
import base64
import requests


def register_image(user_id, user_info, file_object, group_id="got_face"):
    # 1. 获取 access token
    # client_id 为官网获取的AK， client_secret 为官网获取的SK
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=d83hlOE6YPCPWxiUeSmEsiEB&client_secret=5sjB260Iyy18yWaHzUBmry4lPRgZFsBU'
    response = requests.get(host)
    access_token = response.json().get("access_token")

    # 2. 图片进行base64编码
    # with open("wupeiqi.jpeg", mode='rb') as file:
    #     data = base64.b64encode(file.read())
    data = base64.b64encode(file_object.read())

    # 3. 上传图片
    res = requests.post(
        url="https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add",
        headers={
            "Content-Type": "application/json"
        },
        params={
            "access_token": access_token
        },
        data={
            "image": data,
            "image_type": "BASE64",
            "group_id": group_id,
            "user_id": user_id,
            "user_info": user_info,
        }
    )
    result = res.json()
    print(result)
    return result["result"]['face_token']


def search(file_object):
    # 1. 获取 access token
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=d83hlOE6YPCPWxiUeSmEsiEB&client_secret=5sjB260Iyy18yWaHzUBmry4lPRgZFsBU'

    response = requests.get(host)
    access_token = response.json().get("access_token")

    # 2. 图片进行base64编码
    data = base64.b64encode(file_object.read())

    # 3. 检验图片
    res = requests.post(
        url="https://aip.baidubce.com/rest/2.0/face/v3/search",
        headers={
            "Content-Type": "application/json"
        },
        params={
            "access_token": access_token
        },
        data={
            "image": data,
            "image_type": "BASE64",
            "group_id_list": "got_face",
            #"group_id_list": "text",
            "match_threshold": 80,
            "liveness_control": "HIGH",
        }
    )

    return res.json()


def delete(user_id, face_token, group_id="got_face"):
    # https://aip.baidubce.com/rest/2.0/face/v3/faceset/face/delete

    # 1. 获取 access token
    # client_id 为官网获取的AK， client_secret 为官网获取的SK
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=d83hlOE6YPCPWxiUeSmEsiEB&client_secret=5sjB260Iyy18yWaHzUBmry4lPRgZFsBU'


    response = requests.get(host)
    access_token = response.json().get("access_token")

    # 2. 检验图片
    res = requests.post(
        url="https://aip.baidubce.com/rest/2.0/face/v3/faceset/face/delete",
        headers={
            "Content-Type": "application/json"
        },
        params={
            "access_token": access_token
        },
        data={
            "user_id": user_id,
            "group_id": group_id,
            "face_token": face_token
        }
    )

import json
def get_access_token():
    """
    使用 API Key，Secret Key 获取access_token，替换下列示例中的应用API Key、应用Secret Key
    """

    url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=NSIN2IbvSQvr2HIhm6fUEY4q&client_secret=jAk8HOkVOa4yE6MndM223SLLbrhFChPR"

    payload = json.dumps("")
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    #返回获取到的access_token
    return response.json().get("access_token")


if __name__ == '__main__':
    # search()
    pass