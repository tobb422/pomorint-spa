<template lang="pug">
  section.Sprint
    .title スプリント一覧
    .table-box
      .table-columns
        .period 期間
        .count ポモ数
        .achievementRate 達成率
      .table-data(
        v-for="(d, index) in tableData"
        :key="index"
      )
        .period {{ d.period }}
        .count {{ d.count }}
        .achievementRate(:class="achievementClass(d.achievementRate)") {{ d.achievementRate.toString() + ' %' }}
    el-button(v-if="moreShow" @click="toggleMoreShow") 閉じる
    el-button(v-else @click="toggleMoreShow") さらに表示する
</template>

<script>
export default {
  name: 'Sprint',
  data() {
    return {
      data: [
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 11,
          resultCount: 10
        },
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 13,
          resultCount: 5
        },
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 15,
          resultCount: 2
        },
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 14,
          resultCount: 7
        }
      ],
      moreShow: false
    }
  },
  computed: {
    tableData() {
      return (_ => {
        if (this.moreShow) {
          return this.data
        } else {
          return this.data.slice(0, 2)
        }
      })().map(d => {
        return {
          period: d.periodStart + ' ~ ' + d.periodEnd,
          count: d.resultCount + ' / ' + d.estimateCount,
          achievementRate:
            Math.ceil((d.resultCount / d.estimateCount) * 1000) / 10
        }
      })
    }
  },
  methods: {
    achievementClass(rate) {
      console.log(rate)
      if (rate >= 85) {
        return 'high'
      } else if (rate < 50) {
        return 'low'
      } else {
        return 'normal'
      }
    },
    toggleMoreShow() {
      this.moreShow = !this.moreShow
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Sprint {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    @include type-large;
    font-weight: bold;
    margin: 3rem 0 1rem;
  }

  .table-box {
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 2rem 0;
    border: 1px solid $color-gray-lighter;
  }

  .table-columns,
  .table-data {
    display: flex;
    width: 100%;
    border: 0.5px solid $color-gray-lighter;

    & > div {
      @include type-title;
      text-align: center;
      padding: 1.5rem 0;
    }

    & > .period {
      flex-basis: 50%;
    }

    & > .count {
      flex-basis: 25%;
      border-right: 0.5px solid $color-gray-lighter;
      border-left: 0.5px solid $color-gray-lighter;
    }

    & > .achievementRate {
      flex-basis: 25%;
    }
  }

  .high {
    color: $color-sky;
  }

  .low {
    color: $color-accent;
  }

  .el-button {
    width: 150px;
  }
}
</style>
