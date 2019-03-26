<template lang="pug">
  ModalWindow(
    class="TaskModal"
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
            el-popover.popover(
              placement="bottom"
              width="300"
              trigger="click"
            )
              .popover-inner(style="margin: 0.5rem")
                .title 新しいラベルを作成
                .wrap(style="display: flex; align-items: center")
                  el-input(v-model="newLabelName" placeholder="ラベル名")
                  el-button(
                    style="margin: 0.5rem; background-color: #87CEFA; color: #fff"
                    v-on:click.native="createNewLabel"
                  ) 作成
              img.edit-label(src="~/assets/images/setting.png" slot="reference" ref="newLabel")
          .value
            el-tag(
              v-for="(label, index) in labels"
              :key="index"
              closable
              @close="removeLabel(label)"
            ) {{ label.name }}
            el-popover.popover(
              placement="bottom"
              width="200"
              trigger="click"
            )
              .popover-inner(style="margin: 0.5rem")
                .title(style="margin-bottom: 0.5rem") 追加するラベルを選択
                .edit-tag(v-if="onEditLabel")
                  el-form(ref="form" :model="selectLabel")
                    el-input(v-model="selectLabel.name")
                  .button-box(style="margin: 1rem 0; display: flex;")
                    el-button(
                      style="width: 100%; background-color: #F66322; color: #fff"
                      @click="deleteSelectLabel"
                    ) 削除
                    el-button(
                      style="width: 100%; background-color: #87CEFA; color: #fff"
                      @click="saveSelectLabel"
                    ) 保存
                .tag-box(style="height: 200px; overflow-y: scroll" v-else)
                  .tag(
                    v-for="(label, index) in selectLabels"
                    :key="index"
                    style="display: flex; align-items: center; height: 3rem;"
                  )
                    el-tag(
                      style="margin: 1rem; flex-basis: 5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                      v-on:click.native="addLabel(label)"
                    ) {{ label.name }}
                    img(
                      src="~/assets/images/setting.png"
                      style="height: 1rem; flex-basis: 1rem; justify-self: end"
                      @click="editLabel(label)"
                    )
              el-button.button-add-label(
                size="small"
                ref="addLabel"
                slot="reference"
              ) + 追加
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
        el-button.delete 削除
        el-button.archive(@click="archive") アーカイブ
        el-button.save(@click="save") 保存
</template>

<script>
import ModalWindow from '~/components/molecules/ModalWindow'
import { mapState } from 'vuex'
import { LabelsApi, IssuesApi } from '~/api'
import { labelSerializer } from '~/serializers'

export default {
  name: 'TaskModal',
  components: {
    ModalWindow
  },
  data() {
    return {
      id: null,
      title: '',
      labels: [],
      estimateCount: null,
      resultCount: null,
      description: '',
      newLabelName: '',
      selectLabels: [],
      selectLabel: {},
      onEditLabel: false
    }
  },
  computed: mapState({
    isShown: state => state.modal.taskModal
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
    editLabel(label) {
      this.selectLabel = label
      this.onEditLabel = true
    },
    deleteSelectLabel() {
      new LabelsApi().delete(this.selectLabel.id).then(_ => {
        this.onEditLabel = false
        this.selectLabels = this.selectLabels.filter(
          label => label.id !== this.selectLabel.id
        )
      })
    },
    saveSelectLabel() {
      new LabelsApi().update(this.selectLabel).then(_ => {
        this.onEditLabel = false
      })
    },
    hide() {
      this.$store.dispatch('task/removeTask')
      this.$store.dispatch('modal/hideTaskModal')
    },
    archive() {
      new IssuesApi().archive({ id: this.id })
    },
    save() {
      new IssuesApi().create({
        title: this.title,
        labels: this.labels,
        description: this.description,
        estimatePoint: this.estimateCount
      })
    },
    removeLabel(label) {
      this.labels.splice(this.labels.indexOf(label), 1)
    },
    addLabel(label) {
      this.$nextTick(_ => this.$refs.addLabel.$el.click())
      this.labels.push(label)
    },
    async createNewLabel() {
      if (this.newLabelName.length > 0) {
        const res = await new LabelsApi().create({ name: this.newLabelName })
        this.$nextTick(_ => this.$refs.newLabel.click())
        this.selectLabels.push(labelSerializer(res))
        this.newLabelName = ''
      }
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
      align-items: center;
      img.edit-label {
        height: 1rem;
        margin-left: 0.5rem;
      }
    }

    & > .label > .value {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  .el-tag,
  .el-button.button-add-label {
    margin: 0 0.5rem 0.5rem 0;
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
