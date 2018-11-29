<template lang="pug">
  section.TaskListBox
    .header
      .name {{ name }}
      .count ポモ数：10/24
      .add ＋
    .tasks
      draggable(:list="tasks" :options="{ group:'alltasks' }" v-for="(task, index) in tasks")
        Task(
          :key="index"
          :title="task.title"
          v-if="task.title == 'create' && tasks.length == 1"
        )
        Task(
          :key="index"
          :title="task.title"
          v-else-if="task.title != 'create'"
          v-on:click.native="openTaskModal(task)"
        )
    TaskModal(
      :isShown="showTaskModal"
      :hide="closeTaskModal"
      :task="selectedTask"
    )
</template>

<script>
import Task from './Task'
import TaskModal from './TaskModal'
import draggable from 'vuedraggable'

export default {
  name: 'TaskListBox',
  components: {
    Task,
    TaskModal,
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
  data() {
    return {
      showTaskModal: false,
      selectedTask: {}
    }
  },
  methods: {
    openTaskModal(task) {
      this.selectedTask = task
      this.showTaskModal = true
    },
    closeTaskModal() {
      this.showTaskModal = false
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
