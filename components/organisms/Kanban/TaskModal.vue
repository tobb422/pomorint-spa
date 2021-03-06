<template lang="pug">
  ModalWindow.TaskModal(:hide="hide")
    .content(slot="main")
      .header
        img(src="~/assets/images/task.png")
        el-input(v-model="title" placeholder="タイトル")
        .cross
          .cancel(@click="hide")
      .main
        .estimate
          .key ポモ予算
          .value
            el-input(v-model="estimateCount" placeholder="0")
            .unit ポモ
        .label
          .key
            .title ラベル
            NewLabel
          .value
            CustomizeLabels(
              :selectLabels="selectLabels",
              :addCallback="customizeLabelsAddCallBack",
              :removeCallback="customizeLabelsRemoveCallback"
            )
        .detail
          .key 詳細
          el-input.value(
            type="textarea"
            v-model="description"
            :rows="6"
            placeholder="Please input"
            resize="none"
          )
      .footer
        el-button.delete(@click="deleteTask" :disabled="isInit") 削除
        el-button.save(@click="save" :disabled="!availableSave") 保存
</template>

<script>
import ModalWindow from '~/components/molecules/ModalWindow'
import NewLabel from '~/components/molecules/NewLabel'
import CustomizeLabels from '~/components/molecules/CustomizeLabels'
import { mapState } from 'vuex'
import { LabelsApi, IssuesApi } from '~/api'
import { labelSerializer } from '~/serializers'

export default {
  name: 'TaskModal',
  components: {
    ModalWindow,
    NewLabel,
    CustomizeLabels
  },
  data() {
    return {
      id: null,
      title: '',
      estimateCount: null,
      resultCount: null,
      description: '',
      selectLabels: [],
      isInit: false
    }
  },
  computed: {
    availableSave() {
      return !!this.title && !!this.estimateCount
    },
    ...mapState({
      task: state => state.modal.task,
      list: state => state.modal.task.list
    })
  },
  async mounted() {
    const task = this.task
    if (task.id) {
      this.id = task.id
      this.title = task.title
      this.selectLabels = [].concat(task.labels)
      this.estimateCount = task.estimateCount
      this.resultCount = task.resultCount
      this.description = task.description
    } else {
      this.isInit = true
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('modal/hideTask')
    },
    deleteTask() {
      this.$store.dispatch('task/delete', { id: this.id }).then(_ => {
        this.$store.dispatch('toast/success', {
          message: 'タスクを削除しました'
        })
        this.hide()
      })
    },
    async save() {
      if (!this.availableSave) return

      const params = {
        title: this.title,
        issueBox: this.list,
        labels: [].concat(this.selectLabels),
        description: this.description,
        estimatePoint: parseInt(this.estimateCount)
      }

      if (this.id) {
        this.$store
          .dispatch('task/update', { id: this.id, ...params })
          .then(_ => {
            this.$store.dispatch('toast/success', {
              message: 'タスクを更新しました'
            })
            this.hide()
          })
      } else {
        this.$store.dispatch('task/create', params).then(_ => {
          this.$store.dispatch('toast/success', {
            message: 'タスクを作成しました'
          })
          this.hide()
        })
      }
    },
    customizeLabelsAddCallBack(label) {
      if (this.selectLabels.some(l => l.id === label.id)) {
        this.$store.dispatch('toast/error', {
          message: '既に選択済みのラベルです'
        })
        return
      }
      this.selectLabels.push(label)
    },
    customizeLabelsRemoveCallback(label) {
      this.selectLabels.splice(this.selectLabels.indexOf(label), 1)
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
    line-height: 1;

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

    & > .label > .key {
      display: flex;
    }
  }

  .el-textarea {
    width: calc(100% - 2rem);
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
