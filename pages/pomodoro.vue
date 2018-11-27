<template lang="pug">
  section.Pomodoro
    .pomodoro-box
      PomodoroHead
      Timer
      CurrentTask
</template>

<script>
import PomodoroHead from '~/components/organisms/Pomodoro/PomodoroHead'
import Timer from '~/components/organisms/Pomodoro/Timer'
import CurrentTask from '~/components/organisms/Pomodoro/CurrentTask'

export default {
  name: 'Pomodoro',
  components: {
    PomodoroHead,
    Timer,
    CurrentTask
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Pomodoro {
  .pomodoro-box {
    height: 80%;
    max-width: 700px;
    margin: 2rem auto;
    padding: 3rem 0;
    border: 1px solid $color-gray-light;
    text-align: center;
  }
}
</style>
