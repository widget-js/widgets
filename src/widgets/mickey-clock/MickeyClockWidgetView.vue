<script lang="ts" setup>
import { WidgetData } from '@widget-js/core'
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import MickeyClockWidget from './MickeyClockWidget.vue'

const { widgetData } = useWidget(WidgetData)
</script>

<template>
  <WidgetWrapper>
    <MickeyClockWidget
      :border-radius="widgetData.borderRadius ?? 22"
    />
  </WidgetWrapper>
</template>

<style scoped>
</style>
