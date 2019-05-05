<template lang="pug">
section.AddList
  .on(v-if="addList")
    el-input(v-model="title")
    el-button.cancel(size="mini" @click="toggleAddList") キャンセル
    el-button.add(size="mini" @click="createList") 作成
  .off(v-else @click="toggleAddList") ＋ 新しいリストを追加する
</template>

<script>
export default {
  name: 'AddList',
  data() {
    return {
      addList: false,
      title: null
    }
  },
  methods: {
    toggleAddList() {
      this.addList = !this.addList
    },
    createList() {
      if (this.title) {
        this.$store.dispatch('taskList/addTaskList', { name: this.title })
      }
      this.toggleAddList()
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

  .on {
    padding-bottom: 0;
    height: 7rem;
    display: grid;
    grid-template-areas: 'input input' 'cancel add';
  }

  .el-input {
    grid-area: input;
  }

  .el-button {
    width: 6rem;
    height: 2rem;
    @include type-xsmall;
    color: $color-white;
  }

  .el-button.cancel {
    grid-area: cancel;
    background-color: $color-gray;
  }

  .el-button.add {
    grid-area: add;
    justify-self: end;
    background-color: $color-sky;
  }

  .off {
    opacity: 0.5;
    height: 3rem;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
