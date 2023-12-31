<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import {
  useIntervalFn,
  useMediaControls,
} from '@vueuse/core'

import type { Lines } from 'lyric-resolver'
import Lyric from 'lyric-resolver'
import { NotificationApi } from '@widget-js/core'
import VoiceBar from './VoiceBar.vue'

const props = defineProps({
  title: {
    type: String,
    default: '章鱼哥',
  },
  avatar: { type: String },
  lyric: {
    type: String,
    default: '',
  },
  audio: {
    type: String,
    required: true,
  },
  mute: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
})

const audio = ref()
const ringtone = ref()
const hangup = ref()
let time = 0
let lines: Lines[]
const desc = ref(props.message)
const lyric = computed(() => {
  return new Lyric(props.lyric, () => {
  })
})

const { playing: ringtonePlaying } = useMediaControls(ringtone, { src: './audio/ringtone.m4a' })

const {
  playing: hangupPlaying,
  ended: hangupEnded,
} = useMediaControls(hangup, { src: './audio/hangup.m4a' })

const {
  playing: voicePlaying,
  ended: voiceEnded,
} = useMediaControls(audio, { src: props.audio })

watch(voiceEnded, () => {
  hangupPlaying.value = true
})

const {
  pause,
  resume,
} = useIntervalFn(() => {
  time += 10
  if (lines.length > 0) {
    if (lines.length > 1) {
      if (lines[1].lineTime > time) {
        desc.value = lines[0].txt
      }
      else {
        lines.splice(0, 1)
      }
    }
    else {
      desc.value = lines[0].txt
    }
  }
}, 10, { immediate: false })

watch(voicePlaying, (newValue) => {
  if (newValue) {
    ringtonePlaying.value = false
    lines = [...lyric.value.lines]
    resume()
  }
})

watch(hangupEnded, () => {
  stop()
})

function stop() {
  ringtonePlaying.value = false
  voicePlaying.value = false
  pause()
  NotificationApi.hide()
}

function start() {
  time = 0
  ringtonePlaying.value = false
  voicePlaying.value = true
  hangup.value = false
}

defineExpose({ stop })

watch(() => props.message, (newValue) => {
  desc.value = newValue
})

function answerClick() {
  voicePlaying.value = true
}

onMounted(async () => {
  await nextTick()
  start()
})

function hangupClick() {
  stop()
}
</script>

<template>
  <div class="phone-call">
    <audio v-if="!mute" ref="audio" />
    <audio v-if="!mute" ref="ringtone" />
    <audio v-if="!mute" ref="hangup" />
    <img class="avatar" :src="avatar" alt="">
    <div class="content">
      <div class="title">
        {{ title }}
      </div>
      <div class="description">
        {{ desc }}
      </div>
    </div>
    <div v-if="!voicePlaying && !hangupPlaying" class="actions">
      <div class="btn-hangup" @click="hangupClick">
        <img
          width="24"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcxNzY5NzE5MzM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAzODRjLTY4LjQ4IDAtMTM0LjQgMTAuNjY2NjY3LTE5Ni4yNjY2NjcgMzAuNzJ2MTMyLjQ4YzAgMTYuODUzMzMzLTkuODEzMzMzIDMxLjM2LTIzLjg5MzMzMyAzOC40LTQxLjYgMjAuOTA2NjY3LTc5Ljc4NjY2NyA0Ny41NzMzMzMtMTEzLjcwNjY2NyA3OC45MzMzMzMtNy42OCA3LjQ2NjY2Ny0xOC4xMzMzMzMgMTIuMTYtMjkuODY2NjY2IDEyLjE2LTExLjczMzMzMyAwLTIyLjQtNC42OTMzMzMtMzAuMDgtMTIuNTg2NjY2TDEyLjU4NjY2NyA1NTguNTA2NjY3Yy03Ljg5MzMzMy03Ljg5MzMzMy0xMi41ODY2NjctMTguNTYtMTIuNTg2NjY3LTMwLjI5MzMzNCAwLTExLjczMzMzMyA0LjY5MzMzMy0yMi40IDEyLjU4NjY2Ny0zMC4yOTMzMzNDMTQyLjUwNjY2NyAzNzQuNCAzMTguNTA2NjY3IDI5OC42NjY2NjcgNTEyIDI5OC42NjY2NjdzMzY5LjQ5MzMzMyA3NS43MzMzMzMgNDk5LjQxMzMzMyAxOTkuMjUzMzMzYzcuODkzMzMzIDcuNjggMTIuNTg2NjY3IDE4LjU2IDEyLjU4NjY2NyAzMC4yOTMzMzMgMCAxMS43MzMzMzMtNC42OTMzMzMgMjIuNC0xMi41ODY2NjcgMzAuMDhsLTEwNS42IDEwNS42Yy03LjY4IDcuNjgtMTguMzQ2NjY3IDEyLjU4NjY2Ny0zMC4wOCAxMi41ODY2NjctMTEuNTIgMC0yMi4xODY2NjctNC42OTMzMzMtMjkuODY2NjY2LTEyLjE2YTQ5NC45NzYgNDk0Ljk3NiAwIDAgMC0xMTMuNzA2NjY3LTc4LjkzMzMzMyA0Mi45ODY2NjcgNDIuOTg2NjY3IDAgMCAxLTIzLjg5MzMzMy0zOC40di0xMzIuNDhBNjQxLjQ5MzMzMyA2NDEuNDkzMzMzIDAgMCAwIDUxMiAzODR6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSIxNjc5Ij48L3BhdGg+PC9zdmc+"
        >
      </div>
      <div class="btn-answer" @click="answerClick">
        <img
          width="24"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcxNzY5NzI0MTA0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4NTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTI4Mi40NTMzMzMgNDYwLjM3MzMzM2M2MS40NCAxMjAuNzQ2NjY3IDE2MC40MjY2NjcgMjE5LjMwNjY2NyAyODEuMTczMzM0IDI4MS4xNzMzMzRsOTMuODY2NjY2LTkzLjg2NjY2N2MxMS41Mi0xMS41MiAyOC41ODY2NjctMTUuMzYgNDMuNTItMTAuMjQgNDcuNzg2NjY3IDE1Ljc4NjY2NyA5OS40MTMzMzMgMjQuMzIgMTUyLjMyIDI0LjMyIDIzLjQ2NjY2NyAwIDQyLjY2NjY2NyAxOS4yIDQyLjY2NjY2NyA0Mi42NjY2NjdWODUzLjMzMzMzM2MwIDIzLjQ2NjY2Ny0xOS4yIDQyLjY2NjY2Ny00Mi42NjY2NjcgNDIuNjY2NjY3LTQwMC42NCAwLTcyNS4zMzMzMzMtMzI0LjY5MzMzMy03MjUuMzMzMzMzLTcyNS4zMzMzMzMgMC0yMy40NjY2NjcgMTkuMi00Mi42NjY2NjcgNDIuNjY2NjY3LTQyLjY2NjY2N2gxNDkuMzMzMzMzYzIzLjQ2NjY2NyAwIDQyLjY2NjY2NyAxOS4yIDQyLjY2NjY2NyA0Mi42NjY2NjcgMCA1My4zMzMzMzMgOC41MzMzMzMgMTA0LjUzMzMzMyAyNC4zMiAxNTIuMzIgNC42OTMzMzMgMTQuOTMzMzMzIDEuMjggMzEuNTczMzMzLTEwLjY2NjY2NyA0My41MmwtOTMuODY2NjY3IDkzLjg2NjY2NnoiIHAtaWQ9IjE4NTEiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4="
        >
      </div>
    </div>

    <div v-if="voicePlaying" class="voice">
      <VoiceBar />
      <VoiceBar />
      <VoiceBar />
      <VoiceBar />
      <VoiceBar />
      <VoiceBar />
      <VoiceBar />
      <VoiceBar />
      <VoiceBar background-color="#E39444" />
      <VoiceBar background-color="#E39444" />
      <VoiceBar background-color="#E39444" />
    </div>
  </div>
</template>

<style scoped lang="scss">
$containerHeight: 75px;
$childHeight: calc($containerHeight - 1.6rem);
.phone-call {
  display: flex;
  padding: 0.8rem;
  width: 100%;
  border-radius: 12px;
  align-items: center;

  .avatar {
    height: $childHeight;
    aspect-ratio: 1;
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
      max-width: 170px;
      white-space: nowrap;
      overflow: hidden;
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
      height: $childHeight;
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
