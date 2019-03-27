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
  }
})

export const actions = {
  selectTask({ commit }, payload) {
    commit(types.SELECT_TASK, payload)
  },

  removeTask({ commit }) {
    commit(types.REMOVE_TASK)
  },

  async createTask({ commit }, payload) {
    const result = await new IssuesApi().create(payload)
    this.dispatch('taskList/setTasks', {
      tasks: this.state.taskList.list.tasks
        .filter(t => t.id !== result.id)
        .concat([issueSerializer(result)])
    })
  },

  async updateTask({ commit }, payload) {
    const result = await new IssuesApi().update(payload)
    this.dispatch('taskList/setTasks', {
      tasks: this.state.taskList.list.tasks
        .filter(t => t.id !== result.id)
        .concat([issueSerializer(result)])
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
    state.selected = payload
  },

  [types.REMOVE_TASK](state) {
    state.selected = {}
  }
}
