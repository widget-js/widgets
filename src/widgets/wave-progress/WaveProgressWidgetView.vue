<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import WaveProgressWidget from './WaveProgressWidget.vue'
import { WaveProgressData } from '@/widgets/wave-progress/model/WaveProgressData'

// 从url地址获取组件参数
const { widgetData } = useWidget(WaveProgressData, {})
</script>

<template>
  <WidgetWrapper>
    <WaveProgressWidget v-bind="widgetData" />
  </WidgetWrapper>
</template>

<style scoped>

</style>
