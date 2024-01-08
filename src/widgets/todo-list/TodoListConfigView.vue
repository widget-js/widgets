<script lang="ts">
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import {
  BrowserWindowApi,
  WidgetData,
  WidgetDataApi,
} from '@widget-js/core'

export default {
  name: '',
  components: { WidgetEditDialog },
  setup() {
    BrowserWindowApi.setup({
      width: 600,
      height: 500,
      center: true,
    })
    const {
      widgetData,
      widgetParams,
    } = useWidget(WidgetData, { loadDataByWidgetName: true })

    // 修改成需要设置组件参数配置
    const widgetConfigOption = new WidgetConfigOption({
      custom: false,
      theme: {
        backgroundColor: true,
        borderRadius: true,
        color: true,
        dividerColor: true,
      },
    })

    return {
      widgetData,
      widgetParams,
      widgetConfigOption,
    }
  },
  methods: {
    async onSaveClick() {
      await WidgetDataApi.saveByName(this.widgetData)
      window.close()
    },
    async onApplyClick() {
      await WidgetDataApi.saveByName(this.widgetData)
    },
  },
}
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="onApplyClick()"
    @confirm="onSaveClick()"
  />
</template>

<style scoped></style>
