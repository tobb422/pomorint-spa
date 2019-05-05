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
  async fetchTaskLists({ commit }) {
    const result = await new IssueBoxesApi().index()
    commit(types.SET_TASK_LISTS, { lists: issueBoxSerializer(result) })
  },

  async addTaskList({ commit }, payload) {
    const result = await new IssueBoxesApi().create(payload)
    commit(types.ADD_TASK_LIST, { list: issueBoxSerializer(result) })
  },

  async changeTaskList({ commit }, payload) {
    const result = await new IssueBoxesApi().update(payload)
    commit(types.CHANGE_TASK_LIST, { list: issueBoxSerializer(result) })
  },

  deleteTaskList({ commit }, payload) {
    new IssueBoxesApi().delete(payload.id).then(_ => {
      commit(types.DELETE_TASK_LIST, payload)
    })
  },

  setLists({ commit }, payload) {
    commit(types.SET_LISTS, { lists: payload })
  }
}

export const mutations = {
  [types.SET_TASK_LISTS](state, payload) {
    state.lists = payload.lists
  },

  [types.ADD_TASK_LIST](state, payload) {
    state.lists = state.lists.concat([payload.list])
  },

  [types.CHANGE_TASK_LIST](state, payload) {
    state.lists = state.lists.map(list => {
      return payload.list.id === list.id ? payload.list : list
    })
  },

  [types.DELETE_TASK_LIST](state, payload) {
    state.lists = state.lists.filter(list => list.id !== payload.id)
  },

  [types.SET_LISTS](state, payload) {
    state.lists = payload.lists
  }
}
