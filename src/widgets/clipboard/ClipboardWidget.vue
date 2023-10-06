<template>
  <div class="hover-wrapper" @mouseenter="clearHideTimer" @mouseleave="startHideTimer">
    <div class="content">{{ data?.content }}</div>
    <div class="actions">
      <div class="search-engine" @click="search('bing')">
        <img src="./assets/bing.png" alt="Bing" @click="search('bing')" />
      </div>
      <div class="search-engine">
        <img src="./assets/google.png" alt="Google" @click="search('google')" />
      </div>
      <div class="search-engine">
        <img src="./assets/baidu.png" alt="BaiDu" @click="search('baidu')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppBroadcast, useWidget } from '@widget-js/vue3'
import { BrowserWindowApi, BrowserWindowApiEvent, ClipboardApiEvent } from '@widget-js/core'
import { ClipboardData, ClipboardListData } from '@/widgets/clipboard/model/ClipboardData'
import { ref, watch } from 'vue'
import { Transition, useMotion } from '@vueuse/motion'
import { delay } from 'lodash'

type SearchEngine = 'bing' | 'google' | 'baidu'
// const { widgetData } = useWidget(ClipboardListData, {
//   loadDataByWidgetName: true
// })
const showing = ref(false)
const data = ref<ClipboardData | undefined>()

const transition: Transition = {
  type: 'keyframes',
  duration: 300,
  ease: 'easeOut'
}

let hideTimerId: number = -1
const startHideTimer = () => {
  clearHideTimer()
  hideTimerId = window.setTimeout(() => {
    apply('hide')
    showing.value = false
  }, 3000)
}

const clearHideTimer = () => {
  clearTimeout(hideTimerId)
}

const { apply, motionProperties } = useMotion(null, {
  initial: { y: -100, transition },
  hide: {
    y: -100,
    transition: {
      ...transition,
      onComplete: () => {
        // BrowserWindowApi.hide()
      }
    }
  },
  show: {
    y: 0,
    scale: 1,
    transition: {
      ...transition,
      onComplete: () => {
        // electron bug，设置位置，会导致窗口大小变化，动画结束后恢复大小
        delay(() => {
          BrowserWindowApi.setSize(600, 56)
          BrowserWindowApi.setMaximumSize(600, 56)
          BrowserWindowApi.setMinimumSize(600, 56)
        }, 500)
        // BrowserWindowApi.setSize(600, 36)
      }
    }
  }
})

const hideWindow = () => {
  showing.value = false
  apply('hide')
}
const search = (se: SearchEngine) => {
  switch (se) {
    case 'bing':
      BrowserWindowApi.openUrl(`https://cn.bing.com/search?q=${data.value?.content}`, { external: true })
      break
    case 'google':
      BrowserWindowApi.openUrl(`https://www.google.com/search?q=${data.value?.content}`, { external: true })
      break
    case 'baidu':
      BrowserWindowApi.openUrl(`https://www.baidu.com/s?wd=${data.value?.content}`, { external: true })
      break
  }
}

watch(
  () => motionProperties['y'],
  (newY) => {
    BrowserWindowApi.setPosition({
      y: newY
    })
  }
)

const initWindow = async () => {
  await BrowserWindowApi.setup({
    width: 600,
    height: 56,
    maxWidth: 600,
    maxHeight: 56,
    resizable: false,
    movable: false
  })
  await BrowserWindowApi.alignToScreen('top-center')
  await BrowserWindowApi.hide()
}
initWindow()
useAppBroadcast([ClipboardApiEvent.CHANGED, BrowserWindowApiEvent.FOCUS], async (broadcast) => {
  if (broadcast.event == ClipboardApiEvent.CHANGED) {
    const text = broadcast.payload['content'] as string
    data.value = new ClipboardData(text)
    await BrowserWindowApi.setAlwaysOnTop(true)
    showing.value = true
    await BrowserWindowApi.showInactive()
    apply('show')
    startHideTimer()
    console.log(text.substring(0, 20))
  } else if (broadcast.event == BrowserWindowApiEvent.FOCUS) {
  }
})
</script>

<style scoped lang="scss">
.hover-wrapper {
  display: flex;
  background-color: white;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  padding: 8px 16px;
  margin: 0 4px 4px 4px;
  gap: 12px;
  align-items: center;
  box-sizing: border-box;
  border-image: linear-gradient(221deg, #a8a8a8 0%, rgba(168, 168, 168, 0) 70%) 1;
  backdrop-filter: blur(40px);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  .content {
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
    overflow: hidden;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    gap: 12px;

    .search-engine {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;

      img {
        width: 24px;
        height: 24px;
        background: transparent;
      }

      &:hover {
        box-sizing: border-box;
        border-radius: 4px;
        background-color: #d9d9d9;
      }
    }
  }
}
</style>
