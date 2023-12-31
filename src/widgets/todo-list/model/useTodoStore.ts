import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { WidgetDataApi } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'
import {
  Todo,
  TodoListData,
  type TodoUpdate,
} from '@/widgets/todo-list/model/TodoListData'

export const useTodoStore = defineStore('todo-store', () => {
  const todos = reactive<Todo[]>([])
  const finishedTodos = reactive<Todo[]>([])
  const { widgetData } = useWidget<TodoListData>(TodoListData, {
    loadDataByWidgetName: true,
    onDataLoaded: () => {
      todos.splice(0, todos.length, ...widgetData.value.todoList)
      finishedTodos.splice(0, finishedTodos.length, ...widgetData.value.finishedList)
    },
  })

  function save() {
    widgetData.value.todoList = todos
    widgetData.value.finishedList = finishedTodos
    WidgetDataApi.saveByName(widgetData.value, { sendBroadcast: false })
  }

  function deleteTodo(todo: Todo) {
    todos.splice(todos.indexOf(todo), 1)
    save()
  }

  function finishTodo(todo: Todo) {
    todos.splice(todos.indexOf(todo), 1)
    todo.dueDateTime = new Date().toISOString()
    finishedTodos.splice(0, 0, todo)
    save()
  }

  function reTodo(todo: Todo) {
    todo.dueDateTime = undefined
    todo.order = 0
    finishedTodos.splice(finishedTodos.indexOf(todo), 1)
    todos.splice(0, 0, todo)
    save()
  }

  function saveTodo(data: TodoUpdate) {
    if (data.todo) {
      const findIndex = todos.findIndex(it => it.id == data.todo!.id)
      if (findIndex > -1) {
        todos[findIndex].content = data.content
      }
    }
    else {
      todos.splice(0, 0, new Todo(data.content))
    }
    save()
  }

  return {
    save,
    deleteTodo,
    saveTodo,
    todos,
    reTodo,
    finishedTodos,
    finishTodo,
  }
})
