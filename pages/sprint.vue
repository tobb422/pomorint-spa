<template lang="pug">
  section.Sprint
    .header
      .title スプリント一覧
      el-button(@click="startEdit(-1)") 新規作成
    .table-box
      .table-columns
        .period 期間
        .count ポモ数
        .achievementRate 達成率
      .table-data(
        v-for="(d, index) in tableData"
        :key="index"
        :class="{ current: d.current }"
        @click="startEdit(index)"
      )
        .period {{ d.periodStart }} ~ {{ d.periodEnd }}
        .count {{ d.resultCount }} / {{ d.estimateCount }}
        .achievementRate(:class="achievementClass(d.achievementRate)") {{ d.achievementRate.toString() + ' %' }}
    el-button(v-if="moreShow" @click="toggleMoreShow") 閉じる
    el-button(v-else-if="data.length > 8" @click="toggleMoreShow") さらに表示する
    component(:is="modalName")
</template>

<script>
import SprintModal from '~/components/organisms/Sprint/SprintModal'

export default {
  name: 'Sprint',
  components: {
    SprintModal
  },
  data() {
    return {
      periodStart: '',
      periodEnd: '',
      estimateCount: 0,
      data: [
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 11,
          resultCount: 10,
          current: true
        },
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 13,
          resultCount: 5,
          current: false
        },
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 15,
          resultCount: 2,
          current: false
        },
        {
          periodStart: '2018/09/10',
          periodEnd: '2018/09/16',
          estimateCount: 14,
          resultCount: 7,
          current: false
        }
      ],
      moreShow: false,
      createModal: false
    }
  },
  computed: {
    tableData() {
      return (_ => {
        if (this.moreShow) {
          return this.data
        } else {
          return this.data.slice(0, 8)
        }
      })().map(d => {
        return {
          periodStart: d.periodStart,
          periodEnd: d.periodEnd,
          resultCount: d.resultCount,
          estimateCount: d.estimateCount,
          achievementRate:
            Math.ceil((d.resultCount / d.estimateCount) * 1000) / 10,
          current: d.current
        }
      })
    },
    modalName() {
      if (this.createModal) {
        return 'SprintModal'
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.$store.watch(
      _ => this.$store.state.modal.sprintModal,
      res => (this.createModal = res)
    )
  },
  methods: {
    achievementClass(rate) {
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
    },
    startEdit(index) {
      const sprint = (_ => {
        if (index >= 0) {
          return this.data[index]
        } else {
          return {}
        }
      })()
      this.$store.dispatch('sprint/selectSprint', sprint)
      this.$store.dispatch('modal/showSprintModal')
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
  width: 780px;
  margin: 0 auto;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 3rem 0 1rem;

    .title {
      @include type-large;
      font-weight: bold;
      margin-right: 1rem;
    }

    .el-button {
      height: 50%;
      width: 100px;
      color: $color-white;
      background-color: $color-sky;
    }
  }

  .table-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0.5rem 0 3rem;
    border: 1px solid $color-gray-lighter;
  }

  .table-columns,
  .table-data {
    display: grid;
    grid-template-areas: 'p c ar';
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
    border: 0.5px solid $color-gray-lighter;
    align-items: center;

    & > div {
      @include type-title;
      text-align: center;
      padding: 1.5rem 0;
    }

    & > .period {
      grid-area: p;
    }

    & > .count {
      grid-area: c;
      height: 100%;
      border-right: 0.5px solid $color-gray-lighter;
      border-left: 0.5px solid $color-gray-lighter;
    }

    & > .achievementRate {
      grid-area: ar;
    }
  }

  .table-data:hover {
    background-color: $color-gray-lighter;
  }

  .table-data.current {
    position: relative;
    &::before {
      content: '';
      background-image: url('~assets/images/flag.png');
      background-size: 100%;
      background-repeat: no-repeat;
      width: 1.5rem;
      position: absolute;
      top: 1rem;
      bottom: 1rem;
      left: -2.5rem;
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

  .el-popover.popover {
    position: absolute;
    top: 1rem;
  }

  img.edit-label {
    width: 1rem;
  }
}
</style>
