<template lang="pug">
  section.Pomodoro
    .pomodoro-box
      .header
        .title 第１回 スプリント
        .period （2018/09/10~ 2018/09/16）
      .main
        .task-count 3/47
        Timer
      .footer
        .card 現在のカード
        .card-box
          .head
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
import Timer from '~/components/organisms/Pomodoro/Timer'

export default {
  name: 'Pomodoro',
  components: { Timer }
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
    grid-template-areas: 'header' 'main' 'footer';
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

  .footer {
    .card {
      @include type-heading;
      margin-bottom: 0.5rem;
    }

    .card-box {
      border: 1px solid $color-sky;
      margin: 0 auto 3rem;
      padding: 1rem;
      width: 560px;
      text-align: left;
    }

    .head {
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
}
</style>
