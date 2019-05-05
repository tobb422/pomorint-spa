import * as types from './mutation-types/taskList'
import { IssuesApi, IssueBoxesApi } from '~/api'
import { issueSerializer, issueBoxSerializer } from '~/serializers'

export const state = () => ({
  lists: [
    {
      id: null,
      title: '',
      tasks: []
    }
  ]
})

export const actions = {
  setLists({ commit }, payload) {
    commit(types.SET_LISTS, { lists: payload })
  },

  async fetchLists({ commit }) {
    const result = await new IssueBoxesApi().index()
    this.dispatch('taskList/setLists', issueBoxSerializer(result))
  },

  async add({ commit, state }, payload) {
    const result = await new IssueBoxesApi().create(payload)
    this.dispatch(
      'taskList/setLists',
      state.lists.concat([issueBoxSerializer(result)])
    )
  },

  async update({ commit, state }, payload) {
    const result = await new IssueBoxesApi().update(payload)
    const newList = issueBoxSerializer(result)
    this.dispatch(
      'taskList/setLists',
      state.lists.map(list => (list.id === newList.id ? newList : list))
    )
  },

  delete({ commit, state }, payload) {
    new IssueBoxesApi().delete(payload.id).then(_ => {
      this.dispatch(
        'taskList/setLists',
        state.lists.filter(list => list.id !== payload.id)
      )
    })
  }
}

export const mutations = {
  [types.SET_LISTS](state, payload) {
    state.lists = payload.lists
  }
}
