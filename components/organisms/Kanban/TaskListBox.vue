<template lang="pug">
  section.TaskListBox
    .header
      .name {{ name }}
      .count ポモ数：10/24
      .add ＋
</template>

<script>
export default {
  name: 'TaskListBox',
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

.TaskListBox {
  height: 100%;
  background-color: $color-gray-light;
  width: 280px;

  .header {
    display: flex;
    align-items: flex-end;
    margin: 1rem;
    line-height: 1.5;

    .name {
      @include type-heading;
      margin-right: 1rem;
    }

    .count {
      @include type-xsmall;
      padding: 0.1rem;
    }

    .add {
      @include type-normal;
      font-weight: bold;
      margin-right: 0.5rem;
      padding: 0.1rem;
      flex-grow: 1;
      text-align: right;
    }
  }
}
</style>
