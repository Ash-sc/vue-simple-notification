<template>
  <div id="app">
    <h3>Vue Notification</h3>
    <button @click="notification('success')">success</button>
    <button @click="notification('info')">info</button>
    <button @click="notification('error')">error</button>
    <button @click="notification('warning')">warning</button>
  </div>
</template>

<script>
// import Message from './lib/index'

export default {
  methods: {
    notification: function(type) {
      const msg = {
        info: '这是一个提示消息',
        error: '错误提示消息',
        warning: '一个警告提示',
        success: '这是表示成功的消息'
      }
      this.$Message[type](msg[type])
      // Message[type](msg[type])
    }
  },
  created: function() {
    this.$Message.config({
      bubbling: 'up',
      closeBtn: true
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
