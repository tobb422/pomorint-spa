<template lang="pug">
section.AddList(@click="openTaskListModal") ＋ 新しいリストを追加する
</template>

<script>
export default {
  name: 'AddList',
  methods: {
    openTaskListModal() {
      this.$store.dispatch('modal/showTaskList', {})
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.AddList {
  min-width: 280px;
  background-color: $color-gray-lighter;
  padding: 1rem;

  &:hover {
    opacity: 0.8;
  }
}
</style>
