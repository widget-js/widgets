<template>

  <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                      :widget-data="widgetData"
                      @confirm="onSaveClick()">
    <template v-slot:form>
      <widget-checkbox-field v-model:checked="widgetData.enable" label="启用久坐提醒"/>
      <widget-slider-field v-model:value="widgetData.sitInterval" label="久坐时长（分钟）" :min="5" :max="120"/>
      <widget-slider-field v-model:value="widgetData.breakInterval" label="休息时长（分钟）" :min="1" :max="60"/>
      <widget-slider-field v-model:value="widgetData.usageInterval" label="检测阈值（分钟）" :min="1" :max="120"/>
      <el-alert type="info" :closable="false">
        <p>检测阈值：多久没使用鼠标视为离开电脑</p>
      </el-alert>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">

import DynamicIslandWidget from "./DynamicIslandWidget.vue";
import {useWidget, WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {NotificationApi, WidgetApi} from "@widget-js/core";
import {reactive} from "vue";
import {SitReminder} from "@/widgets/dynamic-island/model/SitReminder";

export default {
  name: "",
  components: {DynamicIslandWidget, WidgetEditDialog},
  setup() {
    const name = "cn.widgetjs.widget.dynamic_island.sit_reminder";
    const sitReminder = new SitReminder(name);
    const {widgetData, widgetParams} = useWidget(SitReminder, {
      defaultData: sitReminder,
      loadDataByWidgetName: true,
      widgetName: name
    })
    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: true,
      backgroundColor: false,
      borderRadius: false,
      preview: false
    }));

    return {widgetData, widgetParams, widgetConfigOption}
  },
  methods: {
    async onSaveClick() {
      await WidgetApi.saveDataByName(this.widgetData);
      NotificationApi.info(this.widgetData.breakInterval)
      window.close();
    }
  }
}
</script>

<style scoped>

</style>
