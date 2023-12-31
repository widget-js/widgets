<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'
import dayjs from 'dayjs'

const props = defineProps({
  height: {
    type: Number,
    default: 150,
  },
  modelValue: {
    type: Date,
    required: true,
  },
})

const emits = defineEmits(['update:modelValue'])

const startYear = 1901
const selectedYear = ref(props.modelValue.getFullYear())
const selectedMonth = ref(props.modelValue.getMonth())
const selectedDate = ref(props.modelValue.getDate())

const solarYears = computed(() => {
  return Array.from({ length: 200 }, (_, index) => index + startYear)
})

const solarMonths = computed(() => {
  return Array.from({ length: 12 }, (_, index) => index + 1)
})

const solarDates = computed(() => {
  const lastDay = new Date(selectedYear.value, selectedMonth.value, 0).getDate()
  return Array.from({ length: lastDay }, (_, index) => index + 1)
})

function emitDateUpdate() {
  emits('update:modelValue', dayjs({
    year: selectedYear.value,
    month: selectedMonth.value - 1,
    date: selectedDate.value,
  }).toDate())
}

watch(selectedYear, () => {
  emitDateUpdate()
})

watch(selectedMonth, () => {
  emitDateUpdate()
})

watch(selectedDate, () => {
  emitDateUpdate()
})

onMounted(async () => {
  await nextTick()
})
</script>

<template>
  <div class="picker-group">
    <VueScrollPicker v-model="selectedYear" :options="solarYears" />
    <VueScrollPicker v-model="selectedMonth" :options="solarMonths" />
    <VueScrollPicker v-model="selectedDate" :options="solarDates" />
  </div>
</template>

<style scoped lang="scss">
.picker-group {
  width: 100%;
  display: flex;

  .vue-scroll-picker {
    width: 33%;
  }
}
</style>
