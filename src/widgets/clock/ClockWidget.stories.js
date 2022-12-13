import ClockWidget from './ClockWidget.vue';

export default {
    title: 'Widget/Clock',
    component: ClockWidget,
    argTypes: {
    },
};

export const Widget = (args) => ({
    components: {ClockWidget},
    setup() {
        return {args};
    },
    template: '<clock-widget v-bind="args"></clock-widget>',
});



