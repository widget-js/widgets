<template>
  <clock-widget :background-color="widgetData.backgroundColor" :width="widgetParams.widthPx"
                :height="widgetParams.heightPx"></clock-widget>
</template>

<script lang="ts" setup>
import {WidgetData} from "@widget-js/core";
import ClockWidget from "./ClockWidget.vue"
import {useWidget} from "@widget-js/vue3";


const {widgetData, widgetParams} = useWidget(WidgetData);

console.log(window.location)
</script>

<style scoped>

</style>
