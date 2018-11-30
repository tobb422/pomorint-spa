<template lang="pug">
  ModalWindow(
    class="TaskModal"
    :isShown="isShown"
    :hide="hide"
  )
    .content(slot="main")
      .header
        img(src="~/assets/images/task.png")
        el-input(v-model="task.title" placeholder="タイトル")
        .cross
          .cancel(@click="hide")
      .main
        .estimate
          .key ポモ予算
          .value
            el-input(v-model="task.estimateCount" placeholder="0")
            .unit ポモ
        .label
          .key ラベル
          .value
            el-tag(v-for="(label, index) in task.labels" :key="index" size="small") {{ label.name }}
            .add-tag ＋
        .detail
          .key 詳細
          el-input.value(
            type="textarea"
            v-model="task.description"
            :rows="4.5"
            placeholder="Please input"
            resize="none"
          )
      .footer
        el-button.delete 削除
        el-button.save(@click="save") 保存
</template>

<script>
import ModalWindow from '~/components/molecules/ModalWindow'
import { mapState } from 'vuex'

export default {
  name: 'TaskModal',
  components: {
    ModalWindow
  },
  data() {
    return {
      task: {}
    }
  },
  computed: mapState({
    isShown: state => state.modal.taskModal
  }),
  mounted() {
    const task = this.$store.state.task
    if (task.selected) {
      this.task = Object.assign({}, task.selected)
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('task/removeTask')
      this.$store.dispatch('modal/hideTaskModal')
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
    grid-template-areas: 'header' 'main' 'footer';
    grid-template-rows: 1.5rem 1fr 4.5em;
    grid-row-gap: 1rem;
    height: 100%;
  }

  .header {
    grid-area: header;
    display: grid;
    grid-template-areas: 'icon title cross';
    grid-template-columns: 2.5rem 5fr 1fr;
    align-items: center;

    & > img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }

    .title {
      @include type-heading;
    }

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
    grid-area: main;
    @include type-small;

    & > div {
      margin: 1rem;
      display: flex;
      flex-direction: column;
    }

    & > div > .value {
      margin: 0.5rem 1rem;
      @include type-normal;
    }

    & > .estimate > .value {
      display: grid;
      grid-template-areas: 'input unit';
      grid-template-columns: 3rem 1fr;
      grid-column-gap: 1rem;
      align-items: center;
    }

    & > .label > .value {
      display: flex;
      align-items: center;
    }
  }

  .el-tag {
    margin-right: 0.5rem;
  }

  .add-tag {
    height: 1rem;
    width: 1rem;
    background-color: $color-gray-lighter;
    @include type-xsmall;
    line-height: 1.4;
    text-align: center;
  }

  .el-textarea {
    width: calc(100% - 2rem);
  }

  .footer {
    margin: 0 1rem;
    grid-area: footer;
    display: grid;
    grid-template-areas: 'delete save';

    & > button {
      width: 7rem;
      height: 3rem;
      color: $color-white;
    }

    & > button.delete {
      background-color: $color-accent;
    }

    & > button.save {
      justify-self: end;
      background-color: $color-sky;
    }
  }
}
</style>
