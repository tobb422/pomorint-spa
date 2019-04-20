<template lang="pug">
  ModalWindow.TaskModal(
    :isShown="isShown"
    :hide="hide"
  )
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
            NewLabel(:callback="newLabelCallBack")
          .value
            CustomizeLabels(
              :labels="labels",
              :selectLabels="selectLabels",
              :addCallback="customizeLabelsAddCallBack",
              :removeCallback="customizeLabelsRemoveCallBack",
              :deleteCallback="customizeLabelsDeleteCallback"
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
        el-button.delete(@click="deleteTask") 削除
        el-button.archive(@click="archive") アーカイブ
        el-button.save(@click="save") 保存
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
      labels: [],
      estimateCount: null,
      resultCount: null,
      description: '',
      selectLabels: []
    }
  },
  computed: mapState({
    isShown: state => state.modal.taskModal,
    taskList: state => state.task.selectedTaskList
  }),
  async mounted() {
    const task = this.$store.state.task
    if (task.selected.title) {
      this.id = task.selected.id
      this.title = task.selected.title
      this.labels = [].concat(task.selected.labels)
      this.estimateCount = task.selected.estimateCount
      this.resultCount = task.selected.resultCount
      this.description = task.selected.description
    }

    const res = await new LabelsApi().index()
    this.selectLabels = labelSerializer(res)
  },
  methods: {
    hide() {
      this.$store.dispatch('task/removeTask')
      this.$store.dispatch('modal/hideTaskModal')
    },
    deleteTask() {
      this.$store
        .dispatch('task/deleteTask', { id: this.id })
        .then(_ => this.hide())
    },
    archive() {
      this.$store
        .dispatch('task/archiveTask', { id: this.id })
        .then(_ => this.hide())
    },
    async save() {
      const params = {
        title: this.title,
        issueBox: this.taskList,
        labels: [].concat(this.labels),
        description: this.description,
        estimatePoint: parseInt(this.estimateCount)
      }
      if (this.id) {
        this.$store
          .dispatch('task/updateTask', { id: this.id, ...params })
          .then(_ => this.hide())
      } else {
        this.$store.dispatch('task/createTask', params).then(_ => this.hide())
      }
    },
    customizeLabelsAddCallBack(label) {
      this.labels.push(label)
    },
    customizeLabelsRemoveCallback(label) {
      this.labels.splice(this.labels.indexOf(label), 1)
    },
    customizeLabelsDeleteCallback(label) {
      this.selectLabels = this.selectLabels.filter(l => l.id !== label.id)
    },
    async newLabelCallBack(res) {
      this.selectLabels.push(res)
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
