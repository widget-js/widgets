import DynamicIslandWidget from './DynamicIslandWidget.vue';
import dayjs from "dayjs";
import {NotificationState} from "@/widgets/dynamic-island/model/NotificationState";
import {AdvanceCountdownDemo, SitReminderDemo} from "@/widgets/dynamic-island/model/Demo";

export default {
    title: 'Widget/DynamicIsland',
    component: DynamicIslandWidget,
    argTypes: {
        // size: {control: 'select', options: ['small', 'default', 'large']},
        state: {
            control: 'select',
            options: [NotificationState.HIDE, NotificationState.SMALL, NotificationState.NORMAL, NotificationState.LARGE]
        },
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
    notification: {
        type: 'error',
        message: "错误信息",
    },
    state: NotificationState.SMALL
}
export const MessageInfo = Template.bind({})
// @ts-ignore
MessageInfo.args = {
    notification: {
        type: 'info',
        message: "Hello World",
    },
    state: NotificationState.SMALL
}
export const MessageSuccess = Template.bind({})
// @ts-ignore
MessageSuccess.args = {
    notification: {
        type: 'success',
        message: "Hello World",
    },
    state: NotificationState.SMALL,
}

export const MessageWarning = Template.bind({})
// @ts-ignore
MessageWarning.args = {
    notification: {
        type: 'warning',
        message: "警告信息",
    },
    state: NotificationState.SMALL,
}

export const Countdown = Template.bind({})
const date = dayjs('2023-01-01');

// @ts-ignore
Countdown.args = {
    notification: {
        type: 'countdown',
        message: "新年倒计时",
        backgroundColor: "rgba(0,0,0,0.5)",
        targetTime: date.toISOString(),
    },
    state: NotificationState.SMALL,
}

export const CountdownAdvance = Template.bind({})
// @ts-ignore
CountdownAdvance.args = {
    notification: AdvanceCountdownDemo,
    state: NotificationState.NORMAL,
}


export const Reminder = Template.bind({})
// @ts-ignore
Reminder.args = {
    state: NotificationState.LARGE,
    notification: SitReminderDemo
}
