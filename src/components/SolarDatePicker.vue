<template>
  <div class="picker-group">
    <VueScrollPicker :options="solarYears" v-model="selectedYear"/>
    <VueScrollPicker :options="solarMonths" v-model="selectedMonth"/>
    <VueScrollPicker :options="solarDates" v-model="selectedDate"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {VueScrollPicker} from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'
import dayjs from "dayjs";

const props = defineProps({
  height: {
    type: Number,
    default: 150
  },
  date: {
    type: Date,
    required: true
  },
});

const startYear = 1901;
const selectedYear = ref(props.date.getFullYear());
const selectedMonth = ref(props.date.getMonth());
const selectedDate = ref(props.date.getDate());

const solarYears = computed(() => {
  return Array.from({length: 200}, (_, index) => index + startYear)
});

const solarMonths = computed(() => {
  return Array.from({length: 12}, (_, index) => index + 1)
})

const solarDates = computed(() => {
  const lastDay = new Date(selectedYear.value, selectedMonth.value, 0).getDate()
  return Array.from({length: lastDay}, (_, index) => index + 1)
})

const emits = defineEmits(["update:date"])

function emitDateUpdate() {
  emits("update:date", dayjs({
    year: selectedYear.value,
    month: selectedMonth.value - 1,
    date: selectedDate.value
  }).toDate())
}

watch(selectedYear, () => {
  emitDateUpdate();
})

watch(selectedMonth, () => {
  emitDateUpdate();
})

watch(selectedDate, () => {
  emitDateUpdate();
})

onMounted(async () => {
  await nextTick();
});
</script>

<style scoped lang="scss">
.picker-group {
  width: 100%;
  display: flex;

  .vue-scroll-picker {
    width: 33%;
  }
}
</style>
