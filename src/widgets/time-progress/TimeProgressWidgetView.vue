<template>
  <time-progress-widget :background-color="widgetData.backgroundColor"></time-progress-widget>
</template>

<script lang="ts" setup>
import TimeProgressWidget from "./TimeProgressWidget.vue"
import {useWidget} from "@widget-js/vue3";
import {WidgetData} from "@widget-js/core";

//从url地址获取组件参数
const {widgetParams,widgetData} = useWidget(WidgetData);
</script>

<style scoped>

</style>
