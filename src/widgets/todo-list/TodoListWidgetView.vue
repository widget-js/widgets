<template>
  <widget-wrapper>
    <todo-list-widget v-bind="widgetData"></todo-list-widget>
  </widget-wrapper>

</template>

<script lang="ts" setup>
import {WidgetData} from "@widget-js/core";
import TodoListWidget from "./TodoListWidget.vue"
import {useWidget, WidgetWrapper} from "@widget-js/vue3";

const {widgetData, widgetParams} = useWidget(WidgetData, {loadDataByWidgetName: true});
</script>

<style scoped>

</style>
