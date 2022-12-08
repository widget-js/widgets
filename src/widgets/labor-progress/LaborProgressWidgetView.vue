<template>
  <labor-progress-widget v-bind="widgetData"
                         :style="sizeStyle"
                         :start-time="startTime"
                         :end-time="endTime"/>
</template>

<script lang="ts" setup>
import LaborProgressWidget from "./LaborProgressWidget.vue";
import LaborProgressData from "@/widgets/labor-progress/model/LaborProgressData";
import {useWidget} from "@widget-js/vue3";
import {ref} from "vue";
import {LaborProgressDebugParams} from "@/widgets/labor-progress/LaborProgressWidgetDefine";

const {widgetData, widgetParams,sizeStyle} = useWidget(LaborProgressData, {
  onDataLoaded: <LaborProgressData>(data) => {
    console.log(data)
    startTime.value = data.getStartTime()
    endTime.value = data.getEndTime()
  },
})

const startTime = ref(widgetData.value.getStartTime())
const endTime = ref(widgetData.value.getEndTime())
</script>

<style scoped>

</style>
