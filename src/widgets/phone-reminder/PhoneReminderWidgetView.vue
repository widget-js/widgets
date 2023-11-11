<template>
  <!--  <dynamic-island-widget-->
  <!--    ref="dynamicIslandWidget"-->
  <!--    v-model:state="state"-->
  <!--    :notification="notification" />-->
</template>

<script lang="ts" setup>
import {BrowserWindowApi, NotificationApi} from '@widget-js/core'
import { computed, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { useWidget } from '@widget-js/vue3'
import { PhoneReminderData } from '@/widgets/phone-reminder/model/PhoneReminder'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
BrowserWindowApi.hide();
dayjs.extend(duration)
const { widgetData,widgetParams } = useWidget(PhoneReminderData, {
  loadDataByWidgetName: true,
  onDataLoaded(data) {
    console.log(data)
  }
})
const now = ref(dayjs())
const enableReminders = computed(() => {
  const weekday = now.value.day()
  return widgetData.value.reminders.filter((it) => it.enable && it.workdays.includes(weekday))
})
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
</script>

<style scoped></style>
