import * as types from './mutation-types/modal'

export const state = () => ({
  task: {
    id: null,
    title: '',
    estimateCount: 0,
    resultCount: 0,
    description: '',
    labels: [],
    list: {}
  },
  taskListModal: false,
  sprintModal: false
})

export const actions = {
  showTask({ commit }, payload) {
    if (payload.task !== {}) {
      commit(types.SHOW_TASK, {
        ...payload.task,
        list: payload.list
      })
    }
  },
  hideTask({ commit }) {
    commit(types.HIDE_TASK)
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
  [types.SHOW_TASK](state, payload) {
    state.task = payload
  },
  [types.HIDE_TASK](state) {
    state.task = {}
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
