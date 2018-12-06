<template lang="pug">
  section.Stats
    .max 最高記録
      .table-column
        .day １日
        .week 週間
      .table-data
        .day 10
        .week 55
    .average 平均
      .table-column
        .day １日
        .week 週間
      .table-data
        .day 6
        .week 19
    .week-chart
      .label 曜日別直近ポモ数
      BarCharts.chart(:label="'ポモ数'" :labels="['月', '火', '水', '木', '金', '土', '日']", :data="[1, 4, 6, 3, 7, 5, 9]")
    .transition
      .label 推移グラフ
      LineCharts.chart(:label="'ポモ数'" :labels="['月', '火', '水', '木', '金', '土', '日']", :data="[1, 4, 6, 3, 7, 5, 9]")
</template>

<script>
import BarCharts from '~/components/molecules/BarCharts'
import LineCharts from '~/components/molecules/LineCharts'

export default {
  name: 'Stats',
  components: {
    BarCharts,
    LineCharts
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Stats {
  margin: 3rem auto;
  height: 100vh;
  width: 780px;
  display: grid;
  grid-template-areas: 'max ave' 'week tran';
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;

  .max {
    grid-area: max;
  }

  .average {
    grid-area: ave;
  }

  .table-column {
    margin-top: 0.5rem;
  }

  .table-column,
  .table-data {
    display: grid;
    grid-template-areas: 'day week';
    grid-template-columns: 1fr 1fr;
    width: 100%;
    border: 0.5px solid $color-gray-lighter;
    align-items: center;

    & > .day {
      border-right: 0.5px solid $color-gray-lighter;
    }

    & > div {
      padding: 0.5rem;
    }
  }

  .week-chart {
    grid-area: week;
    margin: 0 auto;
  }

  .transition {
    grid-area: tran;
    margin: 0 auto;
  }

  div > .chart {
    width: 350px;
    height: 350px;
  }
}
</style>
