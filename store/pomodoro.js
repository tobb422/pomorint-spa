import * as types from './mutation-types/pomodoro'
import { IssuesApi } from '~/api'
import { issueSerializer } from '~/serializers'

const defaultState = {
  id: 0,
  title: '',
  estimateCount: 0,
  resultCount: 0,
  description: '',
  labels: []
}

export const state = () => ({
  selectedTask: defaultState
})

export const getters = {
  isSelectedTask: state => {
    return state.selectedTask.title !== ''
  }
}

export const actions = {
  selectTask({ commit }, payload) {
    commit(types.SELECT_TASK, payload)
  },

  async completeTask({ state, commit }) {
    const task = state.selectedTask
    const params = {
      id: task.id,
      resultPoint: task.resultCount + 1
    }
    const issue = await new IssuesApi().update(params)
    commit(types.COMPLETE_TASK, issueSerializer(issue))
  },

  removeTask({ commit }) {
    commit(types.REMOVE_TASK)
  }
}

export const mutations = {
  [types.SELECT_TASK](state, payload) {
    state.selectedTask = payload
  },

  [types.COMPLETE_TASK](state, payload) {
    state.selectedTask = payload
  },

  [types.REMOVE_TASK](state) {
    state.selectedTask = defaultState
  }
}
