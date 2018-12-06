import * as types from './mutation-types/sprint'

export const state = () => ({
  selected: {
    periodStart: null,
    periodEnd: null,
    estimateCount: 0,
    resultCount: 0,
    current: false
  }
})

export const actions = {
  selectSprint({ commit }, payload) {
    commit(types.SELECT_SPRINT, payload)
  },

  removeSprint({ commit }) {
    commit(types.REMOVE_SPRINT)
  }
}

export const mutations = {
  [types.SELECT_SPRINT](state, payload) {
    state.selected = payload
  },

  [types.REMOVE_SPRINT](state) {
    state.selected = {}
  }
}
