<template lang="pug">
section.Kanban
  el-dropdown(split-button type="primary" size="mini") 絞り込み
    el-dropdown-menu(slot="dropdown")
      el-dropdown-item(v-on:click.native="removeFilter") 取り消す
      el-dropdown-item(v-for="label in labels" v-on:click.native="filter(label.id)") {{ label.name }}
  .box-list
    TaskListBox.list(v-for="list in filterLists" :key="list.id" :taskList="list")
    AddList.add-list
    component(:is="modalName")
</template>

<script>
import TaskListBox from '~/components/organisms/Kanban/TaskListBox'
import AddList from '~/components/organisms/Kanban/AddList'
import TaskModal from '~/components/organisms/Kanban/TaskModal'
import TaskListModal from '~/components/organisms/Kanban/TaskListModal'
import { mapState, mapGetters } from 'vuex'

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
      modalName: '',
      filterLabelId: null
    }
  },
  computed: {
    ...mapState({
      labels: state => state.label.labels
    }),
    ...mapGetters({
      lists: 'taskList/lists'
    }),
    filterLists() {
      if (this.filterLabelId === null) {
        return this.lists
      }

      return this.lists.map(list => {
        const tasks = list.tasks.filter(task =>
          task.labels.map(l => l.id).includes(this.filterLabelId)
        )
        const filterList = Object.assign({}, list)
        filterList.tasks = tasks
        return filterList
      })
    }
  },
  mounted() {
    this.$store.dispatch('taskList/fetchLists')
    this.$store.dispatch('label/index')
    this.$store.watch(
      _ => this.$store.state.modal.task,
      res => (this.modalName = res.isShow ? 'TaskModal' : '')
    )
    this.$store.watch(
      _ => this.$store.state.modal.taskList,
      res => (this.modalName = res.isShow ? 'TaskListModal' : '')
    )
  },
  methods: {
    filter(id) {
      this.filterLabelId = id
    },
    removeFilter() {
      this.filterLabelId = null
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Kanban {
  margin: 2rem 3rem 1.5rem;
  overflow: hidden;

  .el-dropdown {
    margin-bottom: 1rem;
    button {
      color: $color-black;
    }
  }

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
