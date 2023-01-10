import TodoListWidget from './TodoListWidget.vue';

export default {
    title: 'Widget/TodoList',
    component: TodoListWidget,
    argTypes: {
    },
};

export const Template = (args: any) => ({
    components: {TodoListWidget},
    setup() {
        return {args};
    },
    template: '<todo-list-widget v-bind="args" :style="{width:`300px`,height:`300px`}"></todo-list-widget>',
});
