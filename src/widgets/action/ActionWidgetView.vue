<template>
  <action-widget :background-color="widgetData.backgroundColor"></action-widget>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {WidgetDataRepository, WidgetParams, WidgetData} from "@widget-js/core";
import ActionWidget from "./ActionWidget.vue"

//从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query);
//默认数据
const defaultData = new WidgetData(widgetParams.name!, widgetParams.id!);
defaultData.backgroundColor = "#333";

const widgetData = ref(defaultData);
//加载已保存的数据
WidgetDataRepository.find<WidgetData>(widgetParams.name!, widgetParams.id!,WidgetData).then((data) => {
  if (data) {
    //有数据库则覆盖掉默认数据
    widgetData.value = data;
  }
})
</script>

<style scoped>

</style>
