import * as types from './mutation-types/label'
import { LabelsApi } from '~/api'
import { labelSerializer } from '~/serializers'

export const state = () => ({
  labels: []
})

export const actions = {
  async index({ commit }) {
    const res = await new LabelsApi().index()
    commit(types.INDEX_LABELS, { labels: labelSerializer(res) })
  },

  async post({ commit }, payload) {
    const res = await new LabelsApi().create(payload).catch(_ => null)
    if (res) commit(types.CREATE_LABEL, labelSerializer(res))
  },

  async put({ commit }, payload) {
    const res = await new LabelsApi().update(payload.label).catch(_ => null)
    if (res) commit(types.UPDATE_LABEL, labelSerializer(res))
  },

  delete({ commit }, payload) {
    new LabelsApi()
      .delete(payload.label.id)
      .then(_ => commit(types.DELETE_LABEL, payload.label))
      .catch(_ => null)
  }
}

export const mutations = {
  [types.INDEX_LABELS](state, payload) {
    state.labels = payload.labels
  },

  [types.CREATE_LABEL](state, payload) {
    state.labels = state.labels.concat([payload])
  },

  [types.UPDATE_LABEL](state, payload) {
    state.labels = state.labels.map(label => {
      return label.id === payload.id ? payload : label
    })
  },

  [types.DELETE_LABEL](state, payload) {
    state.labels = state.labels.filter(label => label.id !== payload.id)
  }
}
