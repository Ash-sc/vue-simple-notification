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
      this.notificationArr.filter(item => {
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
<style lang="scss">
@font-face {
  font-family: 'icomoon';
  src:  url('../assets/fonts/icomoon.eot?tha90q');
  src:  url('../assets/fonts/icomoon.eot?tha90q#iefix') format('embedded-opentype'),
    url('../assets/fonts/icomoon.ttf?tha90q') format('truetype'),
    url('../assets/fonts/icomoon.woff?tha90q') format('woff'),
    url('../assets/fonts/icomoon.svg?tha90q#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}
.notification-bg {
  position: fixed;
  z-index: 9999;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;

  &.top-left {
    left: 20px;
    top: 20px;
  }

  &.top-center {
    left: 0px;
    top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  &.top-right {
    right: 20px;
    top: 20px;
  }

  &.center {
    left: 0;
    top: 0;
    margin-top: calc(50vh - 32px);
    margin-left: 50%;
    transform: translateX(-50%);
  }

  &.bottom-left {
    left: 20px;
    bottom: 20px;
  }

  &.bottom-center {
    left: 0;
    bottom: 0;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  &.bottom-right {
    right: 20px;
    bottom: 20px;
  }

  @keyframes notificationShow {
    0% {
      opacity: 0;
      right: -400px;
    }

    20% {
      opacity: 0;
      right: 0;
    }

    100% {
      opacity: 1;
      right: 0;
    }
  }

  @keyframes notificationHide {
    0% {
      opacity: 1;
    }

    30% {
      opacity: 0;
    }

    100% {
      height: 0;
      opacity: 0;
      padding: 0;
      margin: 0;
    }
  }

  .notification-item {
    min-width: 288px;
    max-width: 400px;
    border: 1px solid transparent;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 0 21px 0 rgba(0,0,0,.35);
    padding: 18px 24px 18px 74px;
    font-size: 14px;
    line-height: 26px;
    color: #fff;
    animation: notificationShow .3s both ease;
    user-select: none;
    box-sizing: border-box;
    position: relative;
  }

  .notification-item-success {
    background-color: #61b26c;
  }

  .notification-item-warning {
    background-color: #f89e35;
  }

  .notification-item-info {
    background-color: #a085bb;
  }

  .notification-item-error {
    background-color: #f16464;
  }

  .will-close {
    animation: notificationHide .2s both ease-in-out;
  }

  .notification-icon {
    font: normal normal normal 26px icomoon;
    position: absolute;
    line-height: 1;
    margin-left: -50px;
    color: #fff;
    text-align: center;
  }

  .icomoon-success::before {
    content: "\e900";
  }

  .icomoon-warning::before {
    content: "\e903";
  }

  .icomoon-info::before {
    content: "\e901";
  }

  .icomoon-error::before {
    content: "\e902";
  }

  .close-button {
    position: absolute;
    right: 2px;
    top: 2px;
    height: 20px;
    width: 20px;
    line-height: 20px;
    text-align: center;
    transform: rotate(45deg);
    font-size: 20px;
  }

}
</style>
