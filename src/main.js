import Vue from 'vue'
import App from './App.vue'
import Message from './lib/index'
import VueNotification from './lib/index.js'

Vue.use(VueNotification)

Vue.prototype.$Message = Message

new Vue({
  el: '#app',
  render: h => h(App)
})
