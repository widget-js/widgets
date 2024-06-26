import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useWidgetData } from '@widget-js/vue3'
import localforage from 'localforage'
import { WidgetDataApi } from '@widget-js/core'
import {
  Todo,
  TodoListData,
  type TodoUpdate,
} from '@/widgets/todo-list/model/TodoListData'
import TodoListWidget from '@/widgets/todo-list/TodoList.widget'

export const useTodoStore = defineStore('todo-store', () => {
  const todos = reactive<Todo[]>([])
  const finishedTodos = reactive<Todo[]>([])

  const todoListStorage = localforage.createInstance({
    name: `${TodoListWidget.name}`,
    storeName: 'todo-list',
  })
  const dueStorage = localforage.createInstance({
    name: `${TodoListWidget.name}`,
    storeName: 'due-list',
  })

  const sortedTodos = computed(() => {
    return todos.sort((a, b) => a.order - b.order)
  })

  const loadTodo = async () => {
    const keys = await dueStorage.keys()
    for (const key of keys) {
      const todo = await dueStorage.getItem<string>(key)
      if (todo) {
        finishedTodos.push(Todo.fromJSON(JSON.parse(todo)))
      }
    }

    const todoListKeys = await todoListStorage.keys()
    for (const key of todoListKeys) {
      const todo = await todoListStorage.getItem<string>(key)
      if (todo) {
        todos.push(Todo.fromJSON(JSON.parse(todo)))
      }
    }

    todos.sort((a, b) => a.order - b.order)
  }

  loadTodo()

  const { widgetData } = useWidgetData(TodoListData, {
    loadDataByWidgetName: true,
    onDataLoaded: () => {
      // 迁移旧版本数据
      if (widgetData.value.todoList) {
        for (const todo of widgetData.value.todoList) {
          todos.push(todo)
          todoListStorage.setItem(`${todo.id}`, JSON.stringify(todo))
        }
        widgetData.value.todoList = []
        WidgetDataApi.saveByName(widgetData.value, { sendBroadcast: false })
      }
    },
  })

  function deleteTodo(todo: Todo) {
    todos.splice(todos.indexOf(todo), 1)
    todoListStorage.removeItem(`${todo.id}`)
  }

  function finishTodo(todo: Todo) {
    todos.splice(todos.indexOf(todo), 1)
    todo.dueDateTime = new Date().toISOString()
    finishedTodos.splice(0, 0, todo)
    dueStorage.setItem(`${todo.id}`, JSON.stringify(todo))
    todoListStorage.removeItem(`${todo.id}`)
  }

  function reTodo(todo: Todo) {
    todo.dueDateTime = undefined
    todo.order = 0
    finishedTodos.splice(finishedTodos.indexOf(todo), 1)
    todos.splice(0, 0, todo)
    const id = todo.id
    dueStorage.removeItem(`${id}`)
    todoListStorage.setItem(`${id}`, JSON.stringify(todo))
  }

  function saveTodo(data: TodoUpdate) {
    if (data.todoId) {
      const findIndex = todos.findIndex(it => it.id == data.todoId)
      if (findIndex > -1) {
        const editTodo = todos[findIndex]
        editTodo.title = data.title
        todoListStorage.setItem(`${editTodo.id}`, JSON.stringify(editTodo))
      }
    }
    else {
      const todo = new Todo(data.title)
      todos.splice(0, 0, todo)
      todoListStorage.setItem(`${todo.id}`, JSON.stringify(todo))
    }
  }

  const save = () => {
    for (const todo of todos) {
      todoListStorage.setItem(`${todo.id}`, JSON.stringify(todo))
    }
  }

  return {
    deleteTodo,
    save,
    saveTodo,
    todos,
    reTodo,
    sortedTodos,
    finishedTodos,
    finishTodo,
  }
})
