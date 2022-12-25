import WaveProgressWidget from './WaveProgressWidget.vue';
import type {Meta, StoryFn} from '@storybook/vue3';

export default {
    title: 'Widget/WaveProgress',
    component: WaveProgressWidget,
    argTypes: {
        progressType: {control: 'select', options: [0, 1, 2, 3, 4]},

    },
} as Meta<typeof WaveProgressWidget>;

const Widget: StoryFn<typeof WaveProgressWidget> = (args: any) => ({
    components: {WaveProgressWidget},
    setup() {
        return {args};
    },
    template: '<wave-progress-widget v-bind="args"></wave-progress-widget>',
});

Widget.parameters = {
    design: [
        {
            name: "蓝湖",
            type: "link",
            url: "https://lanhuapp.com/web/#/item/project/detailDetach?pid=0bf1eaa0-d0ad-490a-be22-792666e90e37&project_id=0bf1eaa0-d0ad-490a-be22-792666e90e37&image_id=911fb119-6fd9-4f9c-b225-cd5294a1708b&fromEditor=true",
        }
    ],
}

export const Today = Widget.bind({});
Today.args = {
    progressType: 0,
    isLunar: false,
    eventName: "今天",
    startDate: new Date("2022/10/11 20:12:12"),
    endDate: new Date("2023/1/1 0:0:0")
}

export const Week = Widget.bind({});
Week.args = {
    progressType: 1,
    isLunar: false,
}

export const Month = Widget.bind({});
Month.args = {
    progressType: 2,
    isLunar: false,
}


export const Year = Widget.bind({});
Year.args = {
    progressType: 3,
    isLunar: false,
}

export const Custom = Widget.bind({});
Custom.args = {
    progressType: 4,
    backgroundColor: "#009bff",
    isLunar: false,
    eventName: "自定义",
    startDate: new Date("2022/10/11 20:12:12"),
    endDate: new Date("2023/1/1 0:0:0")
}
