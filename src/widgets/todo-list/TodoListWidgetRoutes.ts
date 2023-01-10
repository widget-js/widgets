import TodoListWidgetDefine from "./TodoList.widget";

const url = TodoListWidgetDefine.url;
const name = TodoListWidgetDefine.name;

const configUrl = TodoListWidgetDefine.configUrl!;

const TodoListWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.todo_list" */ './TodoListWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.todo_list.config" */ './TodoListConfigView.vue')
    }
]

export default TodoListWidgetRoutes;
