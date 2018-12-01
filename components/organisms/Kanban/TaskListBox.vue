<template lang="pug">
  section.TaskListBox
    .header
      .name {{ name }}
      .count ポモ数：{{ totalResultCount }} / {{ totalEstimateCount }}
      .add(@click="openTaskModal") ＋
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
import draggable from 'vuedraggable'

export default {
  name: 'TaskListBox',
  components: {
    Task,
    AddTask,
    draggable
  },
  props: {
    name: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      default: () => []
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
    }
  },
  methods: {
    totalCountFunc(ary) {
      if (ary.length > 0) {
        return ary.reduce((pre, current) => pre + current)
      } else {
        return 0
      }
    },
    openTaskModal(task) {
      if (task !== {}) {
        this.$store.dispatch('task/selectTask', task)
      }
      this.$store.dispatch('modal/showTaskModal')
    },
    checkMove(e) {
      if (e.draggedContext.element) {
        return true
      }
      return false
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
  grid-template-rows: 3rem 1fr;

  .header {
    display: flex;
    align-items: flex-end;
    margin: 0 1rem;
    line-height: 1.5;

    .name {
      @include type-heading;
      margin-right: 1rem;
    }

    .count {
      @include type-xsmall;
      padding: 0.1rem;
    }

    .add {
      @include type-normal;
      font-weight: bold;
      margin-right: 0.5rem;
      padding: 0.1rem;
      flex-grow: 1;
      text-align: right;
    }
  }

  .tasks {
    margin: 1rem auto;
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
