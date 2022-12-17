<template>
  <lyric :lyric="lyricArr" :lyric-index="lyricIndex"></lyric>
  <div class="header">
    <div class="icon mgc_minimize_line" @click="hide"></div>
    <div class="icon mgc_close_line" @click="close"></div>
  </div>
  <div class="footer">
    <el-progress :percentage="progress" :show-text="false" color="#1ecf9d"/>
    <div class="buttons">
      <div class="icon shuffle mgc_shuffle_line"></div>
      <div class="icon previous mgc_left_line"></div>
      <div class="icon play mgc_pause_line"></div>
      <div class="icon next mgc_right_line"></div>
      <div class="icon volume mgc_volume_line"></div>
    </div>
  </div>
  <div class="background"></div>
  <div class="mask"></div>
</template>

<script lang="ts">
// @ts-ignore
import noPainNoGain from './lyric/no_pain_no_gain.txt';
import Lyric from "@/widgets/lyric-book/Lyric.vue";
import {useIntervalFn} from "@vueuse/core";
import {computed, ref} from "vue";
import {BroadcastApi, BroadcastEvent, WidgetApi, WidgetData} from "@widget-js/core";

export default {
  name: "LyricBookWidget",
  components: {Lyric},
  props: {
    widgetData: {
      type: WidgetData,
    },
    widgetId: {
      type: String,
    }
  },
  mounted() {
    const a = this.readFile("file:///C:/Users/neo/Desktop/%E3%80%8A%E6%98%A5%E5%89%8D%E9%9B%AA%E3%80%8B%E4%BD%9C%E8%80%85%EF%BC%9A%E8%8F%9C%E7%B4%AB.txt");
  },
  setup() {
    const lyricArr = noPainNoGain.split("\r\n");
    const lyricInterval = 5000;
    const totalDuration = lyricArr.length * lyricInterval;
    const lyricIndex = ref(0);
    const time = ref(0);
    useIntervalFn(() => {
      lyricIndex.value++;
      if (lyricIndex.value >= lyricArr.length) {
        lyricIndex.value = 0;
        time.value = 0;
      }
    }, lyricInterval);
    const progress = computed(() => {
      return time.value / totalDuration * 100;
    })
    useIntervalFn(() => {
      time.value = time.value + 100;
    }, 100);
    return {lyricArr, progress, lyricIndex, totalDuration, time}
  },
  methods: {
    hide() {
      BroadcastApi.sendBroadcastEvent(new BroadcastEvent("hide-overlap", "", this.widgetId));
    },
    close() {
      WidgetApi.removeHostedWidget(this.widgetId)
    },
    readFile(filePath) {
      // 创建一个新的xhr对象
      let xhr = new XMLHttpRequest()
      if (!window.XMLHttpRequest) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      const okStatus = document.location.protocol === 'file' ? 0 : 200
      xhr!.open('GET', filePath, false)
      xhr.overrideMimeType('text/html;charset=utf-8')
      xhr.send(null)
      return xhr.status === okStatus ? xhr.responseText : null
    },
  }
}
</script>

<style lang="scss" scoped>

.lyric {
  height: 90%;
}

.mask,
.background {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.background {
  z-index: -2;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(12px);
  background-image: url("./img/img.png");
  transition: all 0.8s;
  transform: scale(1.1);
}

.icon {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6px;
  font-size: 24px;
  transition-duration: 0.3s;
  transition-property: background-color;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;

  &:before {
    color: white;
  }

  &:hover {
    background-color: #1ecf9d;
  }
}

.mask {
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
}

.header {
  display: flex;
  position: absolute;
  right: 8px;
  top: 0;
}

.footer {
  position: absolute;
  width: 80%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 32px;
  margin: auto;

  .buttons {
    margin-top: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .play {
      background-color: #1ecf9d;
      border-radius: 50%;
    }


  }
}


</style>
