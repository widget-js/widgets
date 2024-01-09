<script lang="ts" setup>
import {
  WidgetWrapper,
  useAppBroadcast,
  useWidget,
  useWidgetSize,
} from '@widget-js/vue3'
import {
  onMounted,
  ref,
  watch,
} from 'vue'
import type { BroadcastEvent } from '@widget-js/core'
import {
  LogApi,
  NotificationApi,
  WidgetDataApi,
} from '@widget-js/core'
import dayjs from 'dayjs'
import { useIntervalFn } from '@vueuse/core'
import WaterReminderComponent from './WaterReminderComponent.vue'
import { WaterReminderModel } from '@/widgets/water-reminder/model/WaterReminderModel'
import WaterReminderWidget from '@/widgets/water-reminder/WaterReminder.widget'

let lastReminderAt = dayjs()
const cup = ref(0)
const defaultData = new WaterReminderModel()
defaultData.theme.backgroundColor = '#fff'
defaultData.theme.color = '#092239'
const { widgetData } = useWidget(WaterReminderModel, {
  defaultData,
  onDataLoaded: (data) => {
    cup.value = data?.getTodayHistory() ?? 0
    if (data?.lastReminderAt) {
      lastReminderAt = dayjs(data?.lastReminderAt)
    }

    if (data?.enableReminder) {
      // eslint-disable-next-line ts/no-use-before-define
      resume()
    }
    else {
      // eslint-disable-next-line ts/no-use-before-define
      pause()
    }
  },
  loadDataByWidgetName: true,
})

watch(cup, (newValue) => {
  LogApi.log('cup changed!')
  widgetData.value.history[widgetData.value.getTodayKey()] = newValue
  WidgetDataApi.saveByName(widgetData.value, { sendBroadcast: false })
  lastReminderAt = dayjs()
})

const name = WaterReminderWidget.name
const cancelBroadcast = `${name}.cancel`
const okBroadcast = `${name}.ok`
const {
  pause,
  resume,
} = useIntervalFn(() => {
  const now = dayjs()
  const second = now.diff(lastReminderAt, 'second')
  widgetData.value.lastReminderAt = lastReminderAt.toISOString()
  WidgetDataApi.saveByName(widgetData.value, { sendBroadcast: false })

  if (second >= widgetData.value.interval * 60) {
    lastReminderAt = dayjs()
    NotificationApi.reminder(
      '喝水提醒',
      '起来喝杯水吧！',
      'tea-drink',
      '关闭',
      '喝一杯',
      cancelBroadcast,
      okBroadcast,
      5000,
    )
  }
}, 10000)

useAppBroadcast([cancelBroadcast, okBroadcast], (broadcastEvent: BroadcastEvent) => {
  if (broadcastEvent.event == okBroadcast) {
    cup.value++
  }
})

const { windowWidth } = useWidgetSize()
onMounted(() => {
  const size = (windowWidth.value * 16) / 155
  document.documentElement.style.fontSize = `${size}px`
  return size
})
</script>

<template>
  <WidgetWrapper>
    <WaterReminderComponent v-bind="widgetData.theme" v-model:cup="cup" />
  </WidgetWrapper>
</template>

<style lang="scss"></style>
