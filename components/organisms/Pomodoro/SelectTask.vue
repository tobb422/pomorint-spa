<template lang="pug">
  section.SelectTask
    .header カードの選択
    .box
      el-tabs(v-model="activeListTitle")
        el-tab-pane(v-for="list in lists" :label="list.title" :name="list.title" :key="list.id")
      ul.tasks(v-if="currentList")
        li(v-for="task in currentList.tasks" :key="task.id" @click="select(task)") {{ task.title }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelectTask',
  data() {
    return {
      activeListTitle: ''
    }
  },
  computed: {
    ...mapGetters({
      lists: 'taskList/lists'
    }),
    currentList() {
      return this.lists.find(list => list.title === this.activeListTitle)
    }
  },
  mounted() {
    this.$store.dispatch('taskList/fetchLists').then(_ => {
      this.activeListTitle = this.lists[0].title
    })
  },
  methods: {
    select(task) {
      this.$store.dispatch('pomodoro/selectTask', task)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.SelectTask {
  .header {
    @include type-heading;
    margin-bottom: 1rem;
  }

  .box {
    border: 1px solid $color-sky;
    margin: 0 auto;
    padding: 2rem;
    width: 560px;
    text-align: left;
  }

  ul.tasks {
    height: 200px;
    overflow-y: scroll;

    & > li {
      padding: 1rem 0.5rem;
      margin: 0.5rem;
      border: 1px solid $color-gray-lighter;

      &:hover {
        background-color: $color-gray-lighter;
        border: 1px solid $color-gray;
      }
    }
  }
}
</style>
