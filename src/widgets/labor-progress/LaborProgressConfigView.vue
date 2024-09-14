<script lang="ts">
import { ref } from 'vue'
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidgetData,
} from '@widget-js/vue3'
import { BrowserWindowApi } from '@widget-js/core'
import LaborProgressData from '@/widgets/labor-progress/model/LaborProgressData'

export default {
  name: 'LaborProgressConfigView',
  components: {
    WidgetEditDialog,
  },
  setup() {
    BrowserWindowApi.setSize(600, 500)
    BrowserWindowApi.center()
    const widgetConfigOption = new WidgetConfigOption({
      showFooter: true,
      theme: {
        backgroundColor: true,
        borderRadius: true,
      },
    })

    const startTime = ref<Date>(new Date())
    const endTime = ref<Date>(new Date())

    const {
      widgetData,
      widgetParams,
      save,
    } = useWidgetData(LaborProgressData, {
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
        <el-form-item label="上班时间">
          <ElTimePicker v-model="startTime" format="HH:mm" :clearable="false" title="上班时间" />
        </el-form-item>
        <el-form-item label="上班时间">
          <ElTimePicker v-model="endTime" format="HH:mm" :clearable="false" title="下班时间" />
        </el-form-item>
      </el-form>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
