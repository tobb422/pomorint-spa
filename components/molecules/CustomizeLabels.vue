<template lang="pug">
.CustomizeLabels
  el-tag(
    v-for="(label, index) in selectLabels"
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
      .edit-tag(v-if="Object.keys(selectLabel).length > 0")
        el-form(ref="form" :model="selectLabel")
          el-input(v-model="selectLabel.name")
        .button-box(style="margin: 1rem 0; display: flex;")
          el-button(
            style="width: 100%; background-color: #F66322; color: #fff"
            @click="deleteSelectLabel"
          ) 削除
          el-button(
            style="width: 100%; background-color: #87CEFA; color: #fff"
            @click="editSelectLabel"
          ) 保存
      .tag-box(style="height: 200px; overflow-y: scroll" v-else)
        .tag(
          v-for="(label, index) in labels"
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
            @click="setSelectLabel(label)"
          )
    el-button.button-add-label(
      size="small"
      ref="addLabel"
      slot="reference"
    ) + 追加
</template>

<script>
import { LabelsApi } from '~/api'
import { mapState } from 'vuex'

export default {
  name: 'CustomizeLables',
  props: {
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
    }
  },
  data() {
    return {
      selectLabel: {}
    }
  },
  computed: mapState({
    labels: state => state.label.labels
  }),
  mounted() {
    this.$store.dispatch('label/index')
  },
  methods: {
    addLabel(label) {
      this.$nextTick(_ => this.$refs.addLabel.$el.click())
      this.addCallback(label)
    },
    removeLabel(label) {
      this.removeCallback(label)
    },
    setSelectLabel(label) {
      this.selectLabel = Object.assign({}, label)
    },
    resetSelectLabel() {
      this.selectLabel = {}
    },
    deleteSelectLabel() {
      this.$store
        .dispatch('label/delete', { label: this.selectLabel })
        .then(this.resetSelectLabel)
    },
    editSelectLabel() {
      this.$store
        .dispatch('label/put', { label: this.selectLabel })
        .then(this.resetSelectLabel)
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
