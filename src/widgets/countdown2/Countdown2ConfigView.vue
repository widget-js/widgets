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
  WidgetDataApi,
} from '@widget-js/core'
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import { DateType } from '@/countdown/Event'
import { CountdownModel } from '@/widgets/countdown/model/CountdownModel'
import Countdown2WidgetDefine from '@/widgets/countdown2/Countdown2.widget'

export default {
  name: '',
  components: {
    DatePickerDialog,
    WidgetEditDialog,
  },
  setup() {
    BrowserWindowApi.setSize(600, 500)
    BrowserWindowApi.center()
    const showDatePicker = ref(false)
    const date = ref(new Date())
    const isLunar = ref(false)
    const defaultData = new CountdownModel(Countdown2WidgetDefine.name)
    const {
      widgetData,
      widgetParams,
    } = useWidget(CountdownModel, {
      defaultData,
      onDataLoaded: (data) => {
        if (data) {
          date.value = dayjs(data.date).toDate()
          isLunar.value = data.dateType == DateType.LUNAR
        }
      },
    })

    // 修改成需要设置组件参数配置
    const widgetConfigOption = new WidgetConfigOption({
      custom: true,
      theme: {
        primaryColor: true,
        backgroundColor: true,
        borderRadius: true,
        fontSize: [14, 100],
      },
    })

    return {
      widgetData,
      widgetParams,
      isLunar,
      widgetConfigOption,
      showDatePicker,
      date,
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
    @confirm="onSaveClick"
  >
    <template #custom>
      <el-form-item label="事项名称">
        <el-input v-model="widgetData.title" />
      </el-form-item>
      <el-form-item label="事项日期">
        <DatePickerDialog
          v-model="showDatePicker"
          :date="date"
          :lunar="isLunar"
          @confirm="onDateConfirm"
        />
        <el-button @click="showDatePicker = !showDatePicker">
          {{ dateStr }}
        </el-button>
      </el-form-item>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
