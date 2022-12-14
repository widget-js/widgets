<template>
  <widget-edit-dialog :option="widgetConfigOption" :widget-data="widgetData" :widget-params="widgetParams"
                      @confirm="onSaveClick()">
    <template v-slot:widget>
      <!-- 组件配置内容   -->
      <wave-progress-widget :style="{
          width: `${widgetParams.widthPx}px`,
          height: `${widgetParams.heightPx}px`,
        }" v-bind="widgetData" ref="widgetRef"/>
    </template>
    <template v-slot:form>
      <el-form :model="widgetData">
        <el-form-item label="进度类型">
          <el-radio-group v-model="widgetData.progressType" @change="refresh">
            <el-radio :label="ProgressType.today">今天</el-radio>
            <el-radio :label="ProgressType.toWeek">本周</el-radio>
            <el-radio :label="ProgressType.toMonth">本月</el-radio>
            <el-radio :label="ProgressType.toYear">今年</el-radio>
            <el-radio :label="ProgressType.custom">自定义</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="widgetData.progressType === ProgressType.custom">
          <el-form-item label="事项名称">
            <el-input v-model="widgetData.eventName" placeholder="请输入" @change="refresh"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="widgetData.startDate" type="datetime" placeholder="开始时间"
                            @change="handleChangeCustomDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="widgetData.endDate" type="datetime" placeholder="结束时间"
                            @change="handleChangeCustomDate"></el-date-picker>
          </el-form-item>
        </template>
      </el-form>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useWidget, WidgetConfigOption, WidgetEditDialog} from '@widget-js/vue3'
import {WidgetDataRepository} from '@widget-js/core'
import {ProgressType, WaveProgressData} from "@/widgets/wave-progress/model/WaveProgressData";
import WaveProgressWidget from "@/widgets/wave-progress/WaveProgressWidget.vue";

export default defineComponent({
      name: "WaveProgressConfigView",
      components: {WidgetEditDialog, WaveProgressWidget},
      computed: {
        ProgressType() {
          return ProgressType
        }
      },
      setup() {
        const {widgetData, widgetParams} = useWidget(WaveProgressData);
        const widgetConfigOption = new WidgetConfigOption({
          backgroundColor: true,
          custom: true,
          borderRadius: true
        });
        const widgetRef = ref();
        return {widgetData, widgetRef, widgetParams, widgetConfigOption}
      },
      methods: {
        refresh() {
          this.widgetRef.refresh();
        },
        handleChangeCustomDate() {
          const now = new Date();
          if ((this.widgetData.startDate ?? now) > (this.widgetData.endDate ?? now)) {
            const start: Date = this.widgetData.startDate ?? now;
            this.widgetData.startDate = this.widgetData.endDate;
            this.widgetData.endDate = start;
          }
          this.refresh();
        },
        async onSaveClick() {
          await WidgetDataRepository.save(this.widgetData)
          window.close()
        }
      }
    }
)
</script>

<style scoped>
.widget-scale {
  max-height: 250px;
  max-width: 250px;
}
</style>
