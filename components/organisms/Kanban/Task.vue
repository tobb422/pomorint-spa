<template lang="pug">
  section.Task
    .title {{ name }}
    .count ポモ数：4/6
    .label-wrap
      el-tag.label(size="small") label1
      el-tag.label(size="small") label2
</template>

<script>
export default {
  name: 'Task',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Task {
  margin: 1rem 0;
  width: 100%;
  background-color: $color-white;
  border-radius: 0.5rem;
  padding: 1rem;

  display: grid;
  grid-template-areas: 'name count' 'label label';
  grid-gap: 1rem;
  align-items: center;

  .title {
    @include type-title;
  }

  .count {
    @include type-xsmall;
  }

  .label-wrap {
    display: flex;

    & > .label {
      flex-basis: 5rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
