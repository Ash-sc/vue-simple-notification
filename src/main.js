import Vue from 'vue'
import App from './App.vue'
import Message from './lib/index'
import './assets/style.scss'

Vue.prototype.$Message = Message

new Vue({
  el: '#app',
  render: h => h(App)
})
