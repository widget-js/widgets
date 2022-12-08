<template>
  <widget-edit-dialog :title="widgetParams.title" @confirm="onSaveClick()">
    <template v-slot:widget>
      <action-widget :style="{
        width:`${widgetParams.widthPx}px`,
        height:`${widgetParams.heightPx}px`
      }" :background-color="widgetData.backgroundColor"></action-widget>
    </template>
    <template v-slot:form>
      <el-form>
        <widget-color-field v-model:color="widgetData.backgroundColor" title="背景颜色"/>
      </el-form>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import ActionWidget from './ActionWidget.vue'
import {WidgetDataRepository, WidgetParams, WidgetData} from "@widget-js/core";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {WidgetColorField} from "@widget-js/vue3";
//从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query);
//组件默认数据
const defaultData = new WidgetData(widgetParams.name!, widgetParams.id!);
defaultData.backgroundColor = "#F0F2F5";

const widgetData = ref(defaultData);

WidgetDataRepository.find<WidgetData>(widgetParams.name!, widgetParams.id!,WidgetData).then((data) => {
  if (data) {
    widgetData.value = data;
  }
})

function onTimezoneChanged() {

}

async function onSaveClick() {
  await WidgetDataRepository.save(widgetData.value);
  window.close();
}
</script>

<style scoped lang="scss">

</style>
