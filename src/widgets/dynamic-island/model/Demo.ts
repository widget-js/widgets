import {AppNotification} from "@widget-js/core";
import dayjs from "dayjs";

export const SitReminderDemo = new AppNotification({
    type: "reminder",
    message: "您已经连续使用电脑45分钟",
    title: "久坐提醒",
    icon: "computer_line",
    cancelButtonText: "知道了",
    backgroundColor: "black",
    confirmButtonText: "休息一下"
});

export const AdvanceCountdownDemo = new AppNotification({
    type: 'advance-countdown',
    title: "新年倒计时",
    message: '恭喜发财',
    backgroundColor: "black",
    targetTime: dayjs().add(1,'hour').toISOString(),
});


export const CountdownDemo = new AppNotification({
    type: 'countdown',
    message: "倒计时",
    backgroundColor: "rgba(0,0,0,0.5)",
    targetTime: dayjs().add(1,'hour').toISOString(),
});

export const ErrorDemo = new AppNotification({
    type: 'error',
    message: "错误信息",
});

