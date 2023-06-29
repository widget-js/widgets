<template>
  <widget-wrapper>
    <labor-progress-widget v-bind="widgetData" :start-time="startTime" :end-time="endTime"/>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import LaborProgressWidget from './LaborProgressWidget.vue'
import LaborProgressData from '@/widgets/labor-progress/model/LaborProgressData'
import {useWidget, WidgetWrapper} from '@widget-js/vue3'
import {ref} from 'vue'

const {widgetData, widgetParams} = useWidget(LaborProgressData, {
  onDataLoaded: <LaborProgressData>(data) => {
    if (data) {
      startTime.value = data.getStartTime()
      endTime.value = data.getEndTime()
    }
  }
})

const startTime = ref(widgetData.value.getStartTime())
const endTime = ref(widgetData.value.getEndTime())
</script>

<style scoped></style>
