import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.todo_list";
//组件标题
const title = {"zh": "代办事项"};
//组件描述
const description = {"zh": "TODO代办事项"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/todo_list";
//配置页路由地址
const configUrl = "/widget/config/todo_list";
//组件关键词
const TodoListWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    previewImage:"/images/preview_todo_list.png",
    width: 3,
    height: 3,
    minWidth: 3,
    maxWidth: 6,
    minHeight: 3,
    maxHeight: 6,
    routes: [
        {
            url: url,
            name: 'index'
        },
        {
            url: configUrl,
            name: 'config'
        },
    ]
})

export default TodoListWidgetDefine;
