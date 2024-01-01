<script lang="ts">
import { useWidget } from '@widget-js/vue3'
import {
  computed,
  nextTick,
  reactive,
  ref,
} from 'vue'
import {
  useElementSize,
  useIntervalFn,
} from '@vueuse/core'
import delay from 'lodash-es/delay'
import Driver from 'driver.js'
import {
  BrowserWindowApi,
  DeployedWidgetApi,
  WidgetDataApi,
} from '@widget-js/core'
import noPainNoGain from './lyric/no_pain_no_gain.txt?raw'
import LyricBookData, { readFile } from '@/widgets/lyric-book/model/LyricBookData'
import PageController from '@/widgets/lyric-book/model/PageController'
import LyricFooter from '@/widgets/lyric-book/components/LyricFooter.vue'
import Lyric from '@/widgets/lyric-book/components/Lyric.vue'
import 'driver.js/dist/driver.min.css'

export default {
  name: 'LyricBookWidgetView',
  components: {
    Lyric,
    LyricFooter,
  },
  setup() {
    const pageController = reactive(new PageController())

    const {
      widgetData,
      widgetParams,
    } = useWidget(LyricBookData, {
      loadDataByWidgetName: true,
      onDataLoaded: (data) => {
        if (data) {
          pageController.setCurrentPage(data.currentPage)
          pageController.updateBookText(readFile(data.file))
        }
      },
    })

    const hover = ref(false)
    const trulyLyric = noPainNoGain.split('\r\n')
    const lyricInterval = 5000
    const totalDuration = trulyLyric.length * lyricInterval
    const lyricIndex = ref(0)
    const time = ref(0)
    useIntervalFn(() => {
      if (hover.value) {
        return
      }

      lyricIndex.value++
      if (lyricIndex.value >= trulyLyric.length) {
        lyricIndex.value = 0
        time.value = 0
      }
    }, lyricInterval)
    const progress = computed(() => {
      return (time.value / totalDuration) * 100
    })
    useIntervalFn(() => {
      if (hover.value) {
        return
      }

      time.value = time.value + 100
    }, 100)
    const lyric = ref()
    const { height: lyricHeight } = useElementSize(lyric)
    return {
      trulyLyric,
      lyric,
      lyricHeight,
      hover,
      progress,
      lyricIndex,
      totalDuration,
      time,
      widgetData,
      widgetParams,
      pageController,

    }
  },
  computed: {
    pageLine() {
      return Math.floor(this.lyricHeight / LyricBookData.lineHeight)
    },
    currentLyric() {
      return this.hover ? this.pageController.currentContent : this.trulyLyric
    },
  },
  watch: {
    hover(newValue) {
      if (newValue) {
        this.lyricIndex = 1
      }
    },
    lyricHeight() {
    },
  },
  async mounted() {
    await nextTick()
    delay(() => {
      if (this.widgetData.showGuide && !this.preview) {
        const driver = new Driver({
          allowClose: false,
          onDeselected: () => {
            this.widgetData.showGuide = false
            WidgetDataApi.saveByName(this.widgetData)
          },
        })
        driver.highlight({
          element: '#hotspot',
          stageBackground: ' rgba(255, 255, 255, 0.36)',
          popover: {
            title: '小提示',
            description: '将鼠标移动到该区域，歌词会自动变成小说内容',
          },
        })
      }
    }, 2000)
  },
  methods: {
    onHover() {
      this.hover = true
    },
    leave() {
      this.hover = false
    },
    hide() {
      BrowserWindowApi.hide()
    },
    close() {
      DeployedWidgetApi.removeDeployedWidget(this.widgetId)
    },
    saveData() {
      this.widgetData.currentPage = this.pageController.getCurrentPage()
      WidgetDataApi.saveByName(this.widgetData, { sendBroadcast: false })
    },
    next() {
      this.pageController.nextPage()
      this.saveData()
    },
    previous() {
      this.pageController.previousPage()
      this.saveData()
    },
  },
}
</script>

<template>
  <div class="root">
    <Lyric ref="lyric" :lyric="currentLyric" :top-padding="!hover" :lyric-index="lyricIndex" />
    <div class="header">
      <div class="icon mgc_minimize_line" @click="hide" />
      <div class="icon mgc_close_line" @click="close" />
    </div>
    <LyricFooter :progress="progress" @hover="onHover" @leave="leave" @next="next" @previous="previous" />
    <div class="background" />
    <div class="mask" />
  </div>
</template>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  position: absolute;
}

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
  background-image: url('./img/img.png');
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
