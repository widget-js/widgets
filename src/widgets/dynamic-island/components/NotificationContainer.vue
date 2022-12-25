<template>
  <div class="container" ref="container" :class="{'mouse-down':mouseDown}">
    <div :class="{
      island:true,
    show:show,
    hide:!show,
      'small':isSmall
    }"
         ref="island"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave"
         @mousedown.left="mouseDown = true" @mouseup.left="mouseDown = false"
         :style="{...sizeStyle}">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {NotificationSize, useNotificationStore} from "../store/notification-store";
import type {SwipeDirection} from '@vueuse/core'
import {usePointerSwipe, useTransition} from '@vueuse/core'
import {BrowserWindowApi} from "@widget-js/core";

const notificationStore = useNotificationStore();

const props = defineProps({
  backgroundColor: {
    type: String,
    default: "black"
  },
  show: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "DEFAULT"
  }
})

const maxY = 50;
const minY = -100;

const mouseDown = ref(false)
const container = ref(null)
const island = ref(null)
const translateY = ref(minY)
const swiping = ref(false);
let startTranslateY = -100;
const {distanceY, isSwiping} = usePointerSwipe(island, {
  onSwipeStart() {
    startTranslateY = translateY.value
    swiping.value = true;
  },
  onSwipe(e: PointerEvent) {
    const value = startTranslateY - distanceY.value;
    translateY.value = value > 200 ? 200 : value;
  },
  onSwipeEnd(e: PointerEvent, direction: SwipeDirection) {
    swiping.value = false;
    if (translateY.value > maxY || translateY.value > -20) {
      translateY.value = maxY;
    } else {
      notificationStore.hideNotification()
    }
  },
})

const isSmall = computed(() => {
  return props.size === NotificationSize.SMALL;
})

const height = computed(() => {
  if (!props.show) return 48;
  if (props.size == NotificationSize.SMALL) {
    return 48
  } else if (props.size == NotificationSize.DEFAULT) {
    return 72
  } else {
    return 144
  }
})

const sizeStyle = computed(() => {
  return {
    width: props.show ? `350px` : `50px`,
    backgroundColor: props.backgroundColor,
    height: `${height.value}px`
  };
});

watch(() => props.show, (newValue, oldValue) => {
  console.log(newValue)
  if (newValue) {
    translateY.value = maxY
  } else {
    translateY.value = minY
  }
})

// transform:`translateY(${outTranslateY}px)`
const outTranslateY = useTransition(translateY, {
  duration: 800,
  transition: [0, 1, .68, 1.05],
  disabled: swiping
})

const onMouseEnter = async () => {
  console.info("onMouseEnter")
  await BrowserWindowApi.setIgnoreMouseEvent(false)
  notificationStore.clearHideTimeout();
}

const onMouseLeave = async () => {
  console.info("onMouseLeave")
  await BrowserWindowApi.setIgnoreMouseEvent(true)
  notificationStore.setHideTimeout();
}

</script>

<style scoped lang="scss">

$cubic-bezier: cubic-bezier(0, 1, .68, 1.05);
.container {
  justify-content: center;
  display: flex;
  user-select: none;

  &.mouse-down {
    //transform: scale(0.98);
  }

  .island {
    cursor: pointer;
    border-radius: 2.5rem;
    margin: 1rem;
    background-color: black;
    display: flex;
    font-size: 2px;
    transition-property: width, height;
    transition-duration: 0.8s;
    transition-timing-function: $cubic-bezier;
    will-change: width, height;
    clip: auto;
    overflow: hidden;
    justify-content: flex-start;

    &.small {
      border-radius: 2.5rem;
    }

    &.show {
      box-shadow: (0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08));
      //animation-name: pop-down;
    }

    &.hide {
      //animation-name: pop-up;
      box-shadow: none;
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
        font-size: 0.8em;
        color: rgba(255, 255, 255, 0.6);
      }

      .description {
        color: white;
        font-size: 1em;
      }
    }

    .actions {
      display: flex;
      justify-content: flex-start;
    }
  }
}
</style>
