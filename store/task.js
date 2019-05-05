import { IssuesApi } from '~/api'
import { issueSerializer } from '~/serializers'

export const actions = {
  async create({}, payload) {
    const result = await new IssuesApi().create(payload)
    const task = issueSerializer(result)
    this.dispatch(
      'taskList/setLists',
      this.state.taskList.manager.addTask(task, result.issueBox.id)
    )
  },

  async update({}, payload) {
    const result = await new IssuesApi().update(payload)
    const task = issueSerializer(result)
    this.dispatch(
      'taskList/setLists',
      this.state.taskList.manager.updateTask(task, result.issueBox.id)
    )
  },

  archive({}, payload) {
    new IssuesApi().archive(payload).then(_ => {
      this.dispatch('task/remove', payload)
    })
  },

  delete({}, payload) {
    new IssuesApi().delete(payload.id).then(_ => {
      this.dispatch('task/remove', payload)
    })
  },

  remove({}, payload) {
    this.dispatch(
      'taskList/setLists',
      this.state.taskList.manager.removeTask(payload)
    )
  }
}
