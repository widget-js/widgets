<template>
  <dynamic-island-widget
    ref="dynamicIslandWidget"
    v-model:state="state"
    :preview="widgetParams.preview"
    :notification="notification" />
</template>

<script lang="ts">
import { AppNotification, NotificationApi } from '@widget-js/core'
import PhoneReminderWidget from './PhoneReminderWidget.vue'
import { computed, reactive, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { NotificationState } from '@/widgets/dynamic-island/model/NotificationState'
import DynamicIslandWidget from '@/widgets/dynamic-island/DynamicIslandWidget.vue'
import { useWidget } from '@widget-js/vue3'
import { PhoneReminderData } from '@/widgets/phone-reminder/model/PhoneReminder'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
export default {
  name: 'PhoneReminderWidgetView',
  components: { DynamicIslandWidget, PhoneReminderWidget },
  setup() {
    const { widgetParams, widgetData } = useWidget(PhoneReminderData, {
      loadDataByWidgetName: true,
      onDataLoaded(data) {
        console.log(data?.reminders)
      }
    })
    const defaultNotification = new AppNotification({
      duration: 0,
      message: '欢迎',
      title: '',
      type: 'info'
    })
    const now = ref(dayjs())
    const enableReminders = computed(() => {
      const weekday = now.value.day()
      return widgetData.value.reminders.filter((it) => it.enable && it.workdays.includes(weekday))
    })
    const notification = reactive(defaultNotification)
    const state = ref(NotificationState.HIDE)
    if (widgetParams.preview) {
      const setState = () => {
        switch (notification.type) {
          case 'call':
          case 'advance-countdown':
          case 'url':
            state.value = NotificationState.NORMAL
            break
          case 'reminder':
            state.value = NotificationState.LARGE
            break
          default:
            state.value = NotificationState.SMALL
            break
        }
      }
      let count = 1
      let demoIndex = 0
      useIntervalFn(async () => {
        if (count % 3 == 0) {
          state.value = NotificationState.HIDE
          demoIndex++
        } else {
          const phoneReminder = widgetData.value.reminders[demoIndex % widgetData.value.reminders.length]
          const appNotification = await phoneReminder.toNotification()
          Object.assign(notification, appNotification)
          setState()
        }
        count++
      }, 1000)
    } else {
      useIntervalFn(async () => {
        now.value = dayjs().set('milliseconds', 0)
        for (let phoneReminder of enableReminders.value) {
          const time = phoneReminder.getTimes()[0]
          const targetTime = dayjs()
            .set('hour', time.getHours())
            .set('minute', time.getMinutes())
            .set('second', 0)
            .add(-phoneReminder.advanceSeconds, 'second')
            .set('milliseconds', 0)
          const number = dayjs.duration(targetTime.diff(now.value)).asSeconds()
          if (number == 0) {
            const appNotification = await phoneReminder.toNotification()
            await NotificationApi.send(appNotification)
          }
        }
      }, 1000)
    }
    return { notification, state, widgetParams }
  }
}
</script>

<style scoped></style>
