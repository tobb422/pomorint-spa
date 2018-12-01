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
              ul.popover-inner(style="margin: 0.5rem")
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
              width="300"
              trigger="click"
            )
              ul.popover-inner(style="margin: 0.5rem")
                el-tag(
                  v-for="(label, index) in selectLabels"
                  :key="index"
                  style="margin: 0.5rem"
                  v-on:click.native="addLabel(label)"
                ) {{ label.name }}
              el-button.button-add-label(
                size="small"
                ref="addLabel"
                slot="reference"
              ) + New Tag
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
      title: '',
      labels: [],
      estimateCount: null,
      resultCount: null,
      description: '',
      newLabelName: '',
      selectLabels: [
        { name: 'ラベル1' },
        { name: 'ラベル2' },
        { name: 'ラベル3' },
        { name: 'ラベル4' }
      ]
    }
  },
  computed: mapState({
    isShown: state => state.modal.taskModal
  }),
  mounted() {
    const task = this.$store.state.task
    if (task.selected.title) {
      this.title = task.selected.title
      this.labels = [].concat(task.selected.labels)
      this.estimateCount = task.selected.estimateCount
      this.resultCount = task.selected.resultCount
      this.description = task.selected.description
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('task/removeTask')
      this.$store.dispatch('modal/hideTaskModal')
    },
    save() {
      console.log(this.task)
    },
    removeLabel(label) {
      this.labels.splice(this.labels.indexOf(label), 1)
    },
    addLabel(label) {
      this.$nextTick(_ => this.$refs.addLabel.$el.click())
      this.labels.push(label)
    },
    createNewLabel() {
      if (this.newLabelName.length > 0) {
        this.$nextTick(_ => this.$refs.newLabel.click())
        this.selectLabels.push({ name: this.newLabelName })
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
