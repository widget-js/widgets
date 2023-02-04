import {SitReminder} from "@/widgets/dynamic-island/model/SitReminder";
import {useAppBroadcast, useMouseEventHook, useWidget} from "@widget-js/vue3";
import dayjs from "dayjs";
import {
    BroadcastEvent,
    BrowserWindowApi,
    DeviceApi,
    NotificationApi,
    WidgetApi,
    WidgetDataRepository
} from "@widget-js/core";
import {useIntervalFn, useStorage} from "@vueuse/core";

/**
 * TODO 把久坐提醒拆分成一个独立的组件
 * 久坐提醒
 */
const useSitReminder = () => {
    const sitReminder = new SitReminder("cn.widgetjs.widget.sit_reminder");
    const cancelBroadcast = sitReminder.name + ".cancel";
    const confirmBroadcast = sitReminder.name + ".confirm";
    const {widgetData: sitReminderData} = useWidget(SitReminder, {
        defaultData: sitReminder,
        loadDataByWidgetName: true,
        widgetName: sitReminder.name,
        onDataLoaded() {
            loadBreakUrl(sitReminderData.value.breakInterval);
        }
    })

    const lastUsedAtData = useStorage(sitReminder.name + ".last_used_at", dayjs().toISOString());
    const usageCount = useStorage(sitReminder.name + ".usage_count", 0);
    console.log(lastUsedAtData.value);
    console.log(usageCount.value);
    let lastUsedAt = dayjs(lastUsedAtData.value)
    let breakUrl = "";
    let loadBreakUrl = async (minute: number) => {
        const url = await WidgetApi.getWidgetPackageIndexUrl("cn.widgetjs.widgets");
        breakUrl = url + "/widget/dynamic_island/break?win_fullscreen=true&win_always_on_top=true&duration=" + (minute * 60);
    }

    useAppBroadcast([BroadcastEvent.TYPE_WIDGET_UPDATED, cancelBroadcast, confirmBroadcast], async (event: BroadcastEvent) => {
        if (event.type == BroadcastEvent.TYPE_WIDGET_UPDATED) {
            if (event.payload.name == sitReminder.name) {
                WidgetDataRepository.findByName(sitReminder.name, SitReminder).then((data) => {
                    if (data) {
                        console.log(data)
                        sitReminderData.value = data;
                        loadBreakUrl(sitReminderData.value.breakInterval);
                    }
                });
            }
        } else if (event.type == cancelBroadcast) {
        } else if (event.type == confirmBroadcast) {
            await BrowserWindowApi.openUrl(breakUrl);
        }
    });
    const interval = 10;
    let lastPoint = {x: 0, y: 0};
    useIntervalFn(async () => {
        if (!sitReminderData.value.enable) {
            return;
        }
        const now = dayjs();

        const duration = dayjs.duration(now.diff(lastUsedAt));
        if (duration.asSeconds() > sitReminderData.value.mouseCheckInterval * 60 + interval) {
            usageCount.value = 0;
        } else {
            usageCount.value = usageCount.value + interval;
            if (usageCount.value < 20 && await BrowserWindowApi.existsByUrl(breakUrl)) {
                usageCount.value = 0;
            }
        }
        console.log(usageCount.value, lastUsedAt.toISOString());
        const point = await DeviceApi.getCursorScreenPoint();
        if (point.x != lastPoint.x || point.y != lastPoint.y) {
            console.log("mouse moved", point)
            lastPoint = point;
            lastUsedAt = now;
        }
        //sitReminderData.value.sitInterval * 60
        if (usageCount.value > sitReminderData.value.sitInterval * 60) {
            await NotificationApi.reminder("久坐提醒", `您已经连续使用电脑${sitReminderData.value.sitInterval}分钟`, "computer_line",
                "知道了", "休息一下", cancelBroadcast, confirmBroadcast, 10000);
            usageCount.value = 0;
        }
    }, interval * 1000)
}

export default useSitReminder;
