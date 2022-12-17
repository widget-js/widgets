<template>
  <div class="root">
    <lyric-book-widget :widget-data="widgetData" :widget-id="widgetParams.id"></lyric-book-widget>
  </div>
</template>

<script lang="ts">
import {WidgetData, WidgetParams} from "@widget-js/core";
import LyricBookWidget from "./LyricBookWidget.vue"
import {useWidget} from "@widget-js/vue3";

export default {
  name: "LyricBookWidgetVie w",
  components: {LyricBookWidget},
  setup() {
    const params = new WidgetParams();
    const {widgetData, widgetParams} = useWidget(WidgetData, {
      debugParams: params
    });
    return {widgetData, widgetParams};
  }
}
</script>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
