<script lang="ts">
import {
  computed,
  ref,
} from 'vue'
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { NotificationApi } from '@widget-js/core'
import { floor } from 'lodash'
import faceWithTears from './images/face_holding_back_tears_3d.png'
import faceSpiralEyes from './images/face_with_spiral_eyes_3d.png'
import faceSteam from './images/face_with_steam_from_nose_3d.png'
import faceSunglasses from './images/smiling_face_with_sunglasses_3d.png'
import faceStarStruck from './images/star-struck_3d.png'
import faceSleeping from './images/sleeping_face_3d.png'
import faceRollingEyes from './images/face_with_rolling_eyes_3d.png'
import faceKnockedOut from './images/knocked-out_face_3d.png'
import faceYawning from './images/yawning_face_3d.png'
import faceSleepy from './images/sleepy_face_3d.png'
import facePartying from './images/partying_face_3d.png'
import EmojiTimeline from '@/widgets/labor-progress/model/EmojiTimeline'
import '@/common/dayjs-extend'

export default {
  name: 'LaborProgressWidget',
  props: {
    backgroundColor: {
      type: String,
      default: 'white',
    },
    borderRadius: {
      type: Number,
      default: 22,
    },
    startTime: { type: Date },
    endTime: { type: Date },
    enablePhoneReminder: {
      type: Boolean,
      boolean: false,
    },
  },
  setup: (props) => {
    const workStartTime = computed(() => {
      return dayjs(props.startTime)
    })

    const workEndTime = computed(() => {
      return dayjs(props.endTime)
    })

    const totalSeconds = computed(() => {
      return dayjs.duration(workEndTime.value.diff(workStartTime.value)).asSeconds()
    })
    // 获取一周的第几天，1代表周一，7代表周天
    const weekday = dayjs().isoWeekday()
    const weekdayEmojis = [
      faceSpiralEyes,
      faceSteam,
      faceKnockedOut,
      faceRollingEyes,
      faceWithTears,
      faceWithTears,
      faceWithTears,
    ]
    const percent = ref(0)
    const percentPosition = ref()
    const emojiTimeline = [
      new EmojiTimeline(weekdayEmojis[weekday - 1], 0, 33.2),
      new EmojiTimeline(faceYawning, 33.3, 44.4, 1, '困'),
      new EmojiTimeline(faceSleepy, 44.5, 49, 1, '困'),
      new EmojiTimeline(faceSleeping, 49.1, 55.6, 1, '困'),
      new EmojiTimeline(faceSunglasses, 55.7, 94.9, 1, '冲'),
      new EmojiTimeline(faceStarStruck, 95, 99.9, 0.2, '快'),
      new EmojiTimeline(facePartying, 100, 100, 3, '❤'),
    ]

    const time = ref(dayjs())
    const secondLeft = ref(50)
    const currentTimeline = ref(emojiTimeline[0])
    useIntervalFn(() => {
      time.value = dayjs()
      const duration = dayjs.duration(time.value.diff(workStartTime.value))
      const remindDuration = dayjs.duration(workEndTime.value.diff(time.value))
      const remindSeconds = Math.round(remindDuration.asSeconds())
      if (remindSeconds == 5 * 60) {
        NotificationApi.countdown('下班倒计时', workEndTime.value.format())
      }

      percent.value = floor((duration.asSeconds() / totalSeconds.value) * 100, 1)
      if (percent.value > 100) {
        percent.value = 100
      }
      else if (percent.value < 0) {
        percent.value = 0
      }

      percentPosition.value = percent.value > 70 ? { left: '4px' } : { right: '4px' }
      secondLeft.value = percent.value > 95 ? -15 : 50
      for (const timeline of emojiTimeline) {
        if (timeline.isActivated(percent.value)) {
          currentTimeline.value = timeline
          break
        }
      }
    }, 1000)
    return {
      time,
      currentTimeline,
      percent,
      workEndTime,
      secondLeft,
      percentPosition,
    }
  },
  methods: {
    async mouseEnter() {
      // await NotificationApi.countdown("下班倒计时", dayjs().add(5, 'second').toISOString())
      // SitReminderDemo.duration = -1;
      // await NotificationApi.send(SitReminderDemo);
    },
  },
}
</script>

<template>
  <div
    class="container"
    :style="{ backgroundColor, borderRadius: `${borderRadius}px` }"
    @mouseenter="mouseEnter"
  >
    <div class="progress-bar">
      <div class="outline">
        <div class="progress" :style="{ width: `${percent}%` }" />
        <div class="percent" :style="percentPosition">
          {{ percent }}%
        </div>
      </div>
      <div class="thumb" :style="{ left: `${percent}%` }">
        <img :src="currentTimeline.emoji" class="emoji" alt="">
        <div class="time">
          {{ time.format('HH:mm') }}
        </div>
        <div
          class="second animate__animated animate__fadeOutUp animate__infinite"
          :style="{ left: `${secondLeft}px`, animationDuration: `${currentTimeline.titleAnimationDuration}s` }"
        >
          {{ currentTimeline.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$progressHeight: 56px;
.container {
  user-select: none;
  display: flex;
  background-color: black;
  justify-content: center;
  align-content: center;
  backdrop-filter: blur(10px);
  align-items: center;

  .progress-bar {
    position: relative;
    width: 80%;
    max-height: 54px;
    display: flex;
    align-items: center;

    .thumb {
      position: absolute;
      left: -25px;
      top: -30px;
      width: 50px;
      display: flex;
      transform: translateX(-30px);
      flex-direction: column;
      transition-property: left;
      transition-duration: 500ms;
      transition-timing-function: ease-out;
      align-items: center;

      .time {
        left: 20%;
        font-weight: 700;
        font-size: 12px;
        position: absolute;
        bottom: -12px;
        color: #453840;
      }

      .emoji {
        user-select: none;
        height: 50px;
        filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.5));
      }

      .second {
        left: 50px;
        top: 16px;
        position: absolute;
      }
    }

    .outline {
      box-sizing: border-box;
      height: calc($progressHeight / 2);
      border: 4px solid #422e26;
      border-radius: 39px;
      position: absolute;
      width: 100%;

      .progress {
        height: calc($progressHeight / 2 - 6px);
        left: 0;
        width: 0;
        transition-property: width;
        transition-duration: 500ms;
        transition-timing-function: ease-out;
        background: linear-gradient(360deg, #f87d5f 0%, #f87d5f 53.44%, #ffed60 100%);
        border-radius: 35px 0 0 35px;
      }

      .percent {
        position: absolute;
        top: 0px;
        color: #453840;
        font-weight: bold;
      }
    }
  }
}
</style>
