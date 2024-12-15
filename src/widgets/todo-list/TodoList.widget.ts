import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const TodoListWidget = new Widget({
  name: 'cn.widgetjs.widgets.todo_list',
  title: { 'zh-CN': '待办事项' },
  description: { 'zh-CN': 'TODO待办事项' },
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  previewImage: '/images/preview_todo_list.png',
  width: 4,
  height: 4,
  minWidth: 3,
  maxWidth: 8,
  disabled: true,
  categories: ['productivity'],
  minHeight: 3,
  socialLinks: [
    { name: 'github', link: 'https://github.com/widget-js/widgets' },
  ],
  maxHeight: 10,
  path: '/widget/todo_list',
  configPagePath: '/widget/config/todo_list?frame=true&transparent=false&width=600&height=500',
})

export default TodoListWidget
