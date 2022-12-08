<template>
  <zhihu-widget :background-color="widgetData.backgroundColor"
                :style="{width:`${widgetParams.widthPx}px`,height:`${widgetParams.heightPx}px`}"/>
</template>

<script lang="ts" setup>
import ZhihuWidget from "./ZhihuWidget.vue"
import {useWidget} from "@widget-js/vue3";
import {WidgetData} from "@widget-js/core";

//从url地址获取组件参数
const {widgetParams,widgetData} = useWidget(WidgetData);
</script>

<style scoped>

</style>
