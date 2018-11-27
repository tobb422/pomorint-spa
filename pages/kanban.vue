<template lang="pug">
  section.Kanban
    .box-list
      TaskListBox.list(
        v-for="(l, index) in list"
        :key="index"
        :name="l.name"
        :tasks="l.tasks"
      )
</template>

<script>
import TaskListBox from '~/components/organisms/Kanban/TaskListBox'
export default {
  name: 'Kanban',
  components: {
    TaskListBox
  },
  data() {
    return {
      list: [
        {
          name: 'IceBox',
          tasks: [
            'Scalaの勉強',
            'Rubyの勉強',
            'JSの勉強',
            'Goの勉強',
            'Pythonの勉強',
            'Kotlinの勉強'
          ]
        },
        {
          name: 'ToDo',
          tasks: [
            'Scalaの勉強',
            'Rubyの勉強',
            'JSの勉強',
            'Goの勉強',
            'Pythonの勉強',
            'Kotlinの勉強'
          ]
        },
        {
          name: 'InProgress',
          tasks: [
            'Scalaの勉強',
            'Rubyの勉強',
            'JSの勉強',
            'Goの勉強',
            'Pythonの勉強',
            'Kotlinの勉強'
          ]
        },
        {
          name: 'Done',
          tasks: [
            'Scalaの勉強',
            'Rubyの勉強',
            'JSの勉強',
            'Goの勉強',
            'Pythonの勉強',
            'Kotlinの勉強'
          ]
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
  margin: 3rem;

  .box-list {
    display: flex;
    height: 85vh;
    width: 100%;
  }

  .list {
    margin-left: 2rem;

    &:first-child {
      margin: 0;
    }
  }
}
</style>
