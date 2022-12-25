<template>
  <lyric :lyric="currentLyric" ref="lyric" :top-padding="!hover" :lyric-index="lyricIndex"></lyric>
  <div class="header">
    <div class="icon mgc_minimize_line" @click="hide"></div>
    <div class="icon mgc_close_line" @click="close"></div>
  </div>
  <lyric-footer :progress="progress" @hover="hover" @leave="leave" @next="next" @previous="previous"></lyric-footer>
  <div class="background"></div>
  <div class="mask"></div>
</template>

<script lang="ts">
// @ts-ignore
import noPainNoGain from './lyric/no_pain_no_gain.txt';
import Lyric from "@/widgets/lyric-book/components/Lyric.vue";
import {useElementSize, useIntervalFn} from "@vueuse/core";
import {computed, nextTick, ref} from "vue";
import {BroadcastApi, BroadcastEvent, WidgetApi, WidgetDataRepository} from "@widget-js/core";
import LyricFooter from "@/widgets/lyric-book/components/LyricFooter.vue";
import LyricBookData from "@/widgets/lyric-book/model/LyricBookData";
import PageController from "@/widgets/lyric-book/model/PageController";
import 'driver.js/dist/driver.min.css';
import Driver from 'driver.js';
import {delay} from "lodash";

export default {
  name: "LyricBookWidget",
  components: {LyricFooter, Lyric},
  props: {
    widgetData: {
      type: LyricBookData,
    },
    widgetId: {
      type: String,
    },
    pageController: {
      type: PageController,
      required: true
    },
  },
  async mounted() {
    await nextTick();
    delay(() => {
      if (this.widgetData.showGuide) {
        const driver = new Driver({
          allowClose: false, onDeselected: () => {
            this.widgetData.showGuide = false;
            WidgetDataRepository.saveByName(this.widgetData);
          }
        });
        driver.highlight({
          element: '#hotspot',
          stageBackground: " rgba(255, 255, 255, 0.36)",
          popover: {
            title: '小提示',
            description: '将鼠标移动到该区域，歌词会自动变成小说内容',
          }
        });
      }
    }, 2000)
  },
  setup() {
    const trulyLyric = noPainNoGain.split("\r\n");
    const lyricInterval = 5000;
    const totalDuration = trulyLyric.length * lyricInterval;
    const lyricIndex = ref(0);
    const time = ref(0);
    useIntervalFn(() => {
      if (hover.value) return;
      lyricIndex.value++;
      if (lyricIndex.value >= trulyLyric.length) {
        lyricIndex.value = 0;
        time.value = 0;
      }
    }, lyricInterval);
    const progress = computed(() => {
      return time.value / totalDuration * 100;
    })
    useIntervalFn(() => {
      if (hover.value) return;
      time.value = time.value + 100;
    }, 100);
    const lyric = ref();
    const {height: lyricHeight} = useElementSize(lyric)
    const hover = ref(false);
    return {trulyLyric, lyric, lyricHeight, hover, progress, lyricIndex, totalDuration, time}
  },
  watch: {
    hover(newValue) {
      if (newValue) {
        this.lyricIndex = 1;
      } else {

      }
    },
    lyricHeight() {

    }
  },
  computed: {
    pageLine() {
      return Math.floor(this.lyricHeight / LyricBookData.lineHeight)
    },
    currentLyric() {
      return this.hover ? this.pageController.currentContent : this.trulyLyric;
    }
  },
  methods: {
    hover() {
      this.hover = true;
    },
    leave() {
      this.hover = false;
    },
    hide() {
      BroadcastApi.sendBroadcastEvent(new BroadcastEvent("hide-overlap", "", this.widgetId));
    },
    close() {
      WidgetApi.removeHostedWidget(this.widgetId)
    },
    saveData() {
      this.widgetData.currentPage = this.pageController.getCurrentPage();
      WidgetApi.saveDataByName(this.widgetData, {sendBroadcast: false})
    },
    next() {
      this.pageController.nextPage();
      this.saveData();
    },
    previous() {
      this.pageController.previousPage();
      this.saveData();
    }
  }
}
</script>

<style lang="scss" scoped>


body:hover {
  .background {
    filter: blur(12px);
  }
}

.lyric {
  height: 80%;
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
  background-image: url("./img/img.png");
  transition: all 0.8s;
  transform: scale(1);
  filter: blur(4px);
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


</style>
