<template>
  <!-- TODO:组件页面，这里编写组件业务逻辑-->
  <mickey-clock-widget :background-color="widgetData.backgroundColor"
                       :style="{width:`${widgetParams.widthPx}px`,height:`${widgetParams.heightPx}px`}">

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

    const {widgetData, widgetParams} = useWidget(WidgetData, {debugParams});
    return {widgetData, widgetParams};
  }
}
</script>

<style scoped>


</style>
