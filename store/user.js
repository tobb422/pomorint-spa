import * as types from './mutation-types/user'
import { UsersApi } from '../api'

export const state = () => ({
  name: '',
  email: '',
  image: ''
})

export const actions = {
  async setUser({ commit }) {
    const users = await new UsersApi().show().catch(e => e)
    commit(types.SET_USER, users)
  }
}

export const mutations = {
  [types.SET_USER](state, payload) {
    state.name = payload.name
    state.email = payload.email
    state.image = payload.image
  }
}
