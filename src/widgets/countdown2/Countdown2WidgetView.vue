<template>
  <countdown2-widget v-bind="widgetData" :style="{...sizeStyle}" :is-lunar="widgetData.dateType === DateType.LUNAR"
                     :font-size="fontSize"></countdown2-widget>
</template>

<script lang="ts" setup>
import {useWidget} from "@widget-js/vue3";
import {CountdownModel} from "@/widgets/countdown/model/CountdownModel";
import Countdown2WidgetDefine from "./Countdown2.widget";
import {ref} from "vue";
import Countdown2Widget from "@/widgets/countdown2/Countdown2Widget.vue";
import {DateType} from "@/countdown/Event";

const defaultData = new CountdownModel(Countdown2WidgetDefine.name);
defaultData.backgroundColor = "rgb(0,149,255)"
const {widgetData, widgetParams, sizeStyle} = useWidget(CountdownModel, {
  defaultData: defaultData
});
const fontSize = ref(72);
if(widgetParams.widthPx && widgetParams.widthPx <= 150){
  fontSize.value = 54
}
</script>

<style scoped>

</style>
