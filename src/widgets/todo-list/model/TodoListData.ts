import { WidgetData } from '@widget-js/core'
import remove from 'lodash-es/remove'
import { customAlphabet } from 'nanoid'

/**
 * @deprecated
 */
export class TodoListData extends WidgetData {
  todoList: Todo[] = []

  constructor(name: string) {
    super(name, undefined)
  }

  finishTodo(todo: Todo) {
    remove(this.todoList, (item) => {
      return item.id === todo.id
    })
    todo.dueDateTime = new Date().toISOString()
  }

  sort() {
    this.todoList.sort((a, b) => a.order - b.order)
  }

  deleteTodo(todo: Todo) {
    remove(this.todoList, (item) => {
      return item.id === todo.id
    })
  }

  undoTodo(todo: Todo) {
    todo.dueDateTime = undefined
    todo.order = 0
    if (!this.todoList.find(item => item.id == todo.id)) {
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
      todo.createdDateTime = todo.createdAt
    }

    if (todo.finishedAt && !todo.dueDateTime) {
      todo.dueDateTime = todo.finishedAt
    }

    return todo
  }

  parseJSON(json: object) {
    super.parseJSON(json)
    if (this.todoList) {
      for (let i = 0; i < this.todoList.length; i++) {
        const todo = this.todoList[i]
        this.compactData(todo)
        this.todoList[i] = Object.assign(new Todo(''), todo)
      }
    }
    this.sort()
  }
}

export interface TodoUpdate {
  title: string
  todoId?: string
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
  order = 0
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
  isReminderOn = false

  constructor(title: string) {
    this.title = title
    this.content = title
    this.createdAt = new Date().toISOString()
    this.createdDateTime = new Date().toISOString()
    this.lastModifiedDateTime = this.createdAt
    this.dueDateTime = undefined
    this.id = Number.parseInt(customAlphabet('0123456789', 10)())
  }

  isFinished = (): boolean => {
    return this.dueDateTime != undefined
  }

  static fromJSON(json: object) {
    const todo = new Todo('')
    Object.assign(todo, json)
    return todo
  }
}
