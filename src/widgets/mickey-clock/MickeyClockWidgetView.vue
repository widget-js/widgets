<template>
  <mickey-clock-widget :background-color="widgetData.backgroundColor" :width="widgetParams.widthPx"
                       :borderRadius="widgetData.borderRadius??22"
                       :height="widgetParams.heightPx">
  </mickey-clock-widget>
</template>

<script lang="ts">
import {WidgetData, WidgetParams} from "@widget-js/core";
import MickeyClockWidget from "./MickeyClockWidget.vue"
import {useWidget} from "@widget-js/vue3";
import MickeyClockWidgetDefine from "@/widgets/mickey-clock/MickeyClock.widget";

export default {
  name: "MickeyClockWidgetView",
  components: {MickeyClockWidget},
  setup() {
    const debugParams = new WidgetParams();
    debugParams.widthPx = 200
    debugParams.heightPx = 200;
    debugParams.id = "123";
    debugParams.name = MickeyClockWidgetDefine.name;

    const {widgetData, widgetParams, sizeStyle} = useWidget(WidgetData, {debugParams});
    return {widgetData, widgetParams, sizeStyle};
  }
}
</script>

<style scoped>


</style>
