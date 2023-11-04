<template>
  <div class="container">
    <div
      class="keyboard"
      @mouseenter="BrowserWindowApi.setIgnoreMouseEvent(false)"
      @mouseleave="BrowserWindowApi.setIgnoreMouseEvent(true)"
      ref="keyboard">
      <div class="keyboard-inner">
        <template v-for="modifierKey in modifierKeys" :key="modifierKey.keyCode">
          <div class="key">
            <div :class="{ 'key-content': true, active: !modifierKey.isKeyUp }">{{ modifierKey.name }}</div>
          </div>
        </template>

        <div class="key" v-if="normalKey">
          <div ref="normalKeyContent" :class="{ 'key-content': true, active: !normalKey.isKeyUp }">
            {{ normalKey?.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MotionVariants, useMotion } from '@vueuse/motion'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { useKeyboardEventHook } from '@widget-js/vue3'
import { BrowserWindowApi, DeviceApi, NativeKeyboardEvent } from '@widget-js/core'
import { debounce, delay } from 'lodash'
import { useIntervalFn } from '@vueuse/core'

const keyboard = ref<HTMLElement>()
const transition = {
  type: 'spring',
  stiffness: 220,
  damping: 25
}
const hideProperties = {
  translateY: 150,
  opacity: 0,
  transition
}
const variants = ref<MotionVariants>({
  initial: hideProperties,
  hide: {
    translateY: 150,
    opacity: 0,
    transition: {
      ...transition,
      onComplete: () => {
        BrowserWindowApi.hide()
        clearAllKeys()
      }
    }
  },
  show: {
    translateY: 0,
    opacity: 1,
    transition
  }
})

const clearAllKeys = () => {
  modifierKeys.splice(0, modifierKeys.length)
  normalKey.value = null
}
const normalKeyContent = ref<HTMLElement>()
const modifierKeys = reactive<NativeKeyboardEvent[]>([])
const normalKey = ref<NativeKeyboardEvent | null>(null)
const { apply, state } = useMotion(keyboard, variants)
onMounted(async () => {
  await nextTick()
})
let hideTimeoutId = 0
const winKey = { name: 'Win', keyCode: 91 }
const ctlKey = { name: 'Ctrl', keyCode: 162 }
const shiftKey = { name: 'Shift', keyCode: 160 }
const altKey = { name: 'Alt', keyCode: 164 }
const hideTimeout = 4000
const keyNameMap = [
  { name: '⌫', keyCode: 8 },
  { name: 'Caps', keyCode: 20 },
  { name: 'Home', keyCode: 36 },
  { name: '←', keyCode: 37 },
  { name: '↑', keyCode: 38 },
  { name: '→', keyCode: 39 },
  { name: 'Esc', keyCode: 27 },
  { name: '↓', keyCode: 40 },
  { name: 'Space', keyCode: 32 },
  { name: '⇧', keyCode: 33 },
  { name: '⇩', keyCode: 34 },
  { name: '📸', keyCode: 44 },
  { name: '☰', keyCode: 93 }
]

function isModifierKey(keycode) {
  return (
    keycode == ctlKey.keyCode || keycode == shiftKey.keyCode || keycode == altKey.keyCode || keycode == winKey.keyCode
  )
}

/**
 * 检测修饰键是否都已经松开
 */
const isModifierKeysReleased = (): boolean => {
  return !modifierKeys.find((it) => !it.isKeyUp)
}

function show() {
  clearTimeout(hideTimeoutId)
  apply('show')
  BrowserWindowApi.showInactive()
  BrowserWindowApi.setAlwaysOnTop(true)
}

// 因为nodejs事件可能会被吃掉，暂时没找到原因，先用定时器每秒检测一遍键盘是否都松开
// let hideCount = 0
// useIntervalFn(async () => {
//   if (await DeviceApi.isAllKeyReleased()) {
//     if (normalKey.value) {
//       normalKey.value.isKeyUp = true
//     }
//     for (let modifierKey of modifierKeys) {
//       modifierKey.isKeyUp = true
//     }
//     if (hideCount > 2) {
//       apply('hide')
//     }
//     hideCount++
//     console.log(hideCount)
//   } else {
//     hideCount = 0
//     console.log(hideCount)
//   }
// }, 1000)

let timeoutId = 0

function startHideTimer() {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    apply('hide')
  }, hideTimeout)
}

useKeyboardEventHook((event: NativeKeyboardEvent) => {
  if (event.isKeyUp) {
    if (isModifierKey(event.keyCode)) {
      const modifierKey = modifierKeys.find((it) => it.keyCode == event.keyCode)
      if (modifierKey) {
        modifierKey.isKeyUp = true
      }
      startHideTimer()
    } else {
      if (normalKey.value) {
        normalKey.value.isKeyUp = true
      }
    }
  } else {
    if (isModifierKey(event.keyCode)) {
      if (isModifierKeysReleased()) {
        clearAllKeys()
      }
      const modifierKey = modifierKeys.find((it) => it.keyCode == event.keyCode)
      if (modifierKey) {
        modifierKey.isKeyUp = false
      } else {
        if (event.keyCode == ctlKey.keyCode) {
          event.name = ctlKey.name
          event.isKeyUp = false
        } else if (event.keyCode == winKey.keyCode) {
          event.name = winKey.name
          event.isKeyUp = false
        }
        modifierKeys.push(event)
        show()
      }
    } else {
      if (!isModifierKeysReleased()) {
        const find = keyNameMap.find((it) => it.keyCode == event.keyCode)
        if (find) {
          event.name = find.name
        }
        event.isKeyUp = false
        normalKey.value = event
        clearTimeout(hideTimeoutId)
      }
    }
  }
})

onMounted(async () => {
  await nextTick()
  delay(async () => {
    normalKey.value = {
      name: '😎',
      keyCode: 8,
      scanCode: 17,
      isKeyUp: true
    }
    await BrowserWindowApi.setBounds({ height: 220 })
    await BrowserWindowApi.alignToScreen('bottom-center')
    await BrowserWindowApi.setIgnoreMouseEvent(true)
    show()
    startHideTimer()
  }, 1000)
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui;
  width: 100%;
  padding: 6px;
}

$radius: 20px;
$key-height: 60px;
.keyboard {
  --radius: 20px;
  --red: rgb(255, 100, 100);
  --green: rgb(100, 200, 100);
  --blue: rgb(100, 100, 255);
  padding: 8px;
  background-color: #111;
  border-radius: $radius;
  box-shadow: 0 4px #0b0b0b, -2px 5px 4px #0a0a0a;
  box-sizing: border-box;
  display: flex;
  margin: 6px;
  width: fit-content;

  .keyboard-inner {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    overflow: hidden;
    background-color: #222;
    border-radius: calc(var(--radius) * 0.9);
    box-shadow: 0 0.2rem rgba(0, 0, 0, 1) inset;
    justify-items: center;

    .key {
      width: $key-height;
      height: $key-height;
      padding: 0.3rem 0.2rem 0.3rem;
      top: 0.3rem;
      position: relative;
      overflow: hidden;
      border-radius: calc(var(--radius) * 0.5);
      transform: translate3d(0, 0, 0); // safari fix lol
      animation: shadow 5s -0.5s linear infinite;

      --delay: 0;

      .key-content {
        animation: color 5s calc(-0.5s + var(--delay)) linear infinite;
      }

      @keyframes shadow {
        0% {
          box-shadow: 0 0 5rem -2rem var(--red);
        }
        33% {
          box-shadow: 0 0 5rem -2rem var(--blue);
        }
        66% {
          box-shadow: 0 0 5rem -2rem var(--green);
        }
        100% {
          box-shadow: 0 0 5rem -2rem var(--red);
        }
      }

      &:before {
        content: '';
        width: $key-height * 2;
        height: $key-height * 2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: conic-gradient(var(--red), var(--green), var(--blue), var(--red));
        animation: spin 3s 0s linear infinite;

        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      }

      .key-content {
        width: 100%;
        height: 100%;
        background-color: #111;
        position: relative;
        border-radius: calc(var(--radius) * 0.4);
        font-size: 1.1rem;
        top: -0.1rem;

        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        z-index: 1;
        cursor: pointer;
        user-select: none;
        box-shadow: 0 0.2rem rgba(0, 0, 0, 0.6);
        transition: top 0.1s ease-in-out, box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out;

        &.active,
        &:active {
          top: 0;
          box-shadow: 0 0.1rem rgba(0, 0, 0, 0.6);
          background-color: rgba(#111, 0.5);
          //animation: wiggle 0.5s ease-in-out infinite;
        }

        @keyframes wiggle {
          0% {
            transform: translate(0, 0) rotate(0);
          }
          10% {
            transform: translate(-1px, -2px);
          }
          20% {
            transform: translate(2px, 2px);
          }
          30% {
            transform: translate(-1px, -2px);
          }
          40% {
            transform: translate(2px, 1px);
          }
          50% {
            transform: translate(-1px, -2px);
          }
          60% {
            transform: translate(1px, 2px);
          }
          70% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(1px, 2px);
          }
          90% {
            transform: translate(-2px, -1px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes color {
          0% {
            color: var(--red);
          }
          33% {
            color: var(--blue);
          }
          66% {
            color: var(--green);
          }
          100% {
            color: var(--red);
          }
        }
      }
    }
  }
}
</style>
