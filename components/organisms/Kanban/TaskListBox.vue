<template lang="pug">
  section.TaskListBox
    .header
      .name(@click="openTaskListModal") {{ name }}
      el-tooltip(content="全てのカードをアーカイブする" placement="top")
        img(src="~/assets/images/archive.png")
      el-tooltip(content="新しいカードを追加する" placement="top")
        .add(@click="openTaskModal") ＋
      .count ポモ数：{{ totalResultCount }} / {{ totalEstimateCount }}
    .tasks
      draggable(
        :list="tasks"
        :options="{ group:'alltasks' }"
        :move="checkMove"
        v-for="(task, index) in draggableTasks"
        :key="index"
      )
        Task(
          v-if="task.title"
          :task="task"
          v-on:click.native="openTaskModal(task)"
        )
        AddTask(
          v-else-if="tasks.length === 0"
          v-on:click.native="openTaskModal"
        )
</template>

<script>
import Task from './Task'
import AddTask from './AddTask'
import AddList from './AddList'
import draggable from 'vuedraggable'
import { mapState } from 'vuex'

export default {
  name: 'TaskListBox',
  components: {
    Task,
    AddTask,
    AddList,
    draggable
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      onEditList: false
    }
  },
  computed: {
    draggableTasks() {
      return this.tasks.concat([''])
    },
    totalResultCount() {
      return this.totalCountFunc(this.tasks.map(t => t.resultCount))
    },
    totalEstimateCount() {
      return this.totalCountFunc(this.tasks.map(t => t.estimateCount))
    },
    ...mapState({
      tasks: state => state.taskList.list.tasks
    })
  },
  mounted() {
    this.$store.dispatch('taskList/fetchTasks')
  },
  methods: {
    totalCountFunc(ary) {
      return ary.length > 0 ? ary.reduce((pre, current) => pre + current) : 0
    },
    openTaskListModal() {
      this.$store.dispatch('taskList/selectTaskList', { title: this.name })
      this.$store.dispatch('modal/showTaskListModal')
    },
    openTaskModal(task) {
      if (task !== {}) {
        this.$store.dispatch('task/selectTask', task)
      }
      this.$store.dispatch('modal/showTaskModal')
    },
    checkMove(e) {
      return !!e.draggedContext.element
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.TaskListBox {
  background-color: $color-gray-light;
  min-width: 280px;
  display: grid;
  grid-template-areas: 'header' 'tasks';
  grid-template-rows: auto 1fr;

  .header {
    display: grid;
    grid-template-areas: 'name archive add' 'count . .';
    grid-template-columns: 5fr 1fr 1fr;
    grid-gap: 0.5rem;
    align-items: center;
    margin: 1rem 1rem 0.5rem;
    line-height: 1.5;

    .name {
      grid-area: name;
      @include type-heading;

      &:hover {
        text-decoration: underline;
        opacity: 0.7;
      }
    }

    .count {
      grid-area: count;
      @include type-xsmall;
      padding: 0.1rem;
    }

    .add {
      grid-area: add;
      @include type-normal;
      font-weight: bold;
      margin-right: 0.5rem;
      padding: 0.1rem;
      text-align: right;
    }

    img {
      grid-area: archive;
      height: 1rem;
    }
  }

  .tasks {
    margin: 0.5rem auto 1rem;
    width: 240px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    .dummy {
      display: none;
    }
  }
}
</style>
