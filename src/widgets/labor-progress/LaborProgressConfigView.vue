<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :widget-data="widgetData"
    :option="widgetConfigOption"
    @confirm="onSaveClick()">
    <template v-slot:form>
      <el-form>
        <widget-time-range-field
          title="工作时间"
          start-placeholder="开始时间"
          v-model:start-time="startTime"
          v-model:end-time="endTime"
          end-placeholder="结束时间" />
      </el-form>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">
import { ref } from 'vue'
import { WidgetConfigOption, WidgetEditDialog } from '@widget-js/vue3'
import LaborProgressWidget from './LaborProgressWidget.vue'
import LaborProgressData from '@/widgets/labor-progress/model/LaborProgressData'
import { useWidget, WidgetCheckboxField } from '@widget-js/vue3'
import { WidgetTimeRangeField } from '@widget-js/vue3'
import { WidgetDataApi } from '@widget-js/core'

export default {
  name: 'LaborProgressConfigView',
  components: { WidgetTimeRangeField, WidgetCheckboxField, LaborProgressWidget, WidgetEditDialog },
  setup() {
    const widgetConfigOption = new WidgetConfigOption({ backgroundColor: true, borderRadius: true, preview: false })

    const { widgetData, widgetParams, sizeStyle } = useWidget(LaborProgressData, {
      onDataLoaded: <LaborProgressData>(data) => {
        startTime.value = data.getStartTime()
        endTime.value = data.getEndTime()
      }
    })

    const startTime = ref(widgetData.value.getStartTime())
    const endTime = ref(widgetData.value.getEndTime())

    return { widgetData, widgetParams, startTime, endTime, widgetConfigOption, sizeStyle }
  },
  methods: {
    /**
     * 点击保存按钮
     */
    async onSaveClick() {
      await WidgetDataApi.save(this.widgetData)
      window.close()
    }
  },
  watch: {
    startTime(newValue) {
      this.widgetData.setStartTime(newValue)
    },
    endTime(newValue) {
      this.widgetData.setEndTime(newValue)
    }
  }
}
</script>

<style scoped></style>
