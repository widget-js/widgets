import { WidgetData } from '@widget-js/core'
import { remove } from 'lodash'
import { customAlphabet } from 'nanoid'

export class TodoListData extends WidgetData {
  // new Todo('欢迎使用桌面组件'), new Todo('鼠标右击组件弹出菜单')
  todoList: Todo[] = []
  finishedList: Todo[] = []

  finishTodo(todo: Todo) {
    remove(this.todoList, function (item) {
      return item.id === todo.id
    })
    todo.dueDateTime = new Date().toISOString()
    //防止快速点击重复添加
    if (!this.finishedList.find((item) => item.id == todo.id)) {
      this.finishedList.splice(0, 0, todo)
    }
  }

  sort() {
    this.todoList.sort((a, b) => a.order - b.order)
  }

  deleteTodo(todo: Todo) {
    remove(this.todoList, function (item) {
      return item.id === todo.id
    })
    remove(this.finishedList, function (item) {
      return item.id === todo.id
    })
  }

  undoTodo(todo: Todo) {
    remove(this.finishedList, function (item) {
      return item.id === todo.id
    })
    todo.dueDateTime = undefined
    todo.order = 0
    if (!this.todoList.find((item) => item.id == todo.id)) {
      this.todoList.splice(0, 0, todo)
    }
  }

  setTodoList(todoList: Todo[]) {
    this.todoList.splice(0, this.todoList.length, ...todoList)
  }

  private compactData(todo: Todo) {
    if (!todo.title) {
      todo.title = todo.content
    }
    if (!todo.createdDateTime) {
      todo.createdDateTime = todo.content
    }

    if (todo.finishedAt && !todo.dueDateTime) {
      todo.dueDateTime = todo.finishedAt
    }
    return todo
  }

  parseJSON(json: {}) {
    super.parseJSON(json)
    if (this.todoList) {
      for (let i = 0; i < this.todoList.length; i++) {
        const todo = this.todoList[i]
        this.compactData(todo)
        this.todoList[i] = Object.assign(new Todo(''), todo)
      }
    }

    if (this.finishedList) {
      for (let i = 0; i < this.finishedList.length; i++) {
        const todo = this.finishedList[i]
        this.compactData(todo)
        this.finishedList[i] = Object.assign(new Todo(''), todo)
      }
    }
    this.sort()
  }
}

export interface TodoUpdate {
  content: string
  todo?: Todo
}

export class Todo {
  id: string | number
  /**
   * @deprecated
   */
  createdAt: string
  createdDateTime: string
  /**
   * @deprecated
   */
  content: string
  /**
   * @deprecated
   */
  finishedAt?: string
  title: string
  order: number = 0
  /**
   *
   */
  dueDateTime?: string
  /**
   * The date and time in the specified time zone for a reminder alert of the task to occur.
   */
  reminderDateTime?: string
  /**
   * The recurrence pattern for the task.
   */
  recurrence?: string
  /**
   * The date and time in the specified time zone at which the task is scheduled to start.
   */
  startDateTime?: string
  /**
   * The date and time when the task was last modified.
   * @example midnight UTC on Jan 1, 2020 would look like this: '2020-01-01T00:00:00Z'.
   */
  lastModifiedDateTime: string
  isReminderOn: boolean = false

  constructor(title: string) {
    this.title = title
    this.content = title
    this.createdAt = new Date().toISOString()
    this.createdDateTime = new Date().toISOString()
    this.lastModifiedDateTime = this.createdAt
    this.dueDateTime = undefined
    this.id = parseInt(customAlphabet('0123456789', 10)())
  }

  isFinished = (): boolean => {
    return this.dueDateTime != undefined
  }
}
