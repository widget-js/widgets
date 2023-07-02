<template>

  <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                      :widget-data="widgetData"
                      @apply="onApplyClick"
                      @confirm="onSaveClick">
    <template v-slot:form>
      <el-form-item label="事项名称">
        <el-input v-model="widgetData.title"></el-input>
      </el-form-item>
      <el-form-item label="事项日期">
        <date-picker-dialog v-model:visible="showDatePicker" v-model:date="date"
                            v-model:is-lunar="isLunar"></date-picker-dialog>
        <el-button @click="showDatePicker = !showDatePicker">{{ dateStr }}</el-button>
      </el-form-item>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">

import Countdown2Widget from "./Countdown2Widget.vue";
import {useWidget, WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {reactive, ref} from "vue";
import {CountdownModel} from "@/widgets/countdown/model/CountdownModel";
import dayjs from "dayjs";
import {DateType} from "@/countdown/Event";
import {Lunar} from "lunar-typescript";
import DatePickerDialog from "@/components/DatePickerDialog.vue";
import {WidgetDataApi} from "@widget-js/core";

export default {
  name: "",
  components: {DatePickerDialog, Countdown2Widget, WidgetEditDialog},
  setup() {
    const showDatePicker = ref(false)
    const date = ref(new Date())
    const isLunar = ref(false)
    const {widgetData, widgetParams} = useWidget(CountdownModel, {
      onDataLoaded: (data) => {
        if (data) {
          date.value = dayjs(data.date).toDate();
          isLunar.value = data.dateType == DateType.LUNAR;
        }
      }
    })


    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: true,
      backgroundColor: true,
      borderRadius: true,
      preview: false,
      fontSize: false
    }));

    return {widgetData, widgetParams, isLunar, widgetConfigOption, showDatePicker, date}
  },
  computed: {
    dateStr() {
      if (this.isLunar) {
        const lunar = Lunar.fromDate(this.date);
        return lunar.toString() + " " + dayjs(this.date).format("YYYY/MM/DD");
      }
      return dayjs(this.date).format("YYYY/MM/DD");
    },
  },
  methods: {
    async onApplyClick() {
      this.widgetData.date = this.date;
      this.widgetData.dateType = this.isLunar ? DateType.LUNAR : DateType.SOLAR;
      await WidgetDataApi.save(this.widgetData);
    },
    async onSaveClick() {
      await this.onApplyClick();
      window.close();
    }
  }
}
</script>

<style scoped>

</style>
