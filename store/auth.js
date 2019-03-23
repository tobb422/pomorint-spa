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

  async google({ commit }, payload) {
    const token = await new AuthApi().google()
    this.dispatch('auth/setToken', { token: token }).then(() => {
      this.dispatch('user/setUser')
    })
  },

  logout({ commit }) {
    Session.remove()
    this.dispatch('user/removeUser')
  },

  setToken({ commit }, payload) {
    Session.set({ token: payload.token })
  }
}

export const mutations = {}
