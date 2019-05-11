<template lang="pug">
section.Pomodoro
  .pomodoro-box
    //PomodoroHead
    Timer
    CurrentTask(v-if="isSelectedTask")
    SelectTask(v-else)
</template>

<script>
import Timer from '~/components/organisms/Pomodoro/Timer'
import CurrentTask from '~/components/organisms/Pomodoro/CurrentTask'
import SelectTask from '~/components/organisms/Pomodoro/SelectTask'
import { mapGetters } from 'vuex'

export default {
  name: 'Pomodoro',
  components: {
    Timer,
    CurrentTask,
    SelectTask
  },
  computed: {
    ...mapGetters({
      isSelectedTask: 'pomodoro/isSelectedTask'
    })
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Pomodoro {
  position: relative;
  overflow-y: auto;

  .pomodoro-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    max-width: 700px;
    margin: auto;
    padding: 3rem 1.5rem;
    border: 1px solid $color-gray-light;
    text-align: center;

    @include forSP() {
      max-width: 280px;
      top: 60%;
    }
  }
}
</style>
