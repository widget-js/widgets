<script lang="ts">
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { Lunar } from 'lunar-typescript'
import {
  BrowserWindowApi,
  DefaultWidgetTheme,
  WidgetDataApi,
  WidgetParams,
} from '@widget-js/core'
import { CountdownModel } from '@/widgets/countdown/model/CountdownModel'
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import { DateType } from '@/countdown/Event'
import CountdownWidgetDefine from '@/widgets/countdown/Countdown.widget'

export default {
  name: 'CountdownConfigView',
  components: {
    DatePickerDialog,
    WidgetEditDialog,
  },
  setup() {
    BrowserWindowApi.center()
    const showDatePicker = ref(false)
    const date = ref(CountdownModel.DEFAULT_DATE)
    const isLunar = ref(false)
    const widgetParams = WidgetParams.fromCurrentLocation()
    const defaultData = new CountdownModel(CountdownWidgetDefine.name)
    const {
      widgetData,
    } = useWidget(CountdownModel, {
      defaultData,
      defaultTheme: DefaultWidgetTheme.copy({
        backgroundColor: '#FFC455',
      }),
      onDataLoaded: (data) => {
        if (data) {
          date.value = dayjs(data.date).toDate()
          isLunar.value = data.dateType == DateType.LUNAR
        }
      },
    })

    const fontSize = ref(54)
    const widthPx = widgetParams.widthPx ?? 0
    const heightPx = widgetParams.heightPx ?? 0
    if (widthPx <= 220 || heightPx <= 220) {
      fontSize.value = 40
    }

    // 修改成需要设置组件参数配置
    const widgetConfigOption = new WidgetConfigOption({
      custom: true,
      theme: {
        backgroundColor: true,
        borderRadius: true,
      },
    })

    return {
      widgetData,
      widgetParams,
      isLunar,
      widgetConfigOption,
      showDatePicker,
      date,
      fontSize,
    }
  },
  computed: {
    dateStr() {
      if (this.isLunar) {
        const lunar = Lunar.fromDate(this.date)
        return `${lunar.toString()} ${dayjs(this.date).format('YYYY/MM/DD')}`
      }
      return dayjs(this.date).format('YYYY/MM/DD')
    },
  },
  methods: {
    async onApplyClick() {
      this.widgetData.date = this.date
      this.widgetData.dateType = this.isLunar ? DateType.LUNAR : DateType.SOLAR
      await WidgetDataApi.save(this.widgetData)
    },
    onDateConfirm(date: Date, isLunar: boolean) {
      this.date = date
      this.isLunar = isLunar
    },
    async onSaveClick() {
      await this.onApplyClick()
      window.close()
    },
  },
}
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="onApplyClick"
    @confirm="onSaveClick()"
  >
    <template #custom>
      <el-form-item label="事项名称">
        <el-input v-model="widgetData.title" />
      </el-form-item>
      <el-form-item label="事项日期">
        <DatePickerDialog v-model="showDatePicker" :date="date" :is-lunar="isLunar" @confirm="onDateConfirm" />
        <el-button @click="showDatePicker = !showDatePicker">
          {{ dateStr }}
        </el-button>
      </el-form-item>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
