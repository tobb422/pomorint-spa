import * as types from './mutation-types/taskList'

export const state = () => ({
  selected: {
    title: ''
  }
})

export const actions = {
  selectTaskList({ commit }, payload) {
    commit(types.SELECT_TASK_LIST, payload)
  },

  removeTaskList({ commit }) {
    commit(types.REMOVE_TASK_LIST)
  }
}

export const mutations = {
  [types.SELECT_TASK_LIST](state, payload) {
    state.selected = payload
  },

  [types.REMOVE_TASK_LIST](state) {
    state.selected = {}
  }
}
