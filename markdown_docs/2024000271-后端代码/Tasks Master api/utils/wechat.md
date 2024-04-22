## ClassDef WechatMessage
**WechatMessage**: WechatMessage的功能是微信消息发送。

**attributes**:
- app_id: 微信应用ID
- app_secret: 微信应用密钥
- token: 微信接口凭证
- expires: 凭证过期时间
- file_path: 存储openid的文件路径

**Code Description**:
WechatMessage类包含了用于发送微信消息的方法。在初始化时，会设置微信应用ID和密钥，以及一些其他属性。get_access_token方法用于获取微信全局接口的凭证，如果缓存中存在且未过期，则直接返回凭证，否则通过请求获取并更新凭证信息。notify方法用于向指定用户发送模板消息，首先获取访问凭证，然后读取存储openid的文件，逐个发送消息给对应用户。

**Note**:
- 需要确保在使用notify方法前已设置好app_id和app_secret。
- 需要确保openid.txt文件存在且包含有效的openid信息。

**Output Example**:
无
### FunctionDef __init__(self)
**__init__**: __init__函数的作用是初始化WechatMessage对象的属性。

**参数**：该函数没有参数。

**代码描述**：在这个__init__函数中，首先将settings.WECHAT_APP_ID和settings.WECHAT_APP_SECRET分别赋值给self.app_id和self.app_secret属性。然后将self.token和self.expires属性初始化为None。接着，使用os.path.join方法将settings.BASE_DIR和'openid.txt'拼接成一个文件路径，并将其赋值给self.file_path属性。

**注意**：在使用该函数时，确保settings.WECHAT_APP_ID、settings.WECHAT_APP_SECRET和settings.BASE_DIR这些变量已经在代码中定义和赋值。
***
### FunctionDef get_access_token(self)
**get_access_token**: get_access_token函数的功能是获取微信全局接口的凭证。

**参数**:
- 无

**代码描述**:
该函数首先检查当前的凭证是否存在且未过期，如果未过期则直接返回现有的凭证。若凭证不存在或已过期，则向微信服务器发送请求以获取新的凭证。获取到新的凭证后，更新对象的token和expires属性，并返回新的凭证。

在项目中，该函数被WechatMessage类中的notify方法调用。在notify方法中，首先调用get_access_token函数获取访问令牌，然后使用该令牌向微信服务器发送模板消息通知。

**注意**:
- 需要正确配置app_id和app_secret属性才能成功获取访问令牌。
- 凭证的有效期为两个小时，建议根据实际需求设置缓存以减少请求次数。

**输出示例**:
假设成功获取到访问令牌，则返回类似于"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInVzZXJfbmFtZSI6ImFkbWluIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJleHAiOjE1MTYyMzkwMjJ9.5sT6Dy6B9YU9Z3vYX2VQ6r2rZ2m7g7z2JdUwJ7v9q6A" 的访问令牌。
***
### FunctionDef notify(self, username, value, date, data_list, title)
**notify**: notify函数的功能是向特定用户发送微信模板消息通知。

**参数**:
- username: 用户名
- value: 心率数值
- date: 日期
- data_list: 数据列表
- title: 消息标题，默认为"心率报警提醒，请尽快处理。"

**代码描述**:
该函数首先调用get_access_token函数获取访问令牌。然后，检查文件路径是否存在，读取文件中的openid列表。接着，针对每个openid，向微信服务器发送模板消息通知，包括消息标题、关键词和备注等内容。

在项目中，notify函数被WechatMessage类中的notify方法调用，用于实现向用户发送心率异常报警的微信通知。

**注意**:
- 需要正确配置app_id和app_secret属性才能成功获取访问令牌。
- openid列表来自文件路径，确保文件存在且包含有效的openid。
- 消息内容包括标题、关键词和备注，确保数据格式正确。

**输出示例**:
假设成功发送通知，则无返回值。
***
