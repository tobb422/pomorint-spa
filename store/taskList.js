import * as types from './mutation-types/taskList'
import { IssuesApi, IssueBoxesApi } from '~/api'
import { issueSerializer, issueBoxSerializer } from '~/serializers'

export const state = () => ({
  selected: {},
  lists: [
    {
      id: null,
      title: '',
      tasks: []
    }
  ]
})

export const actions = {
  selectTaskList({ commit }, payload) {
    commit(types.SELECT_TASK_LIST, payload)
  },

  removeTaskList({ commit }) {
    commit(types.REMOVE_TASK_LIST)
  },

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

  setLists({ commit }, payload) {
    commit(types.SET_LISTS, { lists: payload })
  }
}

export const mutations = {
  [types.SELECT_TASK_LIST](state, payload) {
    state.selected = payload
  },

  [types.REMOVE_TASK_LIST](state) {
    state.selected = {}
  },

  [types.SET_TASK_LISTS](state, payload) {
    state.lists = payload.lists
  },

  [types.ADD_TASK_LIST](state, payload) {
    state.lists = state.lists.concat([payload])
  },

  [types.CHANGE_TASK_LIST](state, payload) {
    state.lists = state.lists.map(list => {
      return payload.list.id === list.id ? payload.list : list
    })
  },

  [types.SET_LISTS](state, payload) {
    state.lists = payload.lists
  }
}
