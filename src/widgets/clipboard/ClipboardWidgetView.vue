<script lang="ts" setup>
import { useAppBroadcast, useShortcutListener } from '@widget-js/vue3'
import {
  BrowserWindowApi,
  BrowserWindowApiEvent,
  ClipboardApiEvent,
  ShortcutApi,
} from '@widget-js/core'
import {
  ref,
  watch,
} from 'vue'
import type { Transition } from '@vueuse/motion'
import { useMotion } from '@vueuse/motion'
import delay from 'lodash-es/delay'
import { useLocalStorage } from '@vueuse/core'
import { ClipboardData } from '@/widgets/clipboard/model/ClipboardData'
import type { SearchEngine } from '@/widgets/clipboard/model/SearchPlatform'
import { search, searchPlatformList } from '@/widgets/clipboard/model/SearchPlatform'
import ClipboardWidget from '@/widgets/clipboard/Clipboard.widget'

const showing = ref(false)
const data = ref<ClipboardData | undefined>()

const transition: Transition = {
  type: 'keyframes',
  duration: 300,
  ease: 'easeOut',
}

let hideTimerId = -1

function clearHideTimer() {
  clearTimeout(hideTimerId)
}

const {
  apply,
  motionProperties,
} = useMotion(null, {
  initial: {
    y: -100,
    transition,
  },
  hide: {
    y: -100,
    transition: {
      ...transition,
      onComplete: () => {
        // BrowserWindowApi.hide()
      },
    },
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
      },
    },
  },
})

function startHideTimer() {
  clearHideTimer()
  hideTimerId = window.setTimeout(() => {
    apply('hide')
    showing.value = false
  }, 3000)
}

watch(
  () => motionProperties.y,
  (newY) => {
    BrowserWindowApi.setPosition({ y: newY })
  },
)

async function initWindow() {
  await BrowserWindowApi.setup({
    width: 600,
    height: 56,
    maxWidth: 600,
    maxHeight: 56,
    resizable: false,
    movable: false,
  })
  await BrowserWindowApi.alignToScreen('top-center')
  await BrowserWindowApi.hide()
}

initWindow()

useAppBroadcast([ClipboardApiEvent.CHANGED, BrowserWindowApiEvent.FOCUS], async (broadcast) => {
  if (broadcast.event == ClipboardApiEvent.CHANGED) {
    const text = broadcast.payload.content as string
    data.value = new ClipboardData(text)
    await BrowserWindowApi.setAlwaysOnTop(true)
    showing.value = true
    await BrowserWindowApi.showInactive()
    apply('show')
    startHideTimer()
  }
})

const shortcut = useLocalStorage(`${ClipboardWidget.name}.shortcut`, 'Meta+Alt+S', { listenToStorageChanges: true })
const searchPlatform = useLocalStorage<SearchEngine>(`${ClipboardWidget.name}.platform`, 'google', { listenToStorageChanges: true })
watch(shortcut, (newShortcut, oldValue) => {
  ShortcutApi.unregister(oldValue)
  ShortcutApi.register(newShortcut)
})

ShortcutApi.register(shortcut.value)

useShortcutListener(() => {
  if (data.value) {
    search(searchPlatform.value, data.value!.content)
  }
})
</script>

<template>
  <div class="hover-wrapper" @mouseenter="clearHideTimer" @mouseleave="startHideTimer">
    <div class="content">
      {{ data?.content }}
    </div>
    <div class="actions">
      <div v-for="platform in searchPlatformList" :key="platform.value" class="search-engine" @click="search(platform.value)">
        <img :src="platform.icon" :alt="platform.title">
      </div>
    </div>
  </div>
</template>

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
