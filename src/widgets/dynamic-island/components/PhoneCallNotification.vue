<template>
  <div class="phone-call">
    <audio ref="audio"></audio>
    <audio ref="ringtone"></audio>
    <audio ref="hangup"></audio>
    <img class="avatar" src="../images/zhangyuge.jpg" alt="">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="description">{{ desc }}</div>
    </div>
    <div class="actions" v-if="!voicePlaying && !hangupPlaying">
      <div class="btn-hangup" @click="hangupClick">
        <img width="24"
             src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcxNzY5NzE5MzM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAzODRjLTY4LjQ4IDAtMTM0LjQgMTAuNjY2NjY3LTE5Ni4yNjY2NjcgMzAuNzJ2MTMyLjQ4YzAgMTYuODUzMzMzLTkuODEzMzMzIDMxLjM2LTIzLjg5MzMzMyAzOC40LTQxLjYgMjAuOTA2NjY3LTc5Ljc4NjY2NyA0Ny41NzMzMzMtMTEzLjcwNjY2NyA3OC45MzMzMzMtNy42OCA3LjQ2NjY2Ny0xOC4xMzMzMzMgMTIuMTYtMjkuODY2NjY2IDEyLjE2LTExLjczMzMzMyAwLTIyLjQtNC42OTMzMzMtMzAuMDgtMTIuNTg2NjY2TDEyLjU4NjY2NyA1NTguNTA2NjY3Yy03Ljg5MzMzMy03Ljg5MzMzMy0xMi41ODY2NjctMTguNTYtMTIuNTg2NjY3LTMwLjI5MzMzNCAwLTExLjczMzMzMyA0LjY5MzMzMy0yMi40IDEyLjU4NjY2Ny0zMC4yOTMzMzNDMTQyLjUwNjY2NyAzNzQuNCAzMTguNTA2NjY3IDI5OC42NjY2NjcgNTEyIDI5OC42NjY2NjdzMzY5LjQ5MzMzMyA3NS43MzMzMzMgNDk5LjQxMzMzMyAxOTkuMjUzMzMzYzcuODkzMzMzIDcuNjggMTIuNTg2NjY3IDE4LjU2IDEyLjU4NjY2NyAzMC4yOTMzMzMgMCAxMS43MzMzMzMtNC42OTMzMzMgMjIuNC0xMi41ODY2NjcgMzAuMDhsLTEwNS42IDEwNS42Yy03LjY4IDcuNjgtMTguMzQ2NjY3IDEyLjU4NjY2Ny0zMC4wOCAxMi41ODY2NjctMTEuNTIgMC0yMi4xODY2NjctNC42OTMzMzMtMjkuODY2NjY2LTEyLjE2YTQ5NC45NzYgNDk0Ljk3NiAwIDAgMC0xMTMuNzA2NjY3LTc4LjkzMzMzMyA0Mi45ODY2NjcgNDIuOTg2NjY3IDAgMCAxLTIzLjg5MzMzMy0zOC40di0xMzIuNDhBNjQxLjQ5MzMzMyA2NDEuNDkzMzMzIDAgMCAwIDUxMiAzODR6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSIxNjc5Ij48L3BhdGg+PC9zdmc+'/>
      </div>
      <div class="btn-answer" @click="answerClick">
        <img width="24"
             src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcxNzY5NzI0MTA0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4NTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTI4Mi40NTMzMzMgNDYwLjM3MzMzM2M2MS40NCAxMjAuNzQ2NjY3IDE2MC40MjY2NjcgMjE5LjMwNjY2NyAyODEuMTczMzM0IDI4MS4xNzMzMzRsOTMuODY2NjY2LTkzLjg2NjY2N2MxMS41Mi0xMS41MiAyOC41ODY2NjctMTUuMzYgNDMuNTItMTAuMjQgNDcuNzg2NjY3IDE1Ljc4NjY2NyA5OS40MTMzMzMgMjQuMzIgMTUyLjMyIDI0LjMyIDIzLjQ2NjY2NyAwIDQyLjY2NjY2NyAxOS4yIDQyLjY2NjY2NyA0Mi42NjY2NjdWODUzLjMzMzMzM2MwIDIzLjQ2NjY2Ny0xOS4yIDQyLjY2NjY2Ny00Mi42NjY2NjcgNDIuNjY2NjY3LTQwMC42NCAwLTcyNS4zMzMzMzMtMzI0LjY5MzMzMy03MjUuMzMzMzMzLTcyNS4zMzMzMzMgMC0yMy40NjY2NjcgMTkuMi00Mi42NjY2NjcgNDIuNjY2NjY3LTQyLjY2NjY2N2gxNDkuMzMzMzMzYzIzLjQ2NjY2NyAwIDQyLjY2NjY2NyAxOS4yIDQyLjY2NjY2NyA0Mi42NjY2NjcgMCA1My4zMzMzMzMgOC41MzMzMzMgMTA0LjUzMzMzMyAyNC4zMiAxNTIuMzIgNC42OTMzMzMgMTQuOTMzMzMzIDEuMjggMzEuNTczMzMzLTEwLjY2NjY2NyA0My41MmwtOTMuODY2NjY3IDkzLjg2NjY2NnoiIHAtaWQ9IjE4NTEiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4='/>
      </div>
    </div>

    <div class="voice" v-if="voicePlaying">
      <voice-bar></voice-bar>
      <voice-bar></voice-bar>
      <voice-bar></voice-bar>
      <voice-bar></voice-bar>
      <voice-bar></voice-bar>
      <voice-bar></voice-bar>
      <voice-bar></voice-bar>
      <voice-bar></voice-bar>
      <voice-bar background-color="#E39444"></voice-bar>
      <voice-bar background-color="#E39444"></voice-bar>
      <voice-bar background-color="#E39444"></voice-bar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {useIntervalFn, useMediaControls} from "@vueuse/core";

import Lyric, {HandlerParams, Lines} from 'lyric-resolver'
import {useNotificationStore} from "../store/notification-store";
import {storeToRefs} from "pinia";
import VoiceBar from "./VoiceBar.vue";

const notificationStore = useNotificationStore();
const {show, notification} = storeToRefs(notificationStore)
const audio = ref()
const ringtone = ref()
const hangup = ref()
const {playing, waiting, duration, ended} = useMediaControls(ringtone, {
  src: "./audio/ringtone.m4a",
})

const {playing: hangupPlaying, ended: hangupEnded} = useMediaControls(hangup, {
  src: "./audio/hangup.m4a",
})

const {playing: voicePlaying, duration: voiceDuration, ended: voiceEnded} = useMediaControls(audio, {
  src: "./audio/voice_squidward.m4a",
})

const props = defineProps({
  title: {
    type: String
  },
  message: {
    type: String
  }
})

watch(ended, () => {
  voicePlaying.value = true
})

watch(voiceEnded, () => {
  hangupPlaying.value = true
})

watch(voicePlaying, (newValue, oldValue) => {
  if (newValue) {
    playing.value = false;
    useInterval.resume();
  }
})

watch(show, (newValue, oldValue) => {
  if (!newValue) {
    playing.value = false
    hangupPlaying.value = false
    voicePlaying.value = false
  }
})

watch(hangupEnded, () => {
  notificationStore.hideNotification();
})

const desc = ref(props.message)
const lyric = new Lyric(
    "[00:00.00]5\n" +
    "[00:00.90]4\n" +
    "[00:01.80]3\n" +
    "[00:02.80]2\n" +
    "[00:03.50]1\n" +
    "[00:04.50]我下班了，蟹老板\n" +
    "[00:06.20]我要说的是\n" +
    "[00:07.30]如果有一天\n" +
    "[00:08.30]我真的实现了\n" +
    "[00:09.70]我生命中的梦想\n" +
    "[00:11.20]我永远也不会让\n" +
    "[00:13.50]我的双脚\n" +
    "[00:14.50]站在这油污的地板上", handleLyric);
let index = 0;

function handleLyric(payload: HandlerParams): void {
}

function answerClick() {
  voicePlaying.value = true
}


let time = 0;
const useInterval = useIntervalFn(() => {
      time += 10
      if (lines.length > 1) {
        if (lines[1].lineTime > time) {
          desc.value = lines[0].txt
        } else {
          lines.splice(0, 1)
        }
      } else {
        desc.value = lines[0].txt
      }
    },
    10, {immediate: false}
)
let lines: Lines[]
onMounted(async () => {
  await nextTick();
  playing.value = true
  lines = lyric.lines
});

function hangupClick() {
  notificationStore.hideNotification()
}

watch(show, () => {
  if (!show.value) {
    playing.value = false
  }
})

onUnmounted(() => {

})

</script>

<style scoped lang="scss">

.phone-call {
  display: flex;
  padding: 0.8rem;
  width: 100%;

  .avatar {
    height: 100%;
    border-radius: 50%;
  }

  .content {
    flex: 1;
    display: flex;

    align-items: flex-start;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 100%;
    justify-content: space-around;
    flex-direction: column;

    .title {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .description {
      color: white;
      font-size: 1rem;
      text-overflow: ellipsis;
      max-width: 144px;
    }
  }

  .voice {
    display: flex;
    align-items: center;

    .voice-bar {
      margin-right: 2px;

      &.orange {
        background-color: #E39444;
      }
    }
  }


  .actions {
    display: flex;

    .btn-hangup, .btn-answer {
      background-color: red;
      height: 100%;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: center;
      aspect-ratio: 1;

      .iconfont {
        font-size: 1.5rem;
        color: white;
      }
    }

    .btn-hangup {
      background-color: #ff453b;
      margin-right: 0.5rem;
    }

    .btn-answer {
      background-color: #32d15a;
    }


  }
}

</style>
