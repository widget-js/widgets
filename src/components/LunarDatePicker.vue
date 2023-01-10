<template>
  <div class="picker-group">
    <VueScrollPicker :options="years" v-model="selectedYear"/>
    <VueScrollPicker :options="lunarMonths" v-model="selectedMonth"/>
    <VueScrollPicker :options="lunarDates" v-model="selectedDate"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {Lunar, LunarMonth, LunarUtil, LunarYear, Solar} from "lunar-typescript";
import {VueScrollPicker} from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'

const props = defineProps({
  date: {
    type: Date,
    required: true
  },
});

const lunar = Lunar.fromDate(props.date);
console.log(lunar);
const startYear = 1901;
const selectedYear = ref(lunar.getYear());
const selectedMonth = ref(lunar.getMonth())
const selectedDate = ref(lunar.getDay())

const lunarMonths = computed(() => {
  const year = parseInt(selectedYear.value.toString());
  const lunarYear = new LunarYear(year);
  return lunarYear.getMonths().filter(it => it.getYear() == year).map((it) => {
    const lunarMonth = it.toString();
    console.log(lunarMonth.toString());
    return {
      name: lunarMonth.substring(lunarMonth.indexOf("年") + 1, lunarMonth.indexOf("(")),
      value: it.getMonth()
    }
  });
});

const lunarDates = computed(() => {
  if (!selectedMonth.value) return [{name: '初一', value: 1}];
  const lunarMonth = LunarMonth.fromYm(selectedYear.value, selectedMonth.value!);
  const dayCount = lunarMonth!.getDayCount();
  const arr: any[] = [];
  for (let i = 1; i <= dayCount; i++) {
    arr.push({
      name: getLunarDate(i),
      value: i,
    });
  }
  return arr;
});

const getLunarDate = (i: number) => {
  const chineseNumber = ["一", "二", "三", "四", "五", "六", "七", "八", "九", '十']
  if (i < 11) {
    return "初" + chineseNumber[i - 1];
  } else if (i < 20) {
    return "十" + chineseNumber[i % 10 - 1];
  } else if (i == 20) {
    return "二十"
  } else if (i < 30) {
    return "廿" + chineseNumber[i % 10 - 1];
  } else {
    return "三十"
  }
}

const years = [...Array(200).keys()].map((i) => {
  return i + startYear
})

const emits = defineEmits(["update:date"])

function emitDateUpdate() {
  const selectedLunar = Lunar.fromYmd(selectedYear.value, selectedMonth.value, selectedDate.value);
  const solar = selectedLunar.getSolar();
  const date = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
  emits("update:date", date)
}

watch(selectedYear, () => {
  emitDateUpdate()
});

watch(selectedMonth, () => {
  emitDateUpdate()
});

watch(selectedDate, () => {
  emitDateUpdate();
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
