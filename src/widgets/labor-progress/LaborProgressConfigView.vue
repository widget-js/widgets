<script lang="ts">
import { ref } from 'vue'
import {
  WidgetConfigOption,
  WidgetEditDialog,
  WidgetTimeRangeField,
  useWidget,
} from '@widget-js/vue3'
import { BrowserWindowApi } from '@widget-js/core'
import LaborProgressData from '@/widgets/labor-progress/model/LaborProgressData'

export default {
  name: 'LaborProgressConfigView',
  components: {
    WidgetTimeRangeField,
    WidgetEditDialog,
  },
  setup() {
    BrowserWindowApi.setSize(600, 500)
    BrowserWindowApi.center()
    const widgetConfigOption = new WidgetConfigOption({
      theme: {
        backgroundColor: true,
        borderRadius: true,
      },
    })

    const startTime = ref<Date>()
    const endTime = ref<Date>()

    const {
      widgetData,
      widgetParams,
      save,
    } = useWidget(LaborProgressData, {
      onDataLoaded: (data) => {
        if (data) {
          startTime.value = data.getStartTime()
          endTime.value = data.getEndTime()
        }
      },
    })

    return {
      widgetData,
      widgetParams,
      startTime,
      endTime,
      widgetConfigOption,
      save,
    }
  },
  watch: {
    startTime(newValue) {
      this.widgetData.setStartTime(newValue)
    },
    endTime(newValue) {
      this.widgetData.setEndTime(newValue)
    },
  },
}
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="save()"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <el-form>
        <WidgetTimeRangeField
          v-model:start-time="startTime"

          v-model:end-time="endTime"
          title="工作时间"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
