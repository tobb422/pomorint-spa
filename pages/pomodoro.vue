<template lang="pug">
  section.Pomodoro
    .pomodoro-box
      .header
        .title 第１回 スプリント
        .period （2018/09/10~ 2018/09/16）
      .main
        .task-count 3/47
        Timer
        CurrentTask
</template>

<script>
import Timer from '~/components/organisms/Pomodoro/Timer'
import CurrentTask from '~/components/organisms/Pomodoro/CurrentTask'

export default {
  name: 'Pomodoro',
  components: {
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
    border: 1px solid $color-gray-light;

    display: grid;
    grid-template-areas: 'header' 'main';
    text-align: center;
  }

  .header {
    margin-top: 3rem;

    .title {
      @include type-large;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .period {
      @include type-heading;
    }
  }

  .main {
    .task-count {
      @include type-heading;
      margin: 1rem 0;
    }
  }
}
</style>
