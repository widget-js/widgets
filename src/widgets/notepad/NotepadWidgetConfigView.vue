<template>
  <widget-edit-dialog :title="widgetParams.title" @confirm="onSaveClick()">
    <template v-slot:widget>
      <clock-widget :style="{
        width:`${widgetParams.widthPx}px`,
        height:`${widgetParams.heightPx}px`
      }" :background-color="widgetData.backgroundColor"></clock-widget>
    </template>
    <template v-slot:form>
      <el-form>
        <widget-color-field v-model:color="widgetData.backgroundColor" title="背景颜色"/>
      </el-form>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import {WidgetEditDialog} from "@widget-js/vue3";
import {useRoute} from "vue-router";
import {WidgetParams,WidgetData,WidgetDataRepository} from "@widget-js/core";
import {ref} from "vue";
import ClockWidget from "@/widgets/clock/ClockWidget.vue";
import WidgetColorField from "@widget-js/vue3";
//从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query);
//组件默认数据
const defaultData = new WidgetData(widgetParams.name!, widgetParams.id!);
defaultData.backgroundColor = "#333";

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
