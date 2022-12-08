import NotepadWidget from './NotepadWidget.vue';

export default {
    title: 'Widget/Notepad',
    component: NotepadWidget,
    argTypes: {
    },
};

export const Widget = (args: any) => ({
    components: {NotepadWidget},
    setup() {
        return {args};
    },
    template: '<notepad-widget v-bind="args"></notepad-widget>',
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
