import type { RouteRecordRaw } from 'vue-router'
import TodoListWidget from './TodoList.widget'

const url = TodoListWidget.path
const name = TodoListWidget.name

const configUrl = TodoListWidget.configPagePath

const TodoListWidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.todo_list" */ './TodoListWidgetView.vue'),
  },
  {
    path: configUrl!,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.todo_list.config" */ './TodoListConfigView.vue'),
  },
]

export default TodoListWidgetRoutes
