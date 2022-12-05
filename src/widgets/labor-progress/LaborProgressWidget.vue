<template>
  <div class="container" ref="container"
       :style="{height:`${height}px`, backgroundColor:backgroundColor,borderRadius: `${borderRadius}px`}">
    <div class="progress-bar">
      <div class="outline">
        <div class="progress" :style="{width:`${percent}%`}"></div>
        <div class="percent" :style="percentPosition">{{ percent }}%</div>
      </div>
      <div class="thumb" ref="container" :style="{left:`${percent}%`}">
        <img :src="currentTimeline.emoji" class="emoji" alt="">
        <div class="time">{{ time.format("HH:mm") }}</div>
        <div class="second animate__animated animate__fadeOutUp animate__infinite"
             :style="{left: `${secondLeft}px`,animationDuration:`${currentTimeline.titleAnimationDuration}s`}">
          {{ currentTimeline.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {computed, ref} from "vue";
import {useIntervalFn, useWindowSize} from "@vueuse/core";
import dayjs from "dayjs";
import faceWithTears from "./images/face_holding_back_tears_3d.png"
import faceSpiralEyes from "./images/face_with_spiral_eyes_3d.png"
import faceSteam from "./images/face_with_steam_from_nose_3d.png"
import faceSunglasses from "./images/smiling_face_with_sunglasses_3d.png"
import faceStarStruck from "./images/star-struck_3d.png"
import faceSleeping from "./images/sleeping_face_3d.png"
import faceKnockedOut from "./images/knocked-out_face_3d.png"
import faceYawning from "./images/yawning_face_3d.png"
import faceSleepy from "./images/sleepy_face_3d.png"
import facePartying from "./images/partying_face_3d.png"
import EmojiTimeline from "@/widgets/labor-progress/model/EmojiTimeline";
import "@/common/dayjs-extend"
import {NotificationApi} from "@widget-js/core";
import {floor} from "lodash";

export default {
  name: "LaborProgressWidget",
  setup: (props,) => {
    const workStartTime = computed(() => {
      return dayjs(props.startTime)
    })
    const workEndTime = computed(() => {
      return dayjs(props.endTime)
    })

    console.info("start", workStartTime.value.format())
    console.info("end", workEndTime.value.format())

    const totalSeconds = computed(() => {
      return dayjs.duration(workEndTime.value.diff(workStartTime.value)).asSeconds();
    })
    console.info("Total Second", totalSeconds.value)
    // 获取一周的第几天，1代表周一，7代表周天
    const weekday = dayjs().isoWeekday();
    const weekdayEmojis = [faceSpiralEyes, faceSteam, faceKnockedOut, faceWithTears, faceWithTears, faceWithTears, faceWithTears]
    const percent = ref(0);
    const percentPosition = ref();
    const emojiTimeline = [
      new EmojiTimeline(weekdayEmojis[weekday - 1], 0, 33.2),
      new EmojiTimeline(faceYawning, 33.3, 44.4, 1, "困"),
      new EmojiTimeline(faceSleepy, 44.5, 49, 1, "困"),
      new EmojiTimeline(faceSleeping, 49.1, 55.6, 1, "困"),
      new EmojiTimeline(faceSunglasses, 55.7, 94.9, 1, "冲"),
      new EmojiTimeline(faceStarStruck, 95, 99.9, 0.2, "快"),
      new EmojiTimeline(facePartying, 100, 100, 3, "❤"),
    ]

    const {height} = useWindowSize()
    const time = ref(dayjs())
    const secondLeft = ref(50)
    const currentTimeline = ref(emojiTimeline[0])
    useIntervalFn(() => {
      time.value = dayjs()
      const duration = dayjs.duration(time.value.diff(workStartTime.value));
      const remindDuration = dayjs.duration(workEndTime.value.diff(time.value));
      const remindSeconds = Math.round(remindDuration.asSeconds());
      if (remindSeconds == 5 * 60) {
        NotificationApi.advanceCountdown("收拾好行李，准备下班", workEndTime.value.format(), "下班倒计时")
      } else if (remindSeconds == 7 && props.enablePhoneReminder) {
        NotificationApi.call()
      }
      percent.value = floor(duration.asSeconds() / totalSeconds.value * 100, 1)
      if (percent.value > 100) {
        percent.value = 100;
      } else if (percent.value < 0) {
        percent.value = 0;
      }
      percentPosition.value = percent.value > 70 ? {left: '4px'} : {right: '4px'}
      secondLeft.value = percent.value > 95 ? -15 : 50;
      for (let timeline of emojiTimeline) {
        if (timeline.isActivated(percent.value)) {
          currentTimeline.value = timeline;
          break;
        }
      }
    }, 1000)
    return {height, time, currentTimeline, percent, secondLeft, percentPosition}
  },
  props: {
    backgroundColor: {
      type: String,
      default: "white"
    },
    borderRadius: {
      type: Number,
      default: 22
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    enablePhoneReminder: {
      type: Boolean,
      boolean: false
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  user-select: none;
  display: flex;
  background-color: black;
  justify-content: center;
  align-content: center;
  backdrop-filter: blur(10px);

  .progress-bar {
    position: relative;
    top: calc(50% - 16px);
    width: 80%;
    max-height: 54px;

    .thumb {
      position: absolute;
      left: -25px;
      top: -16px;
      display: flex;
      transform: translateX(-30px);
      flex-direction: column;
      transition-property: left;
      transition-duration: 500ms;
      transition-timing-function: ease-out;
      align-items: center;

      .time {
        left: 24%;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
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
      height: 26px;
      border: 3px solid #422E26;
      border-radius: 39px;
      position: absolute;
      width: 100%;

      .progress {
        height: 20px;
        left: 0;
        width: 0;
        top: 2px;
        transition-property: width;
        transition-duration: 500ms;
        transition-timing-function: ease-out;
        background: linear-gradient(360deg, #F87D5F 0%, #F87D5F 53.44%, #FFED60 100%);
        border-radius: 35px 0 0 35px;
      }

      .percent {
        position: absolute;
        top: 0;
        color: #453840;
        font-weight: bold;
      }
    }
  }
}
</style>
