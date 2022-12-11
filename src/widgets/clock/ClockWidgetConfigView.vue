<template>
  <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                      :widget-data="widgetData"
                      @confirm="onSaveClick()">
    <template v-slot:widget>
      <clock-widget :width="widgetParams.widthPx" :height="widgetParams.heightPx"
                    :background-color="widgetData.backgroundColor"></clock-widget>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import ClockWidget from './ClockWidget.vue'
import {WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {WidgetData, WidgetDataRepository} from "@widget-js/core";
import {reactive} from "vue";
import {useWidget} from "@widget-js/vue3";

const {widgetData, widgetParams} = useWidget(WidgetData)

//修改你的参数
const widgetConfigOption = reactive(new WidgetConfigOption({custom: false, backgroundColor: true, borderRadius: true}))

async function onSaveClick() {
  await WidgetDataRepository.save(widgetData.value);
  window.close();
}
</script>

<style scoped lang="scss">

</style>
