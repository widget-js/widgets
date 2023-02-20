import PhoneReminderWidgetDefine from "./PhoneReminder.widget";

const url = PhoneReminderWidgetDefine.getIndexRoute().url;
const name = PhoneReminderWidgetDefine.name;

const configUrl = PhoneReminderWidgetDefine.getConfigRoute()!.url!.split("?")[0];

const PhoneReminderWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.phone_reminder" */ './PhoneReminderWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.phone_reminder.config" */ './PhoneReminderConfigView.vue')
    }
]

export default PhoneReminderWidgetRoutes;
