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

  async modeUpdate({}, payload) {
    const setList = (task, boxId) => {
      this.dispatch(
        'taskList/setLists',
        this.state.taskList.manager.updateTask(task, boxId)
      )
    }

    const tmpTask = Object.assign({}, payload.task)
    tmpTask.boxIndex = payload.boxIndex
    setList(tmpTask, payload.issueBox.id)

    const result = await new IssuesApi().update(payload)
    const task = issueSerializer(result)
    setList(task, result.issueBox.id)
  },

  delete({}, payload) {
    new IssuesApi().delete(payload.id).then(_ => {
      this.dispatch(
        'taskList/setLists',
        this.state.taskList.manager.removeTask(payload)
      )
    })
  }
}
