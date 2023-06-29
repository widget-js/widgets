<template>
  <widget-wrapper>
    <time-progress-widget/>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import TimeProgressWidget from "./TimeProgressWidget.vue"
import {useWidget, WidgetWrapper} from "@widget-js/vue3";
import {WidgetData} from "@widget-js/core";

const {widgetParams, widgetData} = useWidget(WidgetData);
</script>

<style scoped>

</style>
