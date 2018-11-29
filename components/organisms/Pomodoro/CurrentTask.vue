<template lang="pug">
  section.CurrentTask
    .header
      .title 現在のカード
      el-button(@click="cancel") カードの変更
    .box
      .overview
        .title {{ task.title }}
        .count ポモ数： {{ task.resultCount }}/{{ task.estimateCount }}
      .description Scalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよ
      .label-wrap
        el-tag.label(closable) label1
        el-tag.label(closable) label2
        el-tag.label(closable) label3
        el-tag.label(closable) label4
        el-tag.label(closable) label6
</template>

<script>
export default {
  name: 'CurrentTask',
  props: {
    cancel: {
      type: Function,
      required: true
    },
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

.CurrentTask {
  .header {
    margin: 0 auto 0.5rem;
    width: 560px;
    display: grid;
    grid-template-areas: 'header';
    align-items: center;

    .title {
      grid-area: header;
      @include type-heading;
    }

    .el-button {
      grid-area: header;
      justify-self: end;
      font-size: 0.25rem;
      width: 6.5rem;
    }
  }

  .box {
    border: 1px solid $color-sky;
    margin: 0 auto;
    padding: 1rem;
    width: 560px;
    text-align: left;
  }

  .overview {
    display: flex;
    align-items: center;

    .title {
      @include type-heading;
      margin-right: 1rem;
    }
  }

  .description {
    margin: 1rem 0;
    line-height: 1.5;
  }

  .label-wrap {
    display: flex;

    & > .label {
      margin-right: 1rem;
    }
  }
}
</style>
