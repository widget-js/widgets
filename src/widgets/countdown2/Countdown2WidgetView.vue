<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import Countdown2WidgetDefine from './Countdown2.widget'
import { CountdownModel } from '@/widgets/countdown/model/CountdownModel'
import Countdown2Widget from '@/widgets/countdown2/Countdown2Widget.vue'
import { DateType } from '@/countdown/Event'

const defaultData = new CountdownModel(Countdown2WidgetDefine.name)
defaultData.theme.primaryColor = 'rgb(0,149,255)'
defaultData.theme.fontSize = '72px'
const {
  widgetData,
} = useWidget(CountdownModel, { defaultData })
</script>

<template>
  <WidgetWrapper>
    <Countdown2Widget
      :date="widgetData.date"
      :title="widgetData.title"
      :primary-color="widgetData.theme.primaryColor"
      :background-color="widgetData.theme.backgroundColor"
      :is-lunar="widgetData.dateType === DateType.LUNAR"
      :font-size="fontSize"
    />
  </WidgetWrapper>
</template>

<style scoped>

</style>
