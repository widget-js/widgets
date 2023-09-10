<template>
  <widget-wrapper>
    <wave-progress-widget v-bind="widgetData"></wave-progress-widget>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import WaveProgressWidget from "./WaveProgressWidget.vue";
import {useWidget, WidgetWrapper} from "@widget-js/vue3";
import {WaveProgressData} from "@/widgets/wave-progress/model/WaveProgressData";

//从url地址获取组件参数
const {widgetParams, widgetData} = useWidget(WaveProgressData,{
  onDataLoaded: (data) => {
    console.log(widgetParams.id)
    console.log(widgetData.value)
  }
});

</script>

<style scoped>

</style>
