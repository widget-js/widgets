<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import { WidgetTheme } from '@widget-js/core'
import Countdown2WidgetDefine from './Countdown2.widget'
import { CountdownModel } from '@/widgets/countdown/model/CountdownModel'
import Countdown2Widget from '@/widgets/countdown2/Countdown2Widget.vue'
import { DateType } from '@/countdown/Event'

const defaultData = new CountdownModel(Countdown2WidgetDefine.name)
const {
  widgetData,
  widgetTheme,
} = useWidget(CountdownModel, { defaultData, defaultTheme: new WidgetTheme({
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
      :primary-color="widgetTheme.primaryColor"
      :background-color="widgetTheme.backgroundColor"
      :is-lunar="widgetData.dateType === DateType.LUNAR"
    />
  </WidgetWrapper>
</template>

<style scoped>

</style>
