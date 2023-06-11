<template>

    <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                        :widget-data="widgetData"
                        @confirm="onSaveClick()">
        <template v-slot:form>
            <!--  TODO 这里写自定义表单内容          -->
        </template>
    </widget-edit-dialog>
</template>

<script lang="ts">

import ClipboardWidget from "./ClipboardWidget.vue";
import {useWidget, WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {WidgetData, WidgetDataApi} from "@widget-js/core";
import {reactive} from "vue";

export default {
  name: "",
  components: {ClipboardWidget, WidgetEditDialog},
  setup() {
    const {widgetData, widgetParams} = useWidget(WidgetData)

    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: true,
      backgroundColor: true,
      borderRadius: true,
      preview: false
    }));

    return {widgetData, widgetParams, widgetConfigOption}
  },
  methods: {
    async onSaveClick() {
      await WidgetDataApi.save(this.widgetData);
      window.close();
    }
  }
}
</script>

<style scoped>

</style>
