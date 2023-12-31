<script lang="ts" setup>
import {
  computed,
  watch,
} from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'

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

const selectedHour = computed({
  get: () => {
    return props.modelValue.getHours()
  },
  set: (value) => {
    const date = new Date()
    // eslint-disable-next-line ts/no-use-before-define
    date.setMinutes(selectedMinute.value)
    date.setHours(value)
    emits('update:modelValue', date)
  },
})

const selectedMinute = computed({
  get: () => {
    return props.modelValue.getMinutes()
  },
  set: (value) => {
    const date = new Date()
    date.setMinutes(value)
    date.setHours(selectedHour.value)
    emits('update:modelValue', date)
  },
})

const hours = computed(() => {
  return Array.from({ length: 24 }, (_, index) => index)
})

const minutes = computed(() => {
  return Array.from({ length: 60 }, (_, index) => index)
})

function emitDateUpdate() {
  const date = new Date()
  date.setMinutes(selectedMinute.value)
  date.setHours(selectedHour.value)
  emits('update:modelValue', date)
}

watch(selectedHour, () => {
  emitDateUpdate()
})

watch(selectedMinute, () => {
  emitDateUpdate()
})
</script>

<template>
  <div class="picker-group">
    <VueScrollPicker v-model="selectedHour" :options="hours" />
    <VueScrollPicker v-model="selectedMinute" :options="minutes" />
  </div>
</template>

<style scoped lang="scss">
.picker-group {
  width: 100%;
  display: flex;

  .vue-scroll-picker {
    width: 50%;
  }
}
</style>
