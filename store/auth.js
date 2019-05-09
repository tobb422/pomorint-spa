import { AuthApi } from '../api'
import Session from '../plugins/session'

export const actions = {
  async signup({ commit }, payload) {
    const token = await new AuthApi().signup(payload)
    this.dispatch('auth/setToken', { token: token })
  },

  async login({ commit }, payload) {
    const token = await new AuthApi().login(payload)
    this.dispatch('auth/setToken', { token: token })
  },

  async google({}, payload) {
    this.dispatch('auth/setToken', { token: payload.token })
  },

  logout({ commit }) {
    Session.remove()
    this.dispatch('user/removeUser')
  },

  setToken({ commit }, payload) {
    Session.set({ token: payload.token })
    this.dispatch('user/setUser')
  }
}
