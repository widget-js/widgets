import {WidgetData} from "@widget-js/core";
import dayjs from "dayjs";
import {remove} from "lodash";

export class TodoListData extends WidgetData {
    todoList: Todo[] = [new Todo("欢迎使用桌面组件"), new Todo("鼠标右击组件弹出菜单")];
    finishedList: Todo[] = [];

    finishTodo(todo: Todo) {
        remove(this.todoList, function (item) {
            return item.id === todo.id;
        })
        todo.finishedAt = new Date().toISOString();
        //防止快速点击重复添加
        if (!this.finishedList.find(item => item.id == todo.id)) {
            this.finishedList.splice(0, 0, todo);
        }
    }


    undoTodo(todo: Todo) {
        remove(this.finishedList, function (item) {
            return item.id === todo.id;
        })
        todo.finishedAt = undefined;
        if (!this.todoList.find(item => item.id == todo.id)) {
            this.todoList.splice(0, 0, todo);
        }
    }

    parseJSON(json: {}) {
        super.parseJSON(json);
        this.todoList = [];
        this.finishedList = [];
        const todoList = json["todoList"];
        for (let todoJson of todoList) {
            this.todoList.push(Object.assign(new Todo(""), todoJson))
        }

        const finishedList = json["finishedList"];
        for (let todoJson of finishedList) {
            this.finishedList.push(Object.assign(new Todo(""), todoJson))
        }
    }
}

export class Todo {
    id: number
    createdAt: string
    content: string
    finishedAt?: string

    constructor(content: string) {
        this.createdAt = new Date().toISOString();
        this.content = content;
        this.finishedAt = undefined;
        this.id = new Date().getTime();
    }

    isFinished = (): boolean => {
        return this.finishedAt != undefined
    }
}
