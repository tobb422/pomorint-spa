<template lang="pug">
  section.Timer
    .time {{ timer }}
    el-progress.progress-bar(:text-inside="true" :stroke-width="18" :percentage="timePer" color="#DB3C2C")
    .buttons
      el-button.reset(size="medium" @click="reset" v-if="timerOn") リセット
      el-button.start(size="medium" type="danger" @click="start" v-else) スタート
</template>

<script>
export default {
  name: 'Timer',
  data() {
    return {
      min: 25,
      sec: 0,
      timerOn: false,
      timerObj: null
    }
  },
  computed: {
    timer() {
      const time2str = time => {
        const str = time.toString()
        if (str.length < 2) {
          return '0' + str
        }
        return str
      }
      return time2str(this.min) + ':' + time2str(this.sec)
    },
    timePer() {
      const total = 25 * 60
      const remain = total - (this.min * 60 + this.sec)
      return Math.floor((remain / total) * 100)
    }
  },
  methods: {
    count() {
      if (this.sec <= 0 && this.min >= 1) {
        --this.min
        this.sec = 59
      } else if (this.sec <= 0 && this.min <= 0) {
        this.complete()
      } else {
        --this.sec
      }
    },
    start() {
      this.timerObj = setInterval(_ => this.count(), 1000)
      this.timerOn = true
    },
    reset() {
      clearInterval(this.timerObj)
      this.timerOn = false
      this.min = 25
      this.sec = 0
    },
    complete() {
      clearInterval(this.timerObj)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Timer {
  .time {
    @include type-xlarge;
    font-weight: bold;
  }

  .progress-bar {
    margin: 1rem auto 2rem;
    width: 400px;
  }

  .buttons {
    margin: 1rem auto 2rem;
  }

  .start {
    border-color: $color-theme;
    color: $color-theme;
    background-color: $color-white;

    &:hover {
      background-color: $color-theme;
      color: $color-white;
      opacity: 0.7;
    }

    &:active {
      background-color: $color-theme;
      color: $color-white;
      opacity: 1;
    }
  }
}
</style>
