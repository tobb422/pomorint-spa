import * as types from './mutation-types/modal'

export const state = () => ({
  taskModal: false
})

export const actions = {
  showTaskModal({ commit }) {
    commit(types.SHOW_TASK_MODAL)
  },
  hideTaskModal({ commit }) {
    commit(types.HIDE_TASK_MODAL)
  }
}

export const mutations = {
  [types.SHOW_TASK_MODAL](state) {
    state.taskModal = true
  },
  [types.HIDE_TASK_MODAL](state) {
    state.taskModal = false
  }
}
