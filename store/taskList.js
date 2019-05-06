import * as types from './mutation-types/taskList'
import { IssueBoxesApi } from '~/api'
import { issueBoxSerializer as serialize } from '~/serializers'
import ListBoxManager from '~/services/list-box-manager'

export const state = () => ({
  manager: {}
})

export const getters = {
  lists: state => (state.manager.lists ? state.manager.lists : [])
}

export const actions = {
  setLists({ commit }, payload) {
    commit(types.SET_LISTS, { lists: payload })
  },

  async fetchLists({ commit }) {
    const result = await new IssueBoxesApi().index()
    this.dispatch('taskList/setLists', serialize(result))
  },

  async add({ commit, state }, payload) {
    const result = await new IssueBoxesApi().create(payload)
    this.dispatch('taskList/setLists', state.manager.add(serialize(result)))
  },

  async update({ commit, state }, payload) {
    const result = await new IssueBoxesApi().update(payload)
    this.dispatch('taskList/setLists', state.manager.update(serialize(result)))
  },

  delete({ commit, state }, payload) {
    new IssueBoxesApi().delete(payload.id).then(_ => {
      this.dispatch('taskList/setLists', state.manager.delete(payload))
    })
  }
}

export const mutations = {
  [types.SET_LISTS](state, payload) {
    state.manager = new ListBoxManager(payload.lists)
  }
}
