<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
  useWidgetStorage,
} from '@widget-js/vue3'
import { DefaultWidgetTheme } from '@widget-js/core'
import WaveProgressWidget from './WaveProgressWidget.vue'
import type { WaveProgressData } from '@/widgets/wave-progress/model/WaveProgressData'
import { DefaultWaveProgressData } from '@/widgets/wave-progress/model/WaveProgressData'

// 从url地址获取组件参数
const { widgetTheme } = useWidget({
  defaultTheme: DefaultWidgetTheme.copy({
    useGlobalTheme: false,
    backgroundColor: undefined,
  }),
})
const configData = useWidgetStorage<WaveProgressData>('WaveProgressConfig', DefaultWaveProgressData)
</script>

<template>
  <WidgetWrapper>
    <WaveProgressWidget v-bind="configData" :background-color="widgetTheme.backgroundColor" />
  </WidgetWrapper>
</template>

<style scoped>

</style>
