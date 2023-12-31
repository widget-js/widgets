import type { RouteRecordRaw } from 'vue-router'
import TodoListWidgetDefine from './TodoList.widget'

const url = TodoListWidgetDefine.path
const name = TodoListWidgetDefine.name

const configUrl = TodoListWidgetDefine.configPagePath

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
