import ClockWidget from './ClockWidget.vue';

export default {
    title: 'Widget/Clock',
    component: ClockWidget,
    argTypes: {
    },
};

export const Widget = (args: any) => ({
    components: {ClockWidget},
    setup() {
        return {args};
    },
    template: '<clock-widget v-bind="args"></clock-widget>',
});

Widget.parameters = {
    design: [
        {
            name: "蓝湖",
            type: "link",
            url: "https://share.lanhuapp.com/#/invite?sid=X0xtlll",
        }
    ],
}


