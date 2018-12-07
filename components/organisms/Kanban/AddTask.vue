<template lang="pug">
  section.AddTask
    .title + 新しいカードを追加する
</template>

<script>
export default {
  name: 'AddTask'
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.AddTask {
  width: 100%;
  background-color: $color-white;
  opacity: 0.5;
  border-radius: 0.5rem;
  padding: 1rem;

  .title {
    @include type-normal;
  }
}
</style>
