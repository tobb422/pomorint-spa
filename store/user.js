import * as types from './mutation-types/user'
import { AuthApi, UsersApi } from '../api'
import Session from '../plugins/session'

export const state = () => ({
  name: '',
  email: '',
  image: ''
})

export const actions = {
  async signup({ commit }, payload) {
    const token = await new AuthApi().signup(payload)
    const session = new Session()
    session.set({ token: token })

    const users = await new UsersApi().show().catch(e => e)
    commit(types.SET_USER, users)
  },

  async login({ commit }, payload) {
    const token = await new AuthApi().login(payload)
    const session = new Session()
    session.set({ token: token })

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
