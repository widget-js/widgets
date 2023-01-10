<template>
  <todo-list-widget v-bind="widgetData"
                    :style="{...sizeStyle}"></todo-list-widget>
</template>

<script lang="ts">
import {WidgetData} from "@widget-js/core";
import TodoListWidget from "./TodoListWidget.vue"
import {useWidget} from "@widget-js/vue3";

export default {
  name: "TodoListWidgetView",
  components: {TodoListWidget},
  setup() {
    const {widgetData, widgetParams, sizeStyle} = useWidget(WidgetData);
    return {widgetData, widgetParams, sizeStyle};
  }
}
</script>

<style scoped>

</style>
