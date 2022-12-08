import ActionWidget from './ActionWidget.vue';

export default {
    title: 'Widget/Action',
    component: ActionWidget,
    argTypes: {
    },
};

export const Widget = (args: any) => ({
    components: {ActionWidget},
    setup() {
        return {args};
    },
    template: '<action-widget v-bind="args"></action-widget>',
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


