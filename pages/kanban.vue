<template lang="pug">
section.Kanban
  .box-list
    TaskListBox.list(v-for="list in lists" :key="list.id" :taskList="list")
    AddList.add-list
    component(:is="modalName")
</template>

<script>
import TaskListBox from '~/components/organisms/Kanban/TaskListBox'
import AddList from '~/components/organisms/Kanban/AddList'
import TaskModal from '~/components/organisms/Kanban/TaskModal'
import TaskListModal from '~/components/organisms/Kanban/TaskListModal'
import { mapGetters } from 'vuex'

export default {
  name: 'Kanban',
  components: {
    TaskListBox,
    AddList,
    TaskModal,
    TaskListModal
  },
  data() {
    return {
      modalName: ''
    }
  },
  computed: mapGetters({
    lists: 'taskList/lists'
  }),
  mounted() {
    this.$store.dispatch('taskList/fetchLists')
    this.$store.watch(
      _ => this.$store.state.modal.task,
      res => (this.modalName = res.isShow ? 'TaskModal' : '')
    )
    this.$store.watch(
      _ => this.$store.state.modal.taskList,
      res => (this.modalName = res.isShow ? 'TaskListModal' : '')
    )
  }
}
</script>

<style scoped lang="scss">
.Kanban {
  margin: 2rem 3rem 1.5rem;
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

  .add-list {
    height: 3rem;
  }
}
</style>
