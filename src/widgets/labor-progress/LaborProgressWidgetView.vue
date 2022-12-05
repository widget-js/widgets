<template>
  <labor-progress-widget v-bind="widgetData"
                         :start-time="startTime"
                         :end-time="endTime"/>
</template>

<script lang="ts" setup>
import LaborProgressWidget from "./LaborProgressWidget.vue";
import LaborProgressData from "@/widgets/labor-progress/model/LaborProgressData";
import {useWidget} from "@widget-js/vue3";
import {WidgetParams} from "@widget-js/core";
import {ref} from "vue";

const debugParams = new WidgetParams();
debugParams.width = 2;
debugParams.height = 2;

const {widgetData, widgetParams} = useWidget(LaborProgressData, {
  onDataLoaded: <LaborProgressData>(data) => {
    console.log(data)
    startTime.value = data.getStartTime()
    endTime.value = data.getEndTime()
  },
  debugParams: debugParams
})

const startTime = ref(widgetData.value.getStartTime())
const endTime = ref(widgetData.value.getEndTime())
</script>

<style scoped>

</style>
