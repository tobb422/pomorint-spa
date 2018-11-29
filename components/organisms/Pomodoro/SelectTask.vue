<template lang="pug">
  section.SelectTask
    .header カードの選択
    .box
      el-tabs(v-model="activeName")
        el-tab-pane(label="IceBox" name="IceBox")
        el-tab-pane(label="ToDo" name="ToDo")
        el-tab-pane(label="InProgress" name="InProgress")
        el-tab-pane(label="Done" name="Done")
      ul.tasks
        li(v-for="(task, index) in currentTask" :key="index" @click="select(task)") {{ task.title }}
</template>

<script>
import { TaskList } from '~/plugins/tmp'

export default {
  name: 'SelectTask',
  props: {
    select: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      activeName: 'IceBox',
      taskList: TaskList
    }
  },
  computed: {
    currentTask() {
      return this.taskList.find(tl => tl.name === this.activeName).tasks
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.SelectTask {
  .header {
    @include type-heading;
    margin-bottom: 0.5rem;
  }

  .box {
    border: 1px solid $color-sky;
    margin: 0 auto;
    padding: 1rem;
    width: 560px;
    text-align: left;
  }

  ul.tasks {
    height: 150px;
    overflow-y: scroll;

    & > li {
      margin-bottom: 1rem;
    }
  }
}
</style>
