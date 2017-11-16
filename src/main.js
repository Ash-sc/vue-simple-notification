import Vue from 'vue'
import App from './App.vue'
import Message from './lib/index'

Vue.prototype.$Message = Message

new Vue({
  el: '#app',
  render: h => h(App)
})
