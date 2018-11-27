<template lang="pug">
  section.Pomodoro
    .pomodoro-box
      .header
        .title 第１回 スプリント
        .period （2018/09/10~ 2018/09/16）
      .main
        .task-count 3/47
        .stopwatch 25:00
        el-progress.progress-bar(:text-inside="true" :stroke-width="18" :percentage="50" color="#DB3C2C")
        .buttons
          el-button.start(type="danger") スタート
          el-button.reset リセット
      .footer
        .card 現在のカード
        .card-box
          .head
            .title Scalaの勉強
            .count ポモ数： 4/6
          .description Scalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよScalaの勉強をするカードだよ
          ul.label-wrap
            li.label label1
            li.label label2
            li.label label3
            li.label label4
            li.label label5
</template>

<script>
export default {
  name: 'Pomodoro'
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

    .stopwatch {
      @include type-xlarge;
      font-weight: bold;
    }

    .progress-bar {
      margin: 1rem auto 2rem;
      width: 400px;
    }

    .buttons {
      margin: 1rem 6rem 2rem;
      display: grid;
      grid-template-areas: 'start reset';
      grid-gap: 5rem;
    }

    .start {
      border-color: $color-theme;
      color: $color-theme;
      background-color: $color-white;

      &:hover {
        background-color: $color-theme;
        color: $color-white;
        opacity: 0.7;
      }

      &:active {
        background-color: $color-theme;
        color: $color-white;
        opacity: 1;
      }
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

    ul {
      display: flex;

      & > li {
        margin-right: 1rem;
      }
    }

    .label {
      background-color: $color-theme;
      color: $color-gray-lighter;
      padding: 0.25rem 0.5rem;
      border-radius: 3px;
    }
  }
}
</style>
