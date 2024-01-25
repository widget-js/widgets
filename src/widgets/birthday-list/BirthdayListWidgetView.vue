<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import {
  WidgetApi,
} from '@widget-js/core'
import BirthdayListWidget from './BirthdayListWidget.vue'
import BirthdayListData from '@/widgets/birthday-list/model/BirthdayListData'

const {
  widgetData,
  widgetParams,
} = useWidget(BirthdayListData, { loadDataByWidgetName: true })

async function add() {
  await WidgetApi.openConfigPage(widgetParams.id!)
}
</script>

<template>
  <WidgetWrapper shadow-color="#fb604b">
    <BirthdayListWidget :birthday-list-data="widgetData" @add="add" />
  </WidgetWrapper>
</template>

<style scoped></style>
