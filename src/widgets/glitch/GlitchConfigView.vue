<template>

    <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                        :widget-data="widgetData"
                        @confirm="onSaveClick()">
        <template v-slot:widget>
            <!-- 组件配置内容   -->
            <glitch-widget :style="{
        width:`${widgetParams.widthPx}px`,
        height:`${widgetParams.heightPx}px`
      }" :background-color="widgetData.backgroundColor"></glitch-widget>
        </template>
        <template v-slot:form>
            <!--  TODO 这里写自定义表单内容          -->
        </template>
    </widget-edit-dialog>
</template>

<script lang="ts">

import GlitchWidget from "@/widgets/clock/ClockWidget.vue";
import {useWidget, WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {WidgetData, WidgetDataRepository} from "@widget-js/core";
import {reactive} from "vue";

export default {
  name: "",
  components: {GlitchWidget, WidgetEditDialog},
  setup() {
    const {widgetData, widgetParams} = useWidget(WidgetData)

    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: false,
      backgroundColor: true,
      borderRadius: true
    }));

    return {widgetData, widgetParams, widgetConfigOption}
  },
  methods: {
    async onSaveClick() {
      await WidgetDataRepository.save(this.widgetData);
      window.close();
    }
  }
}
</script>

<style scoped>

</style>
