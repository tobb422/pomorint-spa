<template lang="pug">
  ModalWindow(
    class="TaskListModal"
    :isShown="isShown"
    :hide="hide"
  )
    .content(slot="main")
      .header
        .cross
          .cancel(@click="hide")
      .main
        .label リストタイトル
        el-input(size="large" v-model="title" placeholder="")
      .footer
        el-button.delete 削除
        el-button.archive アーカイブ
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
      title: ''
    }
  },
  computed: mapState({
    isShown: state => state.modal.taskListModal
  }),
  mounted() {
    const taskList = this.$store.state.taskList
    if (taskList.selected.title) {
      this.title = taskList.selected.title
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('task-list/removeTaskList')
      this.$store.dispatch('modal/hideTaskListModal')
    },
    save() {
      console.log(this.title)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.TaskListModal {
  position: fixed;
  z-index: 1000;

  .content {
    display: grid;
    grid-template-areas: 'header' 'main' 'footer';
    grid-template-rows: 1.5rem 1fr 4.5em;
    grid-row-gap: 1rem;
    margin: 0 1rem;
    height: 100%;
  }

  .header {
    grid-area: header;

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
    line-height: 1;

    .label {
      @include type-heading;
      width: 100%;
      margin-bottom: 1rem;
    }

    .el-input {
      display: block;
      width: 300px;
      @include type-title;
    }
  }

  .footer {
    grid-area: footer;
    display: grid;
    grid-template-areas: 'delete archive . save';

    & > button {
      width: 7rem;
      height: 3rem;
      color: $color-white;
    }

    & > button.delete {
      grid-area: delete;
      background-color: $color-accent;
    }

    & > button.archive {
      grid-area: archive;
      background-color: $color-gray;
    }

    & > button.save {
      grid-area: save;
      justify-self: end;
      background-color: $color-sky;
    }
  }
}
</style>
