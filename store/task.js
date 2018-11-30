import * as types from './mutation-types/task'

export const state = () => ({
  selected: {}
})

export const actions = {
  selectTask({ commit }, payload) {
    commit(types.SELECT_TASK, payload)
  },

  removeTask({ commit }) {
    commit(types.REMOVE_TASK)
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
