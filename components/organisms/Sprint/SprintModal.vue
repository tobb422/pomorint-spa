<template lang="pug">
  ModalWindow(
  class="TaskModal"
  :isShown="isShown"
  :hide="hide"
  )
    .content(slot="main")
      .header
        .cross
          .cancel(@click="hide")
      .main
        .period
          .label 期間
          .input
            el-date-picker(
              v-model="periodStart"
              type="date"
            )
            .while &nbsp~&nbsp
            el-date-picker(
              v-model="periodEnd"
              type="date"
            )
        .count
          .label ポモ数（予算）
          .input
            .while {{ resultCount }} /&nbsp
            el-input(v-model="estimateCount" type="number")
        el-button.edit-button(v-on:click.stop="save") 保存
</template>

<script>
import ModalWindow from '~/components/molecules/ModalWindow'
import { mapState } from 'vuex'

export default {
  name: 'SprintModal',
  components: {
    ModalWindow
  },
  data() {
    return {
      periodStart: null,
      periodEnd: null,
      estimateCount: 0,
      resultCount: 0,
      current: 0
    }
  },
  computed: mapState({
    isShown: state => state.modal.sprintModal
  }),
  mounted() {
    const sprint = this.$store.state.sprint
    if (sprint.selected.periodStart) {
      this.periodStart = sprint.selected.periodStart
      this.periodEnd = sprint.selected.periodEnd
      this.estimateCount = sprint.selected.estimateCount
      this.resultCount = sprint.selected.resultCount
      this.current = sprint.selected.current
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('sprint/removeSprint')
      this.$store.dispatch('modal/hideSprintModal')
    },
    save() {
      console.log(this.task)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.TaskModal {
  position: fixed;
  z-index: 1000;

  .content {
    display: grid;
    grid-template-areas: 'header' 'main';
    grid-template-rows: 1rem 1fr;
    grid-row-gap: 1rem;
    height: 100%;
  }

  .header {
    display: flex;
    align-items: end;

    .cross {
      cursor: pointer;
      display: flex;
      justify-content: flex-end;
      height: 100%;
      width: 100%;
    }

    .cancel {
      @include cross(16, $color-gray);
    }
  }

  .main {
    display: flex;
    flex-direction: column;

    & > div > .label {
      margin-bottom: 0.5rem;
    }

    & > div > .input {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .el-input {
      width: 150px;
    }

    .el-button {
      width: 150px;
      margin: 0 auto;
      background-color: $color-sky;
      color: $color-white;
    }
  }
}
</style>
