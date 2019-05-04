import * as types from './mutation-types/task'
import { IssuesApi } from '~/api'
import { issueSerializer } from '~/serializers'

export const state = () => ({
  selected: {
    id: null,
    title: '',
    estimateCount: 0,
    resultCount: 0,
    description: '',
    labels: []
  },
  taskList: {}
})

export const actions = {
  selectTask({ commit }, payload) {
    if (payload.task !== {}) commit(types.SELECT_TASK, payload)
  },

  removeTask({ commit }) {
    commit(types.REMOVE_TASK)
  },

  async createTask({ commit }, payload) {
    const result = await new IssuesApi().create(payload)
    const issue = issueSerializer(result)
    const newListId = result.issueBox.id
    this.dispatch(
      'taskList/setLists',
      this.state.taskList.lists.map(list => {
        if (list.id === newListId) {
          const newList = Object.assign({}, list)
          newList.tasks = list.tasks.concat([issue])
          return newList
        }
        return list
      })
    )
  },

  async updateTask({ commit }, payload) {
    const result = await new IssuesApi().update(payload)
    const issue = issueSerializer(result)
    const newListId = result.issueBox.id
    this.dispatch(
      'taskList/setLists',
      this.state.taskList.lists.map(list => {
        const task = list.tasks.find(task => task.id === issue.id)
        const newList = Object.assign({}, list)

        if (task) {
          newList.tasks = newList.tasks.filter(task => task.id !== issue.id)
        }

        if (list.id === newListId) {
          const tasks = [].concat(newList.tasks)
          tasks.splice(issue.boxIndex, 0, issue)
          newList.tasks = tasks
        }

        return newList
      })
    )
  },

  archiveTask({ commit }, payload) {
    new IssuesApi().archive(payload).then(_ => {
      this.dispatch('taskList/setTasks', {
        tasks: this.state.taskList.list.tasks.filter(t => t.id !== payload.id)
      })
    })
  },

  deleteTask({ commit }, payload) {
    new IssuesApi().delete(payload.id).then(_ => {
      this.dispatch('taskList/setTasks', {
        tasks: this.state.taskList.list.tasks.filter(t => t.id !== payload.id)
      })
    })
  }
}

export const mutations = {
  [types.SELECT_TASK](state, payload) {
    state.selected = payload.task
    state.taskList = payload.taskList
  },

  [types.REMOVE_TASK](state) {
    state.selected = {}
  }
}
