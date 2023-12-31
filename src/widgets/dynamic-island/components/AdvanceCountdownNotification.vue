<script lang="ts" setup>
import { ref } from 'vue'

import dayjs from 'dayjs'
import '@/common/dayjs-extend'
import { NotificationApi } from '@widget-js/core'

const props = defineProps({
  title: { type: String },
  message: { type: String },
  targetTime: {
    type: String,
    required: true,
  },
})

function onNotificationClick() {
  NotificationApi.countdown('下班倒计时', props.targetTime)
}

const targetTime = dayjs(props.targetTime)
const now = dayjs()
const duration = dayjs.duration(targetTime.diff(now))
const minutes = ref(Math.round(duration.asMinutes()))
</script>

<template>
  <div class="countdown" @click="onNotificationClick">
    <div class="content">
      <div class="title">
        {{ title }}
      </div>
      <span class="message">{{ message }}</span>
    </div>
    <span class="time">{{ minutes }} min</span>
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
    right: 0;
    z-index: -1;
    background-image: linear-gradient(-90deg, #f6d365 0%, #fda085 100%);
  }

  .content {
    flex: 1;
    display: flex;
    align-items: flex-start;
    height: 100%;
    justify-content: space-around;
    flex-direction: column;

    .title {
      font-size: 1rem;
      color: white;
    }

    .message {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .timing {
    font-size: 1rem;
  }

  .time {
    color: #05e205;
    font-size: 1rem;
  }

  .icon {
    background-color: #ff4e4e;
    border-radius: 50%;
    padding: 2px;

    &:before {
      font-size: 1.2rem;
      color: white;
    }
  }

}
</style>
