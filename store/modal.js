import * as types from './mutation-types/modal'

export const state = () => ({
  task: {},
  taskList: {}
})

export const actions = {
  showTask({ commit }, payload) {
    commit(types.SHOW_TASK, {
      ...payload.task,
      isShow: true,
      list: payload.list
    })
  },
  hideTask({ commit }) {
    commit(types.HIDE_TASK)
  },

  showTaskList({ commit }, payload) {
    commit(types.SHOW_TASK_LIST, {
      ...payload.taskList,
      isShow: true
    })
  },
  hideTaskList({ commit }) {
    commit(types.HIDE_TASK_LIST)
  }
}

export const mutations = {
  [types.SHOW_TASK](state, payload) {
    state.task = payload
  },
  [types.HIDE_TASK](state) {
    state.task = {}
  },

  [types.SHOW_TASK_LIST](state, payload) {
    state.taskList = payload
  },
  [types.HIDE_TASK_LIST](state) {
    state.taskList = {}
  }
}
