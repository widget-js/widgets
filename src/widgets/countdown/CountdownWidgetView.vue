<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import { ref } from 'vue'
import { DefaultWidgetTheme, WidgetTheme } from '@widget-js/core'
import CountdownWidgetDefine from './Countdown.widget'
import { CountdownModel } from '@/widgets/countdown/model/CountdownModel'
import CountdownWidget from '@/widgets/countdown/CountdownWidget.vue'

const defaultData = new CountdownModel(CountdownWidgetDefine.name)
const {
  widgetData,
  widgetParams,
} = useWidget(CountdownModel, { defaultData, defaultTheme: new WidgetTheme({
  ...DefaultWidgetTheme,
  backgroundColor: '#FFC455',
}) })
const fontSize = ref(54)
const widthPx = widgetParams.widthPx ?? 0
const heightPx = widgetParams.heightPx ?? 0
if (widthPx <= 220 || heightPx <= 220) {
  fontSize.value = 40
}
</script>

<template>
  <WidgetWrapper>
    <CountdownWidget v-bind="widgetData" :font-size="fontSize" />
  </WidgetWrapper>
</template>

<style scoped>

</style>
