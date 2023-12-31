<script lang="ts">
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import {
  WidgetData,
  WidgetDataApi,
} from '@widget-js/core'
import { reactive } from 'vue'

export default {
  name: '',
  components: { WidgetEditDialog },
  setup() {
    const {
      widgetData,
      widgetParams,
    } = useWidget(WidgetData)

    // 修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: true,
      backgroundColor: true,
      borderRadius: true,
      preview: false,
    }))

    return {
      widgetData,
      widgetParams,
      widgetConfigOption,
    }
  },
  methods: {
    async onSaveClick() {
      await WidgetDataApi.save(this.widgetData)
      window.close()
    },
  },
}
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData" :widget-params="widgetParams"
    :option="widgetConfigOption"
    @confirm="onSaveClick()"
  >
    <template #custom>
      <!--  TODO 这里写自定义表单内容          -->
    </template>
  </WidgetEditDialog>
</template>

<style scoped>

</style>
