<template lang="pug">
.CustomizeLabels
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
</template>

<script>
import { LabelsApi } from '~/api'

export default {
  name: 'CustomizeLables',
  props: {
    labels: {
      type: Array,
      required: true
    },
    selectLabels: {
      type: Array,
      required: true
    },
    addCallback: {
      type: Function,
      required: true
    },
    removeCallback: {
      type: Function,
      required: true
    },
    deleteCallback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      selectLabel: {},
      onEditLabel: false
    }
  },
  methods: {
    addLabel(label) {
      this.$nextTick(_ => this.$refs.addLabel.$el.click())
      this.addCallBack(label)
    },
    removeLabel(label) {
      this.removeCallback(label)
    },
    editLabel(label) {
      this.selectLabel = label
      this.onEditLabel = true
    },
    deleteSelectLabel() {
      new LabelsApi().delete(this.selectLabel.id).then(_ => {
        this.onEditLabel = false
        this.deleteCallback(this.selectLabel)
      })
    },
    saveSelectLabel() {
      new LabelsApi().update(this.selectLabel).then(_ => {
        this.onEditLabel = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.CustomizeLabels {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .el-tag,
  .el-button.button-add-label {
    margin: 0 0.5rem 0.5rem 0;
  }
}
</style>
