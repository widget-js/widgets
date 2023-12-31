<script lang="ts" setup>
import WidgetColorField, { WidgetEditDialog } from '@widget-js/vue3'
import { useRoute } from 'vue-router'
import {
  WidgetData,
  WidgetDataApi,
  WidgetParams,
} from '@widget-js/core'
import { ref } from 'vue'
import ClockWidget from '@/widgets/clock/ClockWidget.vue'

// 从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query)
// 组件默认数据
const defaultData = new WidgetData(widgetParams.name!, widgetParams.id!)
defaultData.backgroundColor = '#333'

const widgetData = ref(defaultData)

WidgetDataApi.find<WidgetData>(widgetParams.name!, widgetParams.id!, WidgetData).then((data) => {
  if (data) {
    widgetData.value = data
  }
})

async function onSaveClick() {
  await WidgetDataApi.save(widgetData.value)
  window.close()
}
</script>

<template>
  <WidgetEditDialog :title="widgetParams.title" @confirm="onSaveClick()">
    <template #widget>
      <ClockWidget
        :style="{
          width: `${widgetParams.widthPx}px`,
          height: `${widgetParams.heightPx}px`,
        }" :background-color="widgetData.backgroundColor"
      />
    </template>
    <template #custom>
      <el-form>
        <WidgetColorField v-model:color="widgetData.backgroundColor" title="背景颜色" />
      </el-form>
    </template>
  </WidgetEditDialog>
</template>

<style scoped lang="scss">

</style>
