import { useWidget } from '@widget-js/vue3'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { BrowserWindowApi, DeviceApi, NotificationApi, WidgetApi, WidgetApiEvent } from '@widget-js/core'
import { useIntervalFn, useStorage } from '@vueuse/core'
import { SitReminder } from '@/widgets/sit-reminder/model/SitReminder'

dayjs.extend(duration)

/**
 * 久坐提醒
 */
const useSitReminder = () => {
  const sitReminder = new SitReminder()
  const cancelBroadcast = sitReminder.name + '.cancel'
  const confirmBroadcast = sitReminder.name + '.confirm'
  const { widgetData: sitReminderData } = useWidget(SitReminder, {
    defaultData: sitReminder,
    loadDataByWidgetName: true,
    widgetName: sitReminder.name,
    useBroadcastEvent: [cancelBroadcast, confirmBroadcast, WidgetApiEvent.DATA_CHANGED],
    onBroadcastEvent: async (broadcastEvent) => {
      console.log(broadcastEvent)
      if (broadcastEvent.event == cancelBroadcast) {
      } else if (broadcastEvent.event == confirmBroadcast) {
        await BrowserWindowApi.openUrl(breakUrl)
      }
    },
    onDataLoaded(data) {
      loadBreakUrl(sitReminderData.value.breakInterval)
    }
  })

  const lastUsedAtData = useStorage(sitReminder.name + '.last_used_at', dayjs().toISOString())
  const usageCount = useStorage(sitReminder.name + '.usage_count', 0)
  let lastUsedAt = dayjs(lastUsedAtData.value)
  let breakUrl = ''
  let loadBreakUrl = async (minute: number) => {
    const widgetPackage = await WidgetApi.getWidgetPackage('cn.widgetjs.widgets')
    breakUrl = widgetPackage.getUrl('widget/sit_reminder/break?win_fullscreen=true&win_always_on_top=true&duration=' + minute * 60)
    console.log(breakUrl)
  }
  const interval = 10
  let lastPoint = { x: 0, y: 0 }
  useIntervalFn(async () => {
    if (!sitReminderData.value.enable) {
      return
    }
    const now = dayjs()

    const duration = dayjs.duration(now.diff(lastUsedAt))
    if (duration.asSeconds() > sitReminderData.value.mouseCheckInterval * 60 + interval) {
      usageCount.value = 0
    } else {
      usageCount.value = usageCount.value + interval
      if (usageCount.value < 20 && (await BrowserWindowApi.existsByUrl(breakUrl))) {
        usageCount.value = 0
      }
    }
    console.log(usageCount.value, lastUsedAt.toISOString(), sitReminderData.value.sitInterval)
    const point = await DeviceApi.getCursorScreenPoint()
    if (point.x != lastPoint.x || point.y != lastPoint.y) {
      console.log('mouse moved', point)
      lastPoint = point
      lastUsedAt = now
    }
    //sitReminderData.value.sitInterval * 60
    if (usageCount.value >= sitReminderData.value.sitInterval * 60) {
      await NotificationApi.reminder(
        '久坐提醒',
        `您已经连续使用电脑${sitReminderData.value.sitInterval}分钟`,
        'computer_line',
        '知道了',
        '休息一下',
        cancelBroadcast,
        confirmBroadcast,
        10000
      )
      usageCount.value = 0
    }
  }, interval * 1000)
}

export default useSitReminder
