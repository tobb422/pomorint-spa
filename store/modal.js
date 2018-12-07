import * as types from './mutation-types/modal'

export const state = () => ({
  taskModal: false,
  taskListModal: false,
  sprintModal: false
})

export const actions = {
  showTaskModal({ commit }) {
    commit(types.SHOW_TASK_MODAL)
  },
  hideTaskModal({ commit }) {
    commit(types.HIDE_TASK_MODAL)
  },

  showTaskListModal({ commit }) {
    commit(types.SHOW_TASK_LIST_MODAL)
  },
  hideTaskListModal({ commit }) {
    commit(types.HIDE_TASK_LIST_MODAL)
  },

  showSprintModal({ commit }) {
    commit(types.SHOW_SPRINT_MODAL)
  },
  hideSprintModal({ commit }) {
    commit(types.HIDE_SPRINT_MODAL)
  }
}

export const mutations = {
  [types.SHOW_TASK_MODAL](state) {
    state.taskModal = true
  },
  [types.HIDE_TASK_MODAL](state) {
    state.taskModal = false
  },

  [types.SHOW_TASK_LIST_MODAL](state) {
    state.taskListModal = true
  },
  [types.HIDE_TASK_LIST_MODAL](state) {
    state.taskListModal = false
  },

  [types.SHOW_SPRINT_MODAL](state) {
    state.sprintModal = true
  },
  [types.HIDE_SPRINT_MODAL](state) {
    state.sprintModal = false
  }
}
