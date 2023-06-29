<template>
    <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                        :widget-data="widgetData"
                        @confirm="onSaveClick()">
    </widget-edit-dialog>
</template>

<script lang="ts">

import TodoListWidget from "./TodoListWidget.vue";
import {useWidget, WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {WidgetData, WidgetDataApi} from "@widget-js/core";
import {reactive} from "vue";

export default {
  name: "",
  components: {TodoListWidget, WidgetEditDialog},
  setup() {
    const {widgetData, widgetParams} = useWidget(WidgetData)

    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: false,
      preview:false,
      backgroundColor: true,
      borderRadius: true,
      previewWidth:200,
      previewHeight:200,
      color:true,
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
