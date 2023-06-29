<template>
  <widget-wrapper>
    <countdown-widget v-bind="widgetData" :font-size="fontSize"></countdown-widget>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import {useWidget, WidgetWrapper} from "@widget-js/vue3";
import {CountdownModel} from "@/widgets/countdown/model/CountdownModel";
import CountdownWidgetDefine from "./Countdown.widget";
import {ref} from "vue";
import CountdownWidget from "@/widgets/countdown/CountdownWidget.vue";

const defaultData = new CountdownModel(CountdownWidgetDefine.name);
const {widgetData, widgetParams, sizeStyle} = useWidget(CountdownModel, {
  defaultData: defaultData
});
const fontSize = ref(54);
const widthPx = widgetParams.widthPx ?? 0;
const heightPx = widgetParams.heightPx ?? 0;
if (widthPx <= 220 || heightPx <= 220) {
  fontSize.value = 40
}
</script>

<style scoped>

</style>
