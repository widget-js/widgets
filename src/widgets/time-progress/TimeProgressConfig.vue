<template>

  <widget-edit-dialog :title="widgetParams.title" @confirm="onSaveClick()">
    <template v-slot:widget>
      <!-- 组件配置内容   -->
      <time-progress-widget :style="{
      width:`${widgetParams.widthPx}px`,
      height:`${widgetParams.heightPx}px`
    }" :background-color="widgetData.backgroundColor"></time-progress-widget>
    </template>
    <template v-slot:form>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {WidgetEditDialog} from "@widget-js/vue3";
import {useRoute} from "vue-router";
import {WidgetDataRepository, WidgetParams, WidgetData} from "@widget-js/core";
import TimeProgressWidget from "./TimeProgressWidget.vue";

//从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query);
//组件默认数据
const defaultData = new WidgetData(widgetParams.name!, widgetParams.id!);

const widgetData = ref(defaultData);

WidgetDataRepository.find<WidgetData>(widgetParams.name!, widgetParams.id!,WidgetData).then((data) => {
  if (data) {
    //有已保存过的数据，覆盖
    widgetData.value = data;
  }
})

/**
 * 点击保存按钮
 */
async function onSaveClick() {
  await WidgetDataRepository.save(widgetData.value);
  window.close();
}
</script>

<style scoped>

</style>
