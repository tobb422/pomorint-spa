<template lang="pug">
  section.TaskListBox
    .header-addList(v-if="onEditList")
      el-input(v-model="name")
      el-button.cancel(@click="onEditList = false") キャンセル
      el-button.save(@click="onEditList = false") 保存
    .header(v-else)
      .name( @click="onEditList = true") {{ name }}
      .add( @click="openTaskModal") ＋
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
    },
    tasks: {
      type: Array,
      default: () => []
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
    }
  },
  methods: {
    editCancel() {
      console.log('test')
    },
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
  grid-template-rows: auto 1fr;

  .header-addList {
    margin: 1rem 1rem 0.5rem;
    display: grid;
    grid-template-areas: 'input input' 'cancel save';
    grid-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;

    .el-input {
      grid-area: input;
    }

    .el-button {
      color: $color-white;
    }

    .cancel {
      grid-area: cancel;
      background-color: $color-gray;
    }

    .save {
      grid-area: save;
      background-color: $color-sky;
    }
  }

  .header {
    display: grid;
    grid-template-areas: 'name add' 'count .';
    grid-gap: 0.5rem;
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
