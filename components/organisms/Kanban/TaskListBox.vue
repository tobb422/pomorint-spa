<template lang="pug">
  section.TaskListBox
    .header
      .name(@click="openTaskListModal") {{ taskList.title }}
      el-tooltip(content="全てのカードをアーカイブする" placement="top")
        img(src="~/assets/images/archive.png" @click="archiveAllTasks")
      el-tooltip(content="新しいカードを追加する" placement="top")
        .add(@click="openTaskModal") ＋
      .count ポモ数：{{ totalResultCount }} / {{ totalEstimateCount }}
      .count-sub 結果 / 予算
    .tasks
      draggable(
        :class="markId(taskList.id)"
        :list="[].concat(taskList.tasks)"
        group="taskList"
        :move="checkMove"
        @end="movedTask"
      )
        Task(
          v-for="task in taskList.tasks"
          :key="task.id"
          :class="markId(task.id)"
          :task="task"
          v-on:click.native="openTaskModal(task)"
        )
        AddTask(slot="footer" v-on:click.native="openTaskModal")
</template>

<script>
import Task from './Task'
import AddTask from './AddTask'
import AddList from './AddList'
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'

export default {
  name: 'TaskListBox',
  components: {
    Task,
    AddTask,
    AddList,
    draggable
  },
  props: {
    taskList: {
      type: Object,
      required: true
    }
  },
  computed: {
    tasks() {
      return this.taskList.tasks
    },
    totalResultCount() {
      return this.totalCount(this.tasks.map(t => t.resultCount))
    },
    totalEstimateCount() {
      return this.totalCount(this.tasks.map(t => t.estimateCount))
    },
    ...mapGetters({
      lists: 'taskList/lists'
    })
  },
  methods: {
    markId(id) {
      const obj = {}
      obj[id] = true
      return obj
    },
    totalCount(ary) {
      return ary.length > 0 ? ary.reduce((pre, current) => pre + current) : 0
    },
    openTaskListModal() {
      this.$store.dispatch('modal/showTaskList', { taskList: this.taskList })
    },
    openTaskModal(task) {
      this.$store.dispatch('modal/showTask', {
        task: task,
        list: this.taskList
      })
    },
    archiveAllTasks() {
      console.log(this.taskList)
    },
    checkMove(e) {
      return !!e.draggedContext.element
    },
    movedTask(e) {
      const targetTaskId = e.item.className.replace(/Task /g, '')
      const nextListId = parseInt(e.to.className)
      const nextList = this.lists.find(list => list.id === nextListId)
      const params = {
        id: targetTaskId,
        task: this.taskList.tasks.find(t => t.id === parseInt(targetTaskId)),
        issueBox: nextList,
        boxIndex: e.newIndex
      }

      this.$store.dispatch('task/moveUpdate', params)
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
    grid-template-areas: 'name archive add' 'count count-sub count-sub';
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

    .count-sub {
      grid-area: count-sub;
      font-size: px2rem(8);
      color: $color-gray;
      opacity: 0.7;
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
