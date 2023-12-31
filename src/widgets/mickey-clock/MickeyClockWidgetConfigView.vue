<script lang="ts">
import {
  WidgetConfigOption,
  useWidget,
} from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'

export default {
  name: '',
  setup() {
    const {
      widgetData,
      widgetParams,
      save,
    } = useWidget(WidgetData)

    // 修改成需要设置组件参数配置
    const widgetConfigOption = new WidgetConfigOption({
      custom: false,
      theme: {
        backgroundColor: true,
        borderRadius: true,
      },
    })
    return {
      widgetData,
      widgetParams,
      save,
      widgetConfigOption,
    }
  },
}
</script>

<template>
  <widget-edit-dialog
    v-model="widgetData" :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  />
</template>

<style scoped lang="scss">
</style>
