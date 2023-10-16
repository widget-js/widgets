import { WidgetData } from '@widget-js/core'
import { remove } from 'lodash'
import { nanoid } from 'nanoid'
import { customAlphabet } from 'nanoid'

export class TodoListData extends WidgetData {
  // new Todo('欢迎使用桌面组件'), new Todo('鼠标右击组件弹出菜单')
  todoList: Todo[] = []
  finishedList: Todo[] = []

  finishTodo(todo: Todo) {
    remove(this.todoList, function (item) {
      return item.id === todo.id
    })
    todo.finishedAt = new Date().toISOString()
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
    todo.finishedAt = undefined
    todo.order = 0
    if (!this.todoList.find((item) => item.id == todo.id)) {
      this.todoList.splice(0, 0, todo)
    }
  }

  setTodoList(todoList: Todo[]) {
    this.todoList.splice(0, this.todoList.length, ...todoList)
  }

  parseJSON(json: {}) {
    super.parseJSON(json)
    if (this.todoList) {
      for (let i = 0; i < this.todoList.length; i++) {
        this.todoList[i] = Object.assign(new Todo(''), this.todoList[i])
      }
    }

    if (this.finishedList) {
      for (let i = 0; i < this.finishedList.length; i++) {
        this.finishedList[i] = Object.assign(new Todo(''), this.finishedList[i])
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
  createdAt: string
  content: string
  finishedAt?: string
  order: number = 0

  constructor(content: string) {
    this.createdAt = new Date().toISOString()
    this.content = content
    this.finishedAt = undefined
    this.id = parseInt(customAlphabet('0123456789', 10)())
  }

  isFinished = (): boolean => {
    return this.finishedAt != undefined
  }
}
