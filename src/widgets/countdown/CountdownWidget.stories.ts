import CountdownWidget from './CountdownWidget.vue';

export default {
    title: 'Widget/TodoList',
    component: CountdownWidget,
    argTypes: {
    },
};

export const Template = (args: any) => ({
    components: {CountdownWidget},
    setup() {
        return {args};
    },
    template: '<countdown-widget v-bind="args" :style="{width:`300px`,height:`300px`}"></countdown-widget>',
});
