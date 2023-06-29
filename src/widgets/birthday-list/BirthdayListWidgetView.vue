<template>
  <widget-wrapper shadowColor="#fb604b">
    <birthday-list-widget @add="add" :birthday-list-data="widgetData"></birthday-list-widget>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import BirthdayListWidget from "./BirthdayListWidget.vue";
import BirthdayListData from "@/widgets/birthday-list/model/BirthdayListData";
import {useWidget, WidgetWrapper} from "@widget-js/vue3";
import {BrowserWindowApi, HostedWidgetApi, WidgetApi} from "@widget-js/core";


const {widgetData, widgetParams} = useWidget(BirthdayListData, {
  loadDataByWidgetName: true
})

const add = async () => {
  const url = await WidgetApi.getWidgetConfigUrl(widgetData.value.name, widgetParams);
  if (url) {
    // HostedWidgetApi.openConfigRoute()
    await BrowserWindowApi.openUrl(url);
  }
}
</script>

<style scoped>

</style>
