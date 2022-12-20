<template>
  <birthday-list-widget :birthday-list-data="widgetData"
                        @add="add"
                        :style="{width:`${widgetParams.widthPx}px`,height:`${widgetParams.heightPx}px`}"></birthday-list-widget>
</template>

<script lang="ts" setup>
import {Solar} from 'lunar-typescript';
import BirthdayListWidget from "./BirthdayListWidget.vue";
import BirthdayListData from "@/widgets/birthday-list/model/BirthdayListData";
import {useWidget} from "@widget-js/vue3";
import {BrowserWindowApi, WidgetApi} from "../../../../core";

//默认数据
const previewData = new BirthdayListData("");
previewData.backgroundColor = "#FB604B";
previewData.peopleList = [
  {name: '张三', month: 10, day: 2, type: 'N', qty: 0, createdAt: 1},
  {
    name: '李四',
    month: Solar.fromDate(new Date()).getLunar().getMonth(),
    day: Solar.fromDate(new Date()).getLunar().getDay(),
    type: 'Y',
    qty: 0,
    createdAt: 2
  }
];

const {widgetData, widgetParams} = useWidget(BirthdayListData, {
  loadDataByWidgetName: true, previewData: previewData
})

const add = async () => {
  const url = await WidgetApi.getWidgetConfigUrl(widgetData.value.name, widgetParams);
  if (url) {
    await BrowserWindowApi.openUrl(url);
  }
}
</script>

<style scoped>

</style>
