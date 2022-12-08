<template>
  <birthday-list-widget :birthday-list-data="widgetData" :style="{width:`${widgetParams.widthPx}px`,height:`${widgetParams.heightPx}px`}"></birthday-list-widget>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {Solar} from 'lunar-typescript';
import {WidgetDataRepository, WidgetParams} from "@widget-js/core";
import BirthdayListWidget from "./BirthdayListWidget.vue";
import BirthdayListData from "@/widgets/birthday-list/model/BirthdayListData";

//从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query);
//默认数据
const defaultData = new BirthdayListData(widgetParams.name!, widgetParams.id!);
if(widgetParams.preview){
  defaultData.backgroundColor = "#FB604B";
  defaultData.peopleList = [
    {name:'张三', month: 10, day: 2, type: 'N', qty: 0},
    {name:'李四', month: Solar.fromDate(new Date()).getLunar().getMonth(), day: Solar.fromDate(new Date()).getLunar().getDay(), type: 'Y', qty: 0}
  ];
}

const widgetData = ref(defaultData);
if(!widgetParams.preview){
  //加载已保存的数据
  WidgetDataRepository.findByName<BirthdayListData>(widgetParams.name!, BirthdayListData).then((data) => {
    if (data) {
      //有数据库则覆盖掉默认数据
      widgetData.value = data;
    }
  })
}
</script>

<style scoped>

</style>
