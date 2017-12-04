<template>
  <div class="notification-bg" :class="position">
    <div
      v-for="(item, index) in notificationArr"
      :key="item.closeTime"
      class="notification-item"
      :class="{'will-close': item.willClose, ['notification-item-' + item.type]: true }"
    >
      <span
        class="notification-icon"
        :class="`icomoon-${item.type}`"
      ></span>
      {{item.content}}
      <i class="close-button" v-if="closeBtn" @click="closeItem(index)">+</i>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data: () => ({
    timer: null,
    notificationArr: [],
    position: 'top-right',
    bubbling: 'up',
    closeBtn: false,
    onlyOneNotification: false
  }),

  methods: {
    add: function(noticeProps) {
      clearInterval(this.timer)
      if (!this.onlyOneNotification) {
        this.bubbling === 'up' ?
          this.notificationArr.push({ ...noticeProps, willClose: false })
          : this.notificationArr.splice(0, 0, { ...noticeProps, willClose: false })
      } else {
        this.notificationArr = [{ ...noticeProps, willClose: false }]
      }
      this.refreshNotification()
      this.timer = setInterval(function() {
        this.refreshNotification()
      }.bind(this), 200)
    },
    closeItem: function(index) {
      clearInterval(this.timer)
      this.notificationArr[index].willClose = true
      this.refreshNotification()
      this.timer = setInterval(function() {
        this.refreshNotification()
      }.bind(this), 200)
    },
    config: function(obj) {
      this.position = obj.position
      this.bubbling = obj.bubbling
      this.closeBtn = obj.closeBtn
      this.onlyOneNotification = obj.onlyOneNotification
    },
    refreshNotification: function() {
      this.notificationArr = this.notificationArr.filter(item => {
        const milliseconds = moment().format('x') - item.closeTime
        if (milliseconds >= 0) {
          item.willClose = true
        }
        return milliseconds < 400
      })
    }
  }
}
</script>
