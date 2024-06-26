<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidgetData,
} from '@widget-js/vue3'
import { DefaultWidgetTheme, WidgetTheme } from '@widget-js/core'
import Countdown2WidgetDefine from './Countdown2.widget'
import { CountdownModel } from '@/widgets/countdown/model/CountdownModel'
import Countdown2Widget from '@/widgets/countdown2/Countdown2Widget.vue'
import { DateType } from '@/countdown/Event'

const defaultData = new CountdownModel(Countdown2WidgetDefine.name)
const {
  widgetData,
} = useWidgetData(CountdownModel, { defaultData, defaultTheme: new WidgetTheme({
  ...DefaultWidgetTheme,
  fontSize: '72px',
  primaryColor: 'rgb(0,149,255)',
  backgroundColor: 'white',
}) })
</script>

<template>
  <WidgetWrapper>
    <Countdown2Widget
      :date="widgetData.date"
      :title="widgetData.title"
      :is-lunar="widgetData.dateType === DateType.LUNAR"
    />
  </WidgetWrapper>
</template>

<style scoped>

</style>
