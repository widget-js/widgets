<template>
  <div class="root">
    <lyric-book-widget :widget-data="widgetData" :widget-id="widgetParams.id" :preview="widgetParams.preview"
                       :page-controller="pageController"/>
  </div>
</template>

<script lang="ts">
import LyricBookWidget from "./LyricBookWidget.vue"
import {useWidget} from "@widget-js/vue3";
import LyricBookData, {readFile} from "@/widgets/lyric-book/model/LyricBookData";
import PageController from "@/widgets/lyric-book/model/PageController";
import {nextTick, reactive} from "vue";

export default {
  name: "LyricBookWidgetView",
  components: {LyricBookWidget},
  async mounted() {
    await nextTick();
  },
  setup() {
    const pageController = reactive(new PageController());

    const {widgetData, widgetParams} = useWidget(LyricBookData, {
      loadDataByWidgetName: true, onDataLoaded: (data) => {
        if (data) {
          pageController.setCurrentPage(data.currentPage);
          pageController.updateBookText(readFile(data.file));
        }
      }
    });
    return {widgetData, widgetParams, pageController};
  },
}
</script>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
