export default class ListBoxManager {
  constructor(lists) {
    this.lists = lists
  }

  lists = []

  add(list) {
    return this.lists.concat([list])
  }

  update(list) {
    return this.lists.map(l => (l.id === list.id ? list : e))
  }

  delete(list) {
    return this.lists.filter(l => l.id !== list.id)
  }

  addTask(task, listId) {
    return this.lists.map(l => {
      if (l.id === listId) {
        const list = Object.assign({}, l)
        list.tasks = list.tasks.concat([task])
        return newList
      }
      return e
    })
  }

  updateTask(task, newListId) {
    return this.lists.map(l => {
      const list = ListBoxManager.RemoveTaskInList(task, l)

      if (list.id === newListId) {
        return ListBoxManager.InsertTaskInList(task, list)
      }

      return list
    })
  }

  removeTask(task) {
    return this.lists.map(l => ListBoxManager.RemoveTaskInList(task, l))
  }

  static RemoveTaskInList(task, list) {
    const newList = Object.assign({}, list)

    const target = newList.tasks.find(t => t.id === task.id)
    if (target) {
      newList.tasks = newList.tasks.filter(t => t.id !== task.id)
    }

    return newList
  }

  static InsertTaskInList(task, list) {
    const newList = Object.assign({}, list)

    const tasks = [].concat(newList.tasks)
    tasks.splice(task.boxIndex, 0, task)
    newList.tasks = tasks

    return newList
  }
}
