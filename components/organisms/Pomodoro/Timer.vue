<template lang="pug">
  section.Timer
    .time {{ timer }}
    el-progress.progress-bar(:text-inside="true" :stroke-width="18" :percentage="timePer" color="#DB3C2C")
    .buttons
      el-button.reset(size="medium" @click="reset" v-if="timerOn") リセット
      el-button.start(size="medium" type="danger" @click="start" v-else) スタート
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Timer',
  computed: {
    timerOn() {
      return this.$store.state.timer.timerOn
    },
    ...mapGetters({
      timer: 'timer/timer',
      timePer: 'timer/timePer'
    })
  },
  methods: {
    start() {
      this.$store.dispatch('timer/start')
    },
    reset() {
      this.$store.dispatch('timer/reset')
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
