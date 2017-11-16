<template>
  <div class="notification-bg">
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
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data: () => ({
    timer: null,
    notificationArr: []
  }),

  methods: {
    add: function(noticeProps) {
      clearInterval(this.timer)
      this.notificationArr.push({ ...noticeProps, willClose: false })
      this.refreshNotification()
      this.timer = setInterval(function() {
        this.refreshNotification()
      }.bind(this), 200)
    },
    remove: function(key) {
      console.log('close key', key)
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
  right: 20px;
  top: 20px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;

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

}
</style>
