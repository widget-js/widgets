<template>
  <widget-wrapper>
    <mickey-clock-widget
      :borderRadius="widgetData.borderRadius??22">
    </mickey-clock-widget>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import {WidgetData, WidgetParams} from "@widget-js/core";
import MickeyClockWidget from "./MickeyClockWidget.vue"
import {useWidget, WidgetWrapper} from "@widget-js/vue3";
import MickeyClockWidgetDefine from "@/widgets/mickey-clock/MickeyClock.widget";

const {widgetData, widgetParams, sizeStyle} = useWidget(WidgetData);
</script>

<style scoped>
</style>
