<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useMotion } from '@vueuse/motion'
import { usePointerSwipe } from '@vueuse/core'
import {
  AppNotification,
  BrowserWindowApi,
} from '@widget-js/core'
import AdvanceCountdownNotification from '@/widgets/dynamic-island/components/AdvanceCountdownNotification.vue'
import PhoneCallNotification from '@/widgets/dynamic-island/components/PhoneCallNotification.vue'
import MessageNotification from '@/widgets/dynamic-island/components/MessageNotification.vue'
import CountingNotification from '@/widgets/dynamic-island/components/CountingNotification.vue'
import ReminderNotification from '@/widgets/dynamic-island/components/ReminderNotification.vue'
import { NotificationState } from '@/widgets/dynamic-island/model/NotificationState'

const props = defineProps({
  notification: {
    type: AppNotification,
    required: true,
  },
  state: {
    type: String,
    default: NotificationState.HIDE,
  },
  preview: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['mouseEnter', 'mouseLeave', 'update:state'])

const backgroundColor = ref('black')
const island = ref<HTMLElement>()
const phoneCall = ref()
const maxY = 100
const minY = -100
const maxWidth = 350
const padding = 8 + 8
const paddingHorizontal = 24

const transition = {
  type: 'spring', // 弹簧动画
  stiffness: 300, // 刚度值/弹性系数
  damping: 20, // 阻尼值
  mass: 1, // 质量
}

function getSize(size: number) {
  return size + padding
}

const hide = {
  y: minY,
  width: getSize(48),
  height: getSize(48),
  scale: 1,
  backgroundColor,
  transition,
}

const islandHide = {
  width: 48,
  scale: 1,
  backgroundColor,
  transition,
}

const { apply: applyIsland } = useMotion(island, {
  initial: { ...islandHide },
  hide: islandHide,
  tapped: {
    scale: 0.95,
    backgroundColor,
    transition: {
      ...transition,
      onComplete: () => applyIsland('hovered'),
    },
  },
  hovered: {
    scale: 1,
    backgroundColor,
    transition,
  },
  small: {
    width: maxWidth - paddingHorizontal - 16,
    scale: 1,
    backgroundColor,
    transition,
  },
  normal: {
    width: maxWidth - paddingHorizontal,
    scale: 1,
    backgroundColor,
    transition,
  },
  large: {
    width: maxWidth - paddingHorizontal,
    scale: 1,
    backgroundColor,
    transition,
  },
})

const {
  apply,
  motionProperties,
} = useMotion(null, {
  initial: { ...hide },
  hide,
  small: {
    y: maxY - 20,
    height: getSize(48),
    scale: 1,
    transition,
  },
  normal: {
    y: maxY - 20,
    height: getSize(72),
    scale: 1,
    transition,
  },
  large: {
    y: maxY,
    height: getSize(144),
    scale: 1,
    transition,
  },
})
watch(
  () => [motionProperties.y, motionProperties.height],
  ([newY, height]) => {
    BrowserWindowApi.setBounds({
      y: newY,
      x: (screen.width - maxWidth) / 2,
      width: maxWidth,
      height,
    })
  },
)

const stateModel = computed({
  get: () => {
    return props.state
  },
  set: (value) => {
    if (value == NotificationState.HIDE) {
      if (phoneCall.value) {
        phoneCall.value?.stop()
      }
    }
    emits('update:state', value)
  },
})

watch(stateModel, (value) => {
  if (!props.preview) {
    apply(value)
    applyIsland(value)
  }
})
let startTranslateY = -100
const { distanceY } = usePointerSwipe(island, {
  threshold: 10,
  onSwipeStart() {
    startTranslateY = motionProperties.y
  },
  async onSwipe() {
    const value = startTranslateY - distanceY.value
    const y = Math.min(500, value)
    // 最小缩放为 maxY的0.75，最大缩放为1
    const scale = Math.min(1, Math.max(y, maxY * 0.75) / maxY)
    await apply({
      y,
      scale,
      transition,
    })
  },
  async onSwipeEnd() {
    if (motionProperties.y < 30) {
      stateModel.value = NotificationState.HIDE
    }
    else {
      await apply(stateModel.value)
    }
  },
})

watch(
  () => props.notification,
  (newValue) => {
    if (newValue && newValue.backgroundColor) {
      backgroundColor.value = newValue.backgroundColor
    }
  },
)

onMounted(async () => {
  await nextTick()
  await apply(props.state)
})
</script>

<template>
  <div ref="island" class="island">
    <CountingNotification v-if="notification.type === 'countdown'" v-bind="notification" />
    <AdvanceCountdownNotification v-else-if="notification.type === 'advance-countdown'" v-bind="notification" />
    <ReminderNotification v-else-if="notification.type === 'reminder'" :notification="notification" />
    <PhoneCallNotification
      v-else-if="notification.type === 'call'"
      :key="notification.createdAt"
      ref="phoneCall"
      :mute="preview"
      v-bind="notification"
    />
    <MessageNotification v-else v-bind="notification" />
  </div>
</template>

<style scoped lang="scss">
$cubic-bezier: cubic-bezier(0, 1, 0.68, 1.05);
.island {
  -webkit-font-smoothing: antialiased;
  user-select: none;
  cursor: pointer;
  border-radius: 42px;
  display: flex;
  font-size: 2px;
  top: 0;
  left: 8px;
  right: 0;
  margin: auto;
  position: absolute;
  height: calc(100% - 16px);
  background-color: black;
  will-change: width, height;
  clip: auto;
  overflow: hidden;
  transition-property: width, height;
  justify-content: flex-start;
  box-shadow: (0px 4px 4px 4px rgba(0, 0, 0, 0.04), 0px 4px 6px rgba(0, 0, 0, 0.08));

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    left: 0;
    top: 0;
    background-color: black;
  }
}
</style>
