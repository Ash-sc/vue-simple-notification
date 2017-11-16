# vue-simple-notification

> 一个简单的vue提示组件

> 效果如下：
![显示效果](https://raw.githubusercontent.com/Ash-sc/vue-simple-notification/master/example/demo.png)


### 1. 安装

``` bash
npm install vue-simple-notification
```


#### 2. 使用

> 方法 1：
```
# 全局注册
import Message from 'vue-simple-notification'
Vue.prototype.$Message = Message
...

# 使用
<script>

export default {
  method: {
    testNotification: function() {
      this.$Message.success('一条成功提示信息')
    }
  }
  ...
}
</script>
```
> 方法 2：
```
<script>
# 局部注册
import Message from 'vue-simple-notification'

# 使用
export default {
  method: {
    testNotification: function() {
      Message.success('一条成功提示信息')
    }
  }
  ...
}
</script>
```


#### 3. Message对象的方法

**Message有success()、info()、error()、warning()四个方法**

**参数：**

* **1. content：**
  * 提示信息内容
  * 是否必须：**必须**
* **2. duration**
  * 提示框持续时间（s）
  * 类型：**Number**
  * 是否必须：**非必须**
  * 默认值：3（s）


