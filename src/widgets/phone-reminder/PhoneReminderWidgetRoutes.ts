import PhoneReminderWidgetDefine from "./PhoneReminder.widget";

const url = PhoneReminderWidgetDefine.url;
const name = PhoneReminderWidgetDefine.name;

const configUrl = PhoneReminderWidgetDefine.configUrl!.split("?")[0];

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
