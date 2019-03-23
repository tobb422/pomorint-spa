import { AuthApi } from '../api'
import Session from '../plugins/session'

export const state = () => ({})

export const actions = {
  async signup({ commit }, payload) {
    const token = await new AuthApi().signup(payload)
    this.dispatch('auth/setToken', { token: token }).then(() => {
      this.dispatch('user/setUser')
    })
  },

  async login({ commit }, payload) {
    const token = await new AuthApi().login(payload)
    this.dispatch('auth/setToken', { token: token }).then(() => {
      this.dispatch('user/setUser')
    })
  },

  logout({ commit }) {
    const session = new Session()
    session.remove()
    this.dispatch('user/removeUser')
  },

  setToken({ commit }, payload) {
    const session = new Session()
    session.set({ token: payload.token })
  }
}

export const mutations = {}
