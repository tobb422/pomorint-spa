<template lang="pug">
  section.Task
    .title {{ task.title }}
    .count {{ task.resultCount }}/{{ task.estimateCount }}
    .label-wrap
      el-tag.label(
        v-for="(label, index) in task.labels"
        :key="index"
        size="small"
      ) {{ label.name }}
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
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
  margin-bottom: 1rem;
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
    grid-area: count;
    justify-self: end;
  }

  .label-wrap {
    grid-area: label;
    display: flex;
    flex-wrap: wrap;

    & > .label {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
