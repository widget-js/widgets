<script lang="ts">
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'

export default {
  name: '',
  components: { WidgetEditDialog },
  setup() {
    const {
      widgetData,
      widgetParams,
      save,
    } = useWidget(WidgetData)

    // 修改成需要设置组件参数配置
    const widgetConfigOption = new WidgetConfigOption({
      custom: true,
      theme: {
        backgroundColor: true,
        borderRadius: true,
      },
    })

    return {
      widgetData,
      widgetParams,
      widgetConfigOption,
      save,
    }
  },
}
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @confirm="save({ closeWindow: true })"
  />
</template>

<style scoped></style>
