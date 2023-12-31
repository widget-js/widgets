<script lang="ts" setup>
import { ref } from 'vue'
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
const {
  widgetData,
  widgetParams,
} = useWidget(CountdownModel, { defaultData })
const fontSize = ref(72)
if (widgetParams.widthPx && widgetParams.widthPx <= 150) {
  fontSize.value = 54
}
</script>

<template>
  <WidgetWrapper>
    <Countdown2Widget
      v-bind="widgetData.theme" :is-lunar="widgetData.dateType === DateType.LUNAR"
      :font-size="fontSize"
    />
  </WidgetWrapper>
</template>

<style scoped>

</style>
