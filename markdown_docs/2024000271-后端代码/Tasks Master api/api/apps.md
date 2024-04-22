## ClassDef ApiConfig
**ApiConfig**: ApiConfig的功能是设置api应用程序的配置。

**attributes**:
· default_auto_field: 'django.db.models.BigAutoField'
· name: 'api'

**Code Description**:
ApiConfig类继承自AppConfig类，用于配置api应用程序的相关属性。其中，default_auto_field属性设置为'django.db.models.BigAutoField'，表示默认自动字段为BigAutoField类型；name属性设置为'api'，表示应用程序的名称为'api'。

**Note**:
- 在使用ApiConfig类时，可以根据需要修改default_auto_field和name属性来定制api应用程序的配置。
