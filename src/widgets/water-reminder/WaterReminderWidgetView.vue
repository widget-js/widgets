<template>
  <water-reminder-widget
    v-bind="widgetData"
    v-model:cup="cup"
    :style="sizeStyle"
  ></water-reminder-widget>
</template>

<script lang="ts" setup>
import WaterReminderWidget from './WaterReminderWidget.vue'
import { useAppBroadcast, useNotification, useWidget } from '@widget-js/vue3'
import { WaterReminderModel } from '@/widgets/water-reminder/model/WaterReminderModel'
import { ref, watch } from 'vue'
import { WidgetApi, NotificationApi, BroadcastEvent } from '@widget-js/core'
import dayjs from 'dayjs'
import { useIntervalFn } from '@vueuse/core'
import WaterReminderWidgetDefine from '@/widgets/water-reminder/WaterReminder.widget'

let lastReminderAt = dayjs()
const cup = ref(0)

const { widgetData, widgetParams, sizeStyle, dataLoaded } = useWidget(WaterReminderModel, {
  onDataLoaded: (data) => {
    cup.value = data?.getTodayHistory() ?? 0
    if (data?.lastReminderAt) {
      lastReminderAt = dayjs(data?.lastReminderAt)
    }
    if (data?.enableReminder) {
      resume()
    } else {
      pause()
    }
    console.log(data?.lastReminderAt)
    watch(cup, (newValue) => {
      console.log('cup changed!')
      widgetData.value.history[widgetData.value.getTodayKey()] = newValue
      WidgetApi.saveDataByName(widgetData.value, { sendBroadcast: false })
      lastReminderAt = dayjs()
    })
  },
  loadDataByWidgetName: true
})

const name = WaterReminderWidgetDefine.name
const cancelBroadcast = name + '.cancel'
const okBroadcast = name + '.ok'
const { isActive, pause, resume } = useIntervalFn(() => {
  const now = dayjs()
  const second = now.diff(lastReminderAt, 'second')
  widgetData.value.lastReminderAt = lastReminderAt.toISOString()
  WidgetApi.saveDataByName(widgetData.value, { sendBroadcast: false })

  if (second >= widgetData.value.interval * 60) {
    lastReminderAt = dayjs()
    NotificationApi.reminder(
      '喝水提醒',
      '起来喝杯水吧！',
      'drop_line',
      '关闭',
      '喝一杯',
      cancelBroadcast,
      okBroadcast,
      5000
    )
  }
}, 10000)

useAppBroadcast([cancelBroadcast, okBroadcast], (event: BroadcastEvent) => {
  if (event.type == okBroadcast) {
    cup.value++
  }
})
</script>

<style scoped></style>
