<template>
  <!-- TODO:组件页面，这里编写组件业务逻辑-->
  <wave-progress-widget :style="{
    width:`${widgetParams.widthPx}px`,
    height:`${widgetParams.heightPx}px`
    }" :extra="widgetData"></wave-progress-widget>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {WidgetDataRepository, WidgetParams, WidgetData, WebSocketEvent, WebSocketEventType} from "@widget-js/core";
import WaveProgressWidget from "./WaveProgressWidget.vue";
import {WaveProgressExtraConfig, ProgressType} from './WaveProgressExtraConfig'
import widgetPackage from "@/widgets/widget-package";

//从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query);

//组件默认数据
const defaultData = new WaveProgressExtraConfig(widgetParams.name!, widgetParams.id!);
const widgetData = ref(defaultData);

WidgetDataRepository.find<WaveProgressExtraConfig>(widgetParams.name!, widgetParams.id!,WaveProgressExtraConfig).then((data) => {
  if (data) {
    //有已保存过的数据，覆盖
    widgetData.value = data;
    console.log(data)
  }
})

if (process.env.NODE_ENV === 'development') {
  const url = `ws://127.0.0.1:3506`;
  const ws = new WebSocket(url)
  ws.onopen = () => {
    for (let widget of widgetPackage.widgets) {
      widget.packageName = widgetPackage.name
    }
    let webSocketEvent = new WebSocketEvent(WebSocketEventType.RESISTER_WIDGETS, widgetPackage);
    let data = JSON.stringify(webSocketEvent);
    console.log(data);
    ws.send(data);
    ws.close();
  }
}
</script>

<style scoped>

</style>
