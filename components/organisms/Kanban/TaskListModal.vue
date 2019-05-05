<template lang="pug">
  ModalWindow.TaskListModal(:hide="hide")
    .content(slot="main")
      .header
        .cross
          .cancel(@click="hide")
      .main
        .label リストタイトル
        el-input(size="large" v-model="title" placeholder="")
      .footer
        el-button.delete(@click="deleteList" :disabled="isInit") 削除
        el-button.save(@click="saveList" :disabled="!availableSave") 保存
</template>

<script>
import ModalWindow from '~/components/molecules/ModalWindow'
import { mapState } from 'vuex'

export default {
  name: 'TaskListModal',
  components: {
    ModalWindow
  },
  data() {
    return {
      title: '',
      isInit: false
    }
  },
  computed: {
    availableSave() {
      return !!this.title
    },
    ...mapState({
      list: state => state.modal.taskList
    })
  },
  mounted() {
    const list = Object.assign({}, this.list)
    if (list.id) {
      this.title = list.title
    } else {
      this.isInit = true
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('modal/hideTaskList')
    },
    loanFunc(action, params) {
      this.$store.dispatch(`taskList/${action}`, params).then(this.hide)
    },
    deleteList() {
      this.loanFunc('delete', {
        id: this.list.id
      })
    },
    saveList() {
      if (!this.availableSave) return

      if (this.isInit) {
        this.loanFunc('add', {
          name: this.title
        })
      } else {
        this.loanFunc('update', {
          id: this.list.id,
          name: this.title
        })
      }
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
      &:disabled {
        opacity: 0.3;
      }
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
