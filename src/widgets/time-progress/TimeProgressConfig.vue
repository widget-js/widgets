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
import {useWidget, WidgetEditDialog} from "@widget-js/vue3";
import {WidgetData, WidgetDataRepository} from "@widget-js/core";
import TimeProgressWidget from "./TimeProgressWidget.vue";

const {widgetData,widgetParams} = useWidget(WidgetData)

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
