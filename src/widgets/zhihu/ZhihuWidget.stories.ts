import ZhihuWidget from './ZhihuWidget.vue';

export default {
    title: 'Widget/Zhihu',
    component: ZhihuWidget,
    argTypes: {
    },
};

export const Widget = (args: any) => ({
    components: {ZhihuWidget},
    setup() {
        return {args};
    },
    template: '<zhihu-widget v-bind="args"></zhihu-widget>',
});

Widget.parameters = {
    design: [
        {
            name: "蓝湖",
            type: "link",
            url: "https://share.lanhuapp.com/#/invite?sid=X0hCsxl",
        }
    ],
}


