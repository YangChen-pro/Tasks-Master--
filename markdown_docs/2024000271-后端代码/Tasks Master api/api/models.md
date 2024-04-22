## ClassDef UserInfo
**UserInfo**: UserInfo的功能是表示用户信息。
**属性**：该类的属性。
· uid: 表示用户ID，类型为CharField。
· name: 表示姓名，类型为CharField。
· avatar: 表示头像，类型为FileField。
· create_date: 表示日期，类型为DateField。
· score: 表示积分，类型为IntegerField，默认值为0。
· face_token: 表示FaceToken，类型为CharField。

**代码描述**：UserInfo类是用于表示用户信息的模型类。其中，uid用于存储用户的ID，name用于存储用户的姓名，avatar用于存储用户的头像文件路径，create_date用于记录用户信息创建日期，score用于记录用户的积分，face_token用于存储用户的FaceToken。

在项目中，UserInfo类被其他对象调用。例如，在BankListSerializer中，通过models.UserInfo.objects对用户信息进行统计；在BankListModelSerializer和BankCreateModelSerializer中，设置了对UserInfo模型的序列化规则；在BankView中，通过models.UserInfo.objects对用户信息进行操作；在StatisticsView中，通过models.UserInfo对用户信息进行统计；在ApplyCreateSerializer中，通过models.UserInfo.objects对用户信息进行验证；在ApplyView中，通过models.UserInfo.objects对用户信息进行操作；在ExchangeView中，通过models.UserInfo对用户信息进行操作；在FaceView中，通过models.UserInfo.objects对用户信息进行查询。

**注意**：在使用UserInfo类时，需要根据具体业务需求合理操作用户信息属性，确保数据的准确性和完整性。
## ClassDef TasksText
**TasksText**: TasksText的功能是表示任务的具体信息，包括任务具体信息、任务图片记录和任务截止时间。

**attributes**:
- detail: 任务具体信息，TextField类型，可为空。
- avatar: 任务图片记录，FileField类型，最大长度为128，上传至指定路径，可为空。
- deadline: 任务截止时间，CharField类型，最大长度为16。

**Code Description**:
TasksText是一个模型类，用于表示任务的具体信息。其中，detail属性用于存储任务的具体信息，avatar属性用于记录任务的图片，deadline属性用于表示任务的截止时间。这个模型类被其他部分调用，如在bank.py中的my_BankListSerializer/data中，通过models.TasksText.objects进行数据查询和统计。在bank.py中的my_BankListModelSerializer和my_BankCreateModelSerializer中，TasksText作为model被引用，用于序列化数据。在my_BankView中，TasksText被用于获取所有任务数据并根据请求方法返回不同的序列化类。

**Note**:
- 在使用TasksText模型类时，可以根据具体需求填写任务的具体信息、任务图片记录和任务截止时间。
- 需要注意的是，avatar属性上传的文件会保存在指定路径下。
## ClassDef Activity
**Activity**: Activity的功能是表示活动。

**属性**:
· title: 活动标题
· text: 活动描述
· date: 举办活动日期
· count: 报名人数
· score: 积分
· xxx: 参与者

**代码描述**:
Activity类代表了一个活动，具有活动标题、活动描述、举办活动日期、报名人数、积分和参与者等属性。其中，title是CharField类型，表示活动标题；text是TextField类型，表示活动描述；date是DateField类型，表示举办活动日期；count是IntegerField类型，表示报名人数；score是IntegerField类型，表示积分；xxx是ManyToManyField类型，表示参与者，通过JoinRecord关联到UserInfo模型。

在项目中，Activity类被其他对象调用。在bank.py的ActivityView中，Activity类被序列化为ActivityModelListSerializer，用于展示活动列表。在ApplyCreateSerializer中，通过validate_activity_id方法验证活动是否存在。在ApplyView的create方法中，创建了一个新的JoinRecord对象，并更新了对应活动的报名人数。

**注意**: 请注意Activity类的属性和关联对象的使用，确保正确处理活动信息和参与者的关联。
## ClassDef JoinRecord
**JoinRecord**: JoinRecord的功能是记录活动报名信息。
**attributes**:
· user: 用户对象，外键关联到UserInfo模型，级联删除。
· activity: 活动对象，外键关联到Activity模型，级联删除，related_name为'ac'。
· exchange: 布尔值，表示是否已兑换，默认为False。

**Code Description**:
JoinRecord类是用于记录用户报名活动的信息。其中，user属性是一个外键字段，关联到UserInfo模型，表示报名用户，级联删除。activity属性是另一个外键字段，关联到Activity模型，表示所报名的活动，级联删除，并且设置了related_name为'ac'。exchange属性是一个布尔字段，用于标记该报名记录是否已经兑换。

在项目中，JoinRecord类被其他对象调用。在bank.py的ActivityModelListSerializer中的get_exchange方法中，通过过滤user和activity来获取JoinRecord对象，并返回exchange属性的值。在ApplyView的create方法中，创建了JoinRecord对象来记录用户的报名信息，并更新了对应活动的报名人数。在ExchangeView的get方法中，对JoinRecord对象进行了处理，包括标记已兑换、更新用户积分等操作。

**Note**:
- 在使用JoinRecord类时，需要注意对user和activity属性的赋值，确保关联对象存在。
- exchange属性表示是否已兑换，可根据实际需求进行处理。
## ClassDef Goods
**Goods**: Goods的功能是表示商品和服务。

**属性**:
· img: 图片，类型为ImageField，用于存储商品的图片。
· title: 标题，类型为CharField，用于存储商品的标题。
· price: 积分，类型为IntegerField，表示商品的价格，默认值为0。

**代码描述**:
Goods类是一个Django模型，用于表示商品和服务。其中包含三个属性：img、title和price，分别用于存储商品的图片、标题和价格信息。

在项目中，Goods类被调用于以下位置：
1. 2024000271-后端代码/Tasks Master api/api/serializers/bank.py中的GoodsListSerializer类的Meta内部，用于指定序列化器的模型和字段。
2. 2024000271-后端代码/Tasks Master api/api/views/bank.py中的GoodsView类中，将Goods类的所有对象按照id倒序排列，并使用GoodsListSerializer进行序列化。

**注意**:
- 在使用Goods类时，可以通过img、title和price属性访问和操作商品的相关信息。
