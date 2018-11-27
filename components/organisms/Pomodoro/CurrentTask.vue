<template lang="pug">
  section.CurrentTask
    .header 現在のカード
    .box
      .overview
        .title Scalaの勉強
        .count ポモ数： 4/6
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
  name: 'CurrentTask'
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.CurrentTask {
  .header {
    @include type-heading;
    margin-bottom: 0.5rem;
  }

  .box {
    border: 1px solid $color-sky;
    margin: 0 auto 3rem;
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
