import DynamicIslandWidget from './DynamicIslandWidget.vue';
import dayjs from "dayjs";

export default {
    title: 'Widget/DynamicIsland',
    component: DynamicIslandWidget,
    argTypes: {
        size: {control: 'select', options: ['small', 'default', 'large']},
        targetTime: {control: 'date'},
        type: {
            control: 'select',
            options: ['call', 'countdown', 'advance-countdown', 'error', 'success', 'warning', 'info'],
        }
    },
};

const Template = (args: any) => ({
    components: {DynamicIslandWidget},
    setup() {
        return {args};
    },
    template: '<dynamic-island-widget v-bind="args"></dynamic-island-widget>',
});

export const MessageError = Template.bind({})
// @ts-ignore
MessageError.args = {
    show: true,
    type: 'error',
    size: 'small',
    message: "错误信息"
}
export const MessageInfo = Template.bind({})
// @ts-ignore
MessageInfo.args = {
    show: true,
    type: 'info',
    size: 'small',
    message: "Hello World"
}
export const MessageSuccess = Template.bind({})
// @ts-ignore
MessageSuccess.args = {
    show: true,
    type: 'success',
    size: 'small',
    message: "Hello World"
}

export const MessageWarning = Template.bind({})
// @ts-ignore
MessageWarning.args = {
    show: true,
    type: 'warning',
    size: 'small',
    message: "警告信息"
}

export const Countdown = Template.bind({})
const date = dayjs('2023-01-01');

// @ts-ignore
Countdown.args = {
    show: true,
    type: 'countdown',
    size: 'small',
    message: '新年倒计时',
    targetTime: date.toISOString(),
}

export const CountdownAdvance = Template.bind({})
// @ts-ignore
CountdownAdvance.args = {
    show: true,
    type: 'advance-countdown',
    size: 'default',
    message: '恭喜发财',
    title: '新年倒计时',
    targetTime: date.toISOString(),
}

export const Call = Template.bind({})
// @ts-ignore
Call.args = {
    show: true,
    type: 'call',
    size: 'default',
    message: '下班提醒',
    title: '章鱼哥',
}


export const Alert = Template.bind({})
// @ts-ignore
Alert.args = {
    show: true,
    type: 'alert',
    size: 'large',
    message: '您已经连续使用电脑45分钟',
    title: '久坐提醒',
}
