<template>
  <widget-edit-dialog :option="widgetConfigOption" :widget-data="widgetData" :title="widgetParams.title"
                      @confirm="onSaveClick()">
    <template v-slot:widget>
      <!-- 组件配置内容   -->
      <wave-progress-widget :style="{
          width: `${widgetParams.widthPx}px`,
          height: `${widgetParams.heightPx}px`,
        }" :extra="widgetData" ref="widgetRef"></wave-progress-widget>
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

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {WidgetConfigOption, WidgetEditDialog} from '@widget-js/vue3'
import {useRoute} from 'vue-router'
import {WidgetDataRepository, WidgetData, WidgetParams} from '@widget-js/core'
import WaveProgressWidget from './WaveProgressWidget.vue'
import {WaveProgressExtraConfig, ProgressType} from './WaveProgressExtraConfig'
//从url地址获取组件参数
const route = useRoute()
const widgetParams = WidgetParams.fromObject(route.query);
const widgetRef = ref();
//组件默认数据
const defaultData = new WaveProgressExtraConfig(widgetParams.name!, widgetParams.id!);

const widgetData = ref(defaultData)
const widgetConfigOption = new WidgetConfigOption({backgroundColor: true, custom: true, borderRadius: true});
WidgetDataRepository.find<WaveProgressExtraConfig>(widgetParams.name!, widgetParams.id!, WaveProgressExtraConfig).then((data) => {
  if (data) {
    //有已保存过的数据，覆盖
    widgetData.value = data
    console.log(data)
  }
})

/**
 * 点击保存按钮
 */
async function onSaveClick() {
  await WidgetDataRepository.save(widgetData.value)
  window.close()
}

function refresh() {
  widgetRef.value.refresh();
}

function handleChangeCustomDate() {
  const now = new Date();
  if ((widgetData.value.startDate ?? now) > (widgetData.value.endDate ?? now)) {
    const start: Date = widgetData.value.startDate ?? now;
    widgetData.value.startDate = widgetData.value.endDate;
    widgetData.value.endDate = start;
  }
  refresh();
  console.info("Date Picked",widgetData.value.startDate)

}

</script>

<style scoped></style>
