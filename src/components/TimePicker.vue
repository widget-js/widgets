<template>
  <div class="picker-group">
    <VueScrollPicker :options="hours" v-model="selectedHour"/>
    <VueScrollPicker :options="minutes" v-model="selectedMinute"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {VueScrollPicker} from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'

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

const selectedHour = computed({
  get:()=>{
    return props.date.getHours();
  },
  set:(value)=>{
    const date = new Date();
    date.setMinutes(selectedMinute.value);
    date.setHours(value);
    emits("update:date", date)
  }
});

const selectedMinute = computed({
  get:()=>{
    return props.date.getMinutes();
  },
  set:(value)=>{
    const date = new Date();
    date.setMinutes(value);
    date.setHours(selectedHour.value);
    emits("update:date", date)
  }
});

const hours = computed(() => {
  return Array.from({length: 24}, (_, index) => index)
});

const minutes = computed(() => {
  return Array.from({length: 60}, (_, index) => index)
})

const emits = defineEmits(["update:date"])

function emitDateUpdate() {
  const date = new Date();
  date.setMinutes(selectedMinute.value);
  date.setHours(selectedHour.value);
  emits("update:date", date)
}

watch(selectedHour, () => {
  emitDateUpdate();
})

watch(selectedMinute, () => {
  emitDateUpdate();
})

</script>

<style scoped lang="scss">
.picker-group {
  width: 100%;
  display: flex;

  .vue-scroll-picker {
    width: 50%;
  }
}
</style>
