<script lang="ts">
import { WidgetData } from '@widget-js/core'
import { useWidget } from '@widget-js/vue3'
import QuickSearchWidget from './QuickSearchWidget.vue'

export default {
  name: 'QuickSearchWidgetView',
  components: { QuickSearchWidget },
  setup() {
    const {
      widgetData,
      widgetParams,
    } = useWidget(WidgetData)
    return {
      widgetData,
      widgetParams,
    }
  },
}
</script>

<template>
  <!-- TODO:组件页面，这里编写组件业务逻辑 -->
  <QuickSearchWidget :background-color="widgetData.backgroundColor" />
</template>

<style scoped>

</style>
