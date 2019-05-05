import * as types from './mutation-types/toast'

export const state = () => ({
  isShown: false,
  isSuccess: false,
  isError: false,
  message: ''
})

export const getters = {
  showMessage: state => {
    const msg = state.message
    return typeof msg !== 'string' ? '不明なエラーが発生しました' : msg
  }
}

export const actions = {
  success({ commit }, payload) {
    commit(types.SUCCESS, payload)
  },
  error({ commit }, payload) {
    commit(types.ERROR, payload)
  },
  hide({ commit }) {
    commit(types.HIDE)
  }
}

export const mutations = {
  [types.SUCCESS](state, payload) {
    state.isShown = true
    state.isSuccess = true
    state.isError = false
    state.message = payload.message
  },
  [types.ERROR](state, payload) {
    state.isShown = true
    state.isSuccess = false
    state.isError = true
    state.message = payload.message
  },
  [types.HIDE](state) {
    state.isShown = false
    state.isSuccess = false
    state.isError = false
    state.message = ''
  }
}
