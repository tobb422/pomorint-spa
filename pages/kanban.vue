<template lang="pug">
  section.Kanban
    .box-list
      TaskListBox.list(
        v-for="(name, index) in ['IceBox', 'ToDo', 'In Progress', 'Done']"
        :key="index"
        :name="name"
      )
</template>

<script>
import TaskListBox from '~/components/organisms/Kanban/TaskListBox'

export default {
  name: 'Kanban',
  components: {
    TaskListBox
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
