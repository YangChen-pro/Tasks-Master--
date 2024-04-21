<h1 align="center"><em>Task_Master：个人任务管理助手</em></h1>

<p align="center">
  <img src="https://yangchen-1318434888.cos.ap-beijing.myqcloud.com/images/202404211751679.jpg" alt="RepoAgent"/>
</p>


## 👾 背景

大学生在任务规划和时间管理方面存在明显不足，这导致了学习效率低下以及目标难以实现。然而，当前市场上的管理软件往往功能繁复且操作复杂，不符合学生的使用习惯。此外，安卓应用市场的情况也很复杂混乱，常见的应用程序体积庞大，消耗大量内存，从而影响用户体验。目前市场上的大多数管理类软件只能对任务进行简单的记录和提醒，对于任务的长期规划仍需具备大量知识储备和经验积累，因此门槛较高。调查显示，现今大学生群体普遍保持沉默，但却渴望社交，希望能够找到共同成长的伙伴。


**🏆 我们的目标是创建一个个人任务管理助手，帮助人们合理拆分大型复杂任务，最终帮助人们提高效率和节省时间。**

## ✨ 特性

- **🤖 智能任务拆分**：我们的助手能够智能地帮助用户将大型复杂任务拆分成更小、可管理的子任务，使任务更易于处理和完成。
- **📝 时间管理工具**：我们的助手提供时间管理工具，帮助用户合理安排任务和时间，以提高工作效率和时间利用率。
- **🔍 任务进度跟踪**：助手可以跟踪任务的进展情况，让用户清楚了解每个任务的状态和完成进度。
- **🕙 提醒与通知**：助手会发送提醒和通知，以确保用户不会错过重要的任务截止日期或关键的里程碑。
- **😍 用户友好界面**：我们的助手拥有简洁直观的用户界面，使用户能够轻松上手并高效地管理任务。



## 🚀 开始使用

### 安装方法

#### 使用git（首选）

直接使用clone获取`Task-Maskter`包：

```bash
git clone https://github.com/YangChen-pro/Tasks-Master--.git
```


### 配置Django服务器

#### 使用pip安装Django
```bash
pip install djangorestframework
```

在配置Django具体参数之前，请先确保服务器和客户端可以相互通信：

```python
import requests

# 发送 GET 请求到指定的 URL
response = requests.get('{服务器IP}:{端口}/')

# 检查响应状态码
if response.status_code == 200:
    # 打印响应内容
    print(response.text)
else:
    print('请求失败，状态码:', response.status_code)
```

如果需要修改运行参数，使用 `python manage.py runserver` 

```sh
python manage.py runserver 0.0.0.0:8000 
```

## 运行Task-Master

在Task-Master的用户界面中，你可以开始创建任务、管理任务和使用其他提供的特性。

# ✅ 未来工作

- [x] 社交功能：添加社交功能，让用户能够与其他用户进行交流、分享任务、互相支持和鼓励，创建一个共同成长的社区。

- [ ] 任务统计和报告：提供任务统计和报告功能，让用户能够查看任务完成情况、工作效率和时间利用情况的统计信息，以便进行分析和改进。

- [ ] 提醒和通知优化：改进提醒和通知系统，使其更加灵活和个性化，让用户能够根据自己的需求设置提醒方式和频率。

- [ ] 移动端应用开发：开发移动端应用程序，使用户能够在手机上方便地管理任务，实现跨平台的任务管理体验。


