import * as types from './mutation-types/task'
import { IssuesApi } from '~/api'
import { issueSerializer } from '~/serializers'

export const state = () => ({
  selected: {
    id: null,
    title: '',
    estimateCount: 0,
    resultCount: 0,
    description: '',
    labels: []
  },
  selectedTaskList: {}
})

export const actions = {
  selectTask({ commit }, payload) {
    if (payload.task !== {}) {
      commit(types.SELECT_TASK, payload.task)
    }
    commit(types.SET_TASK_LIST, payload.list)
  },

  removeTask({ commit }) {
    commit(types.REMOVE_TASK)
  },

  async createTask({ commit }, payload) {
    const result = await new IssuesApi().create(payload)
    const issue = issueSerializer(result)
    const newListId = result.issueBox.id
    this.dispatch('taskList/setLists', {
      lists: this.state.taskList.lists.map(list => {
        if (list.id === newListId) {
          const newList = Object.assign({}, list)
          newList.tasks = list.tasks.concat([issue])
          return newList
        }
        return list
      })
    })
  },

  async updateTask({ commit }, payload) {
    const result = await new IssuesApi().update(payload)
    const issue = issueSerializer(result)
    const newListId = result.issueBox.id
    this.dispatch('taskList/setLists', {
      lists: this.state.taskList.lists.map(list => {
        const task = list.tasks.find(task => task.id === issue.id)
        if (task) {
          const newList = Object.assign({}, list)
          if (list.id === newListId) {
            newList.tasks = list.tasks.map(task => {
              return task.id === issue.id ? issue : task
            })
          } else {
            newList.tasks = list.tasks.filter(task => task.id !== issue.id)
          }
          return newList
        }

        if (list.id === newListId) {
          const newList = Object.assign({}, list)
          newList.tasks = list.tasks.concat([issue])
          return newList
        }

        return list
      })
    })
  },

  archiveTask({ commit }, payload) {
    new IssuesApi().archive(payload).then(_ => {
      this.dispatch('taskList/setTasks', {
        tasks: this.state.taskList.list.tasks.filter(t => t.id !== payload.id)
      })
    })
  },

  deleteTask({ commit }, payload) {
    new IssuesApi().delete(payload.id).then(_ => {
      this.dispatch('taskList/setTasks', {
        tasks: this.state.taskList.list.tasks.filter(t => t.id !== payload.id)
      })
    })
  }
}

export const mutations = {
  [types.SELECT_TASK](state, payload) {
    state.selected = payload
  },

  [types.REMOVE_TASK](state) {
    state.selected = {}
  },

  [types.SET_TASK_LIST](state, payload) {
    state.selectedTaskList = payload
  }
}
