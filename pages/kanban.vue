<template lang="pug">
  section.Kanban
    .box-list
      TaskListBox.list(
        v-for="(l, index) in list"
        :key="index"
        :name="l.name"
        :tasks="l.tasks"
      )
      AddList
</template>

<script>
import TaskListBox from '~/components/organisms/Kanban/TaskListBox'
import AddList from '~/components/organisms/Kanban/AddList'
import { TaskList } from '~/plugins/tmp'

export default {
  name: 'Kanban',
  components: {
    TaskListBox,
    AddList
  },
  data() {
    return {
      addList: false,
      list: [
        {
          name: 'IceBox',
          tasks: TaskList
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Kanban {
  margin: 3rem 3rem 1.5rem;
  overflow: hidden;

  .box-list {
    display: flex;
    height: 100%;
    width: 100%;
    overflow-x: scroll;
  }

  .list {
    margin-right: 2rem;
  }
}
</style>
