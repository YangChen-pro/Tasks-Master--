## ClassDef Migration
**Migration**: Migration的功能是执行数据库迁移操作。

**attributes**:
· initial: 一个布尔值，表示是否为初始迁移。
· dependencies: 一个空列表，表示迁移的依赖关系。
· operations: 一个包含数据库操作的列表。

**Code Description**:
Migration类继承自migrations.Migration类，用于定义数据库迁移操作。在operations属性中，包含了一个migrations.CreateModel操作，用于创建名为UserInfo的模型。UserInfo模型包含了多个字段，如id、uid、area、name等，每个字段都定义了相应的数据类型和属性。

在UserInfo模型中，id字段为自增主键，uid字段为CharField类型，area字段为IntegerField类型且包含了选择项，name字段为CharField类型，avatar字段为FileField类型，create_date字段为DateField类型且设置为自动添加当前日期，face_token字段为CharField类型，score字段为IntegerField类型且设置了默认值为0。

**Note**: 在使用Migration类时，可以根据实际需求修改operations属性中的数据库操作，以实现数据库结构的变更和迁移。
