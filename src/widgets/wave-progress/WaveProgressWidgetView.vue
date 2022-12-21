<template>
  <wave-progress-widget :style="{
    width:`${widgetParams.widthPx}px`,
    height:`${widgetParams.heightPx}px`
    }" :extra="widgetData"></wave-progress-widget>
</template>

<script lang="ts" setup>
import WaveProgressWidget from "./WaveProgressWidget.vue";
import {useWidget} from "@widget-js/vue3";
import {WaveProgressData} from "@/widgets/wave-progress/model/WaveProgressData";

//从url地址获取组件参数
const {widgetParams, widgetData} = useWidget(WaveProgressData);
</script>

<style scoped>

</style>
