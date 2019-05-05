import * as types from './mutation-types/user'
import { UsersApi } from '../api'

const defaultState = {
  name: '',
  email: '',
  image: ''
}

export const state = () => ({
  name: defaultState.name,
  email: defaultState.email,
  image: defaultState.image
})

export const actions = {
  async setUser({ commit }) {
    const users = await new UsersApi().show()
    commit(types.SET_USER, users)
  },

  removeUser({ commit }) {
    commit(types.REMOVE_USER)
  },

  async update({ commit }, payload) {
    const users = await new UsersApi().update(payload)
    commit(types.SET_USER, users)
  }
}

export const mutations = {
  [types.SET_USER](state, payload) {
    state.name = payload.name
    state.email = payload.email
    state.image = payload.image
  },
  [types.REMOVE_USER](state) {
    state.name = defaultState.name
    state.email = defaultState.email
    state.image = defaultState.image
  }
}
