import * as types from './mutation-types/taskList'
import { IssuesApi } from '~/api'
import { issueSerializer } from '~/serializers'

export const state = () => ({
  selected: {},
  list: {
    title: '',
    tasks: []
  }
})

export const actions = {
  selectTaskList({ commit }, payload) {
    commit(types.SELECT_TASK_LIST, payload)
  },

  removeTaskList({ commit }) {
    commit(types.REMOVE_TASK_LIST)
  },

  async fetchTasks({ commit }) {
    const result = await new IssuesApi().index()
    this.dispatch('taskList/setTasks', { tasks: issueSerializer(result) })
  },

  setTasks({ commit }, payload) {
    commit(types.SET_TASKS, { tasks: payload.tasks })
  }
}

export const mutations = {
  [types.SELECT_TASK_LIST](state, payload) {
    state.selected = payload
  },

  [types.REMOVE_TASK_LIST](state) {
    state.selected = {}
  },

  [types.SET_TASKS](state, payload) {
    state.list.tasks = payload.tasks
  }
}
