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
          tasks: [
            {
              title: 'Scalaの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Rubyの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'JSの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Goの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Pythonの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Kotlinの勉強',
              estimateCount: 6,
              resultCount: 4
            }
          ]
        },
        {
          name: 'ToDo',
          tasks: [
            {
              title: 'Scalaの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Rubyの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'JSの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Goの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Pythonの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Kotlinの勉強',
              estimateCount: 6,
              resultCount: 4
            }
          ]
        },
        {
          name: 'InProgress',
          tasks: [
            {
              title: 'Scalaの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Rubyの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'JSの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Goの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Pythonの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Kotlinの勉強',
              estimateCount: 6,
              resultCount: 4
            }
          ]
        },
        {
          name: 'Done',
          tasks: [
            {
              title: 'Scalaの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Rubyの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'JSの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Goの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Pythonの勉強',
              estimateCount: 6,
              resultCount: 4
            },
            {
              title: 'Kotlinの勉強',
              estimateCount: 6,
              resultCount: 4
            }
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
