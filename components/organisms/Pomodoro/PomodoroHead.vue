<template lang="pug">
  section.PomodoroHead
    .title 現在のスプリント
    .period 2018/09/10 ~ 2018/09/16
    .task-count 3 / 47
</template>

<script>
export default {
  name: 'PomodoroHead'
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.PomodoroHead {
  .title {
    @include type-large;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .period {
    @include type-heading;
  }

  .task-count {
    @include type-heading;
    margin: 1rem 0;
  }
}
</style>
