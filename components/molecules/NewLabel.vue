<template lang="pug">
el-popover.popover.NewLabel(
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
</template>

<script>
export default {
  name: 'NewLabel',
  data() {
    return {
      newLabelName: ''
    }
  },
  methods: {
    async createNewLabel() {
      if (this.newLabelName.length <= 0) return

      const result = await this.$store
        .dispatch('label/post', { name: this.newLabelName })
        .catch(_ => false)

      if (!result) return

      this.newLabelName = ''
      this.$nextTick(_ => this.$refs.newLabel.click())
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.NewLabel {
  img.edit-label {
    height: 1rem;
    margin-left: 0.5rem;
  }

  .el-tag,
  .el-button.button-add-label {
    margin: 0 0.5rem 0.5rem 0;
  }
}
</style>
