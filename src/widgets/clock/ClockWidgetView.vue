<template>
  <widget-wrapper>
    <clock-widget :background-color="widgetData.backgroundColor"></clock-widget>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import {WidgetData} from "@widget-js/core";
import ClockWidget from "./ClockWidget.vue"
import {useWidget,WidgetWrapper} from "@widget-js/vue3";
const {widgetData, widgetParams} = useWidget(WidgetData);
</script>

<style scoped>

</style>
