<script lang="ts" setup>
import {
  computed,
  ref,
  watch,
} from 'vue'
import { useIntervalFn } from '@vueuse/core'

import dayjs from 'dayjs'
import '@/common/dayjs-extend'
import { NotificationApi } from '@widget-js/core'

const props = defineProps({
  message: { type: String },
  targetTime: {
    type: String,
    required: true,
  },
})

function onNotificationClick() {

}

const timeStr1 = ref('00:00')
const timeStr2 = ref('00')
let count = 0
useIntervalFn(() => {
  count++
  if (count > 99) {
    count = 0
  }

  timeStr2.value = count < 10 ? `0${count}` : `${count}`
}, 10)

const targetTime = computed(() => dayjs(props.targetTime))
let startAt = dayjs()
let remindSeconds = 0
watch(targetTime, () => {
  startAt = dayjs()
  remindSeconds = 0
})
const totalSeconds = computed(() => dayjs.duration(targetTime.value.diff(startAt)).asSeconds())
const progress = ref(1)
useIntervalFn(() => {
  const duration = dayjs.duration(targetTime.value.diff(dayjs()))
  timeStr1.value = duration.format('mm:ss')
  remindSeconds = duration.asSeconds()
  progress.value = remindSeconds / totalSeconds.value * 100
  if (remindSeconds < 0) {
    NotificationApi.hide()
  }
}, 1000)

const timeString = computed(() => {
  return `${timeStr1.value}:${timeStr2.value}`
})
</script>

<template>
  <div class="countdown" @click="onNotificationClick">
    <div class="content">
      <div class="title">
        {{ message }}
      </div>
    </div>
    <span class="timing">{{ timeString }}</span>
    <div class="progress">
      <div class="progress-bar" :style="{ width: `${progress}%` }" />
    </div>
  </div>
</template>

<style scoped lang="scss">
$easing: cubic-bezier(1, 0, 1, 0);
.countdown {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 1rem 0.8rem;

  .progress {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    border-radius: 24px;

    .progress-bar {
      position: absolute;
      height: 100%;
      right: 0;
      transition-duration: 0.5s;
      border-radius: 24px;
      transition-property: width;
      background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
    }
  }

  .content {
    flex: 1;
    display: flex;
    align-items: flex-start;
    height: 100%;
    justify-content: space-around;
    flex-direction: column;
    z-index: 2;

    .title {
      font-size: 1rem;
      color: white;
    }

  }

  .timing {
    z-index: 2;
    font-size: 1rem;
    color: white;
  }

}
</style>
