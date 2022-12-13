<template>
  <birthday-list-widget :birthday-list-data="widgetData"
                        :style="{width:`${widgetParams.widthPx}px`,height:`${widgetParams.heightPx}px`}"></birthday-list-widget>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {Solar} from 'lunar-typescript';
import {WidgetDataRepository, WidgetParams} from "@widget-js/core";
import BirthdayListWidget from "./BirthdayListWidget.vue";
import BirthdayListData from "@/widgets/birthday-list/model/BirthdayListData";
import {useWidget} from "@widget-js/vue3";

//默认数据
const previewData = new BirthdayListData("");
previewData.backgroundColor = "#FB604B";
previewData.peopleList = [
  {name: '张三', month: 10, day: 2, type: 'N', qty: 0},
  {
    name: '李四',
    month: Solar.fromDate(new Date()).getLunar().getMonth(),
    day: Solar.fromDate(new Date()).getLunar().getDay(),
    type: 'Y',
    qty: 0
  }
];

const {widgetData, widgetParams} = useWidget(BirthdayListData, {loadDataByWidgetName:true,previewData:previewData})
</script>

<style scoped>

</style>
