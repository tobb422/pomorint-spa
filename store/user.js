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
    console.log(users)
    commit(types.SIGNUP, users)
  }
}

export const mutations = {
  [types.SIGNUP](state, payload) {
    state.name = payload.name
    state.email = payload.email
    state.image = payload.image
  }
}
