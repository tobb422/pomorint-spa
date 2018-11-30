import * as types from './mutation-types/pomodoro'

const defaultState = {
  title: '',
  estimateCount: 0,
  resultCount: 0,
  description: '',
  labels: []
}

export const state = () => ({
  selectedTask: defaultState
})

export const getters = {
  isSelectedTask: state => {
    return state.selectedTask.title !== ''
  }
}

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
    state.selectedTask = payload
  },

  [types.REMOVE_TASK](state) {
    state.selectedTask = defaultState
  }
}
