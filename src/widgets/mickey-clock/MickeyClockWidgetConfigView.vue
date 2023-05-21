<template>
  <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                      :widget-data="widgetData"
                      @confirm="onSaveClick()">
    <template v-slot:widget>
      <div class="" style=" width: 200px;  height: 200px;"></div>
      <mickey-clock-widget :width="widgetParams.widthPx" :height="widgetParams.heightPx"
                           :border-radius="widgetData.borderRadius??22"
                           :background-color="widgetData.backgroundColor"></mickey-clock-widget>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">
import {useWidget, WidgetConfigOption} from "@widget-js/vue3";
import {WidgetData, WidgetDataApi} from "@widget-js/core";
import {reactive} from "vue";
import MickeyClockWidget from "@/widgets/mickey-clock/MickeyClockWidget.vue";

export default {
  name: "",
  components: {MickeyClockWidget},
  setup() {
    const {widgetData, widgetParams} = useWidget(WidgetData)

    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: false,
      backgroundColor: true,
      borderRadius: true,
      previewWidth: 200,
      previewHeight: 200,
    }));
    return {widgetData, widgetParams, widgetConfigOption}
  },
  methods: {
    async onSaveClick() {
      await WidgetDataApi.save(this.widgetData);
      window.close();
    }
  },
  mounted() {
    console.log(window.location)
  }
}
</script>

<style scoped lang="scss">
</style>
