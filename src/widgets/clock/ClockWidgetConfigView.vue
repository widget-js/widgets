<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    :widget-data="widgetData"
    @confirm="onSaveClick()">
    <template v-slot:widget>
      <clock-widget
        :width="widgetParams.widthPx"
        :height="widgetParams.heightPx"
        :background-color="widgetData.backgroundColor"></clock-widget>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">
import { useWidget, WidgetConfigOption } from '@widget-js/vue3'
import { WidgetData, WidgetDataApi } from '@widget-js/core'
import { reactive } from 'vue'
import ClockWidget from '@/widgets/clock/ClockWidget.vue'

export default {
  name: '',
  components: { ClockWidget },
  setup() {
    const { widgetData, widgetParams } = useWidget(WidgetData)

    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(
      new WidgetConfigOption({
        custom: false,
        backgroundColor: true,
        borderRadius: true
      })
    )

    return { widgetData, widgetParams, widgetConfigOption }
  },
  methods: {
    async onSaveClick() {
      await WidgetDataApi.save(this.widgetData)
      window.close()
    }
  },
  mounted() {
    console.log(window.location)
  }
}
</script>

<style scoped lang="scss"></style>
