<template>
  <div class="island"
       ref="island">
    <counting-notification v-if="notification.type === 'countdown'" v-bind="notification"/>
    <advance-countdown-notification v-else-if="notification.type === 'advance-countdown'" v-bind="notification"/>
    <reminder-notification v-else-if="notification.type === 'reminder'" :notification="notification"/>
    <phone-call-notification :key="notification.createdAt" ref="phoneCall" v-else-if="notification.type === 'call'"
                             v-bind="notification"/>
    <message-notification v-else v-bind="notification"/>
  </div>
</template>

<script lang="ts">
import AdvanceCountdownNotification from "@/widgets/dynamic-island/components/AdvanceCountdownNotification.vue";
import PhoneCallNotification from "@/widgets/dynamic-island/components/PhoneCallNotification.vue";
import MessageNotification from "@/widgets/dynamic-island/components/MessageNotification.vue";
import CountingNotification from "@/widgets/dynamic-island/components/CountingNotification.vue";
import {computed, nextTick, ref, watch} from "vue";
import CustomUrlNotification from "@/widgets/dynamic-island/components/CustomUrlNotification.vue";
import ReminderNotification from "@/widgets/dynamic-island/components/ReminderNotification.vue";
import {NotificationState} from "@/widgets/dynamic-island/model/NotificationState";
import {useMotion} from "@vueuse/motion";
import {SwipeDirection, useDraggable, useIntervalFn, usePointerSwipe} from "@vueuse/core";
import {AppNotification} from "@widget-js/core";

export default {
  name: "DynamicIslandWidget",
  components: {
    ReminderNotification,
    CustomUrlNotification,
    MessageNotification,
    AdvanceCountdownNotification, CountingNotification, PhoneCallNotification
  },
  emits: ["mouseEnter", "mouseLeave", "update:state"],
  setup(props, context) {
    const container = ref();
    const backgroundColor = ref("black");
    const island = ref<HTMLElement>();
    const phoneCall = ref();
    const maxY = 100;
    const minY = -100;
    const maxWidth = 350;

    const transition = {
      type: 'spring', // 弹簧动画
      stiffness: 300, // 刚度值
      damping: 20,    // 阻尼值
      mass: 1         // 质量
    }

    const hide = {
      y: minY,
      width: 48,
      height: 48,
      scale: 1,
      backgroundColor: backgroundColor,
      transition
    }

    const {apply, motionProperties} = useMotion(island, {
      initial: {...hide,},
      hide,
      tapped: {
        scale: 0.95,
        backgroundColor: backgroundColor,
        transition: {
          ...transition,
          onComplete: () => apply('hovered'),
        }
      },
      hovered: {
        scale: 1,
        backgroundColor: backgroundColor,
        transition
      },
      small: {
        y: maxY - 10,
        width: maxWidth - 32,
        height: 48,
        scale: 1,
        backgroundColor: backgroundColor,
        transition
      },
      normal: {
        y: maxY - 20,
        width: maxWidth,
        height: 72,
        scale: 1,
        backgroundColor: backgroundColor,
        transition
      },
      large: {
        y: maxY,
        width: maxWidth,
        height: 144,
        scale: 1,
        backgroundColor: backgroundColor,
        transition
      },
    });

    const stateModel = computed({
      get: () => {
        return props.state
      },
      set: (value) => {
        apply(value);
        if (value == NotificationState.HIDE) {
          if (phoneCall) {
            phoneCall.value?.stop();
          }
        }
        context.emit('update:state', value);
      }
    })
    let startTranslateY = -100;
    const {distanceY, isSwiping} = usePointerSwipe(island, {
      threshold: 10,
      onSwipeStart(e) {
        startTranslateY = motionProperties['y'];
      },
      async onSwipe(e: PointerEvent) {
        const value = startTranslateY - distanceY.value;
        const y = Math.min(200, value);
        //最小缩放为 maxY的一半，最大缩放为1
        const scale = Math.min(1, Math.max(y, maxY * 0.75) / maxY);
        await apply({
          y,
          scale: scale,
          transition,
        })
      },
      async onSwipeEnd(e: PointerEvent, direction: SwipeDirection) {
        if (motionProperties['y'] < 0) {
          stateModel.value = NotificationState.HIDE;
        } else {
          await apply(stateModel.value)
        }
      },
    });
    return {container, phoneCall, isSwiping, backgroundColor, island, stateModel, apply}
  },
  methods: {},
  async mounted() {
    await nextTick();
    await this.apply(this.state);
  },
  watch: {
    state(newState) {
      this.apply(newState);
    },
    notification: {
      handler(newValue) {
        this.backgroundColor = newValue.backgroundColor;
      },
      deep: true
    },
  },
  computed: {},
  props: {
    notification: {
      type: AppNotification
    },
    state: {
      type: String,
      default: NotificationState.HIDE
    },
  },
}
</script>

<style scoped lang="scss">
$cubic-bezier: cubic-bezier(0, 1, .68, 1.05);
.island {
  -webkit-font-smoothing: antialiased;
  user-select: none;
  cursor: pointer;
  border-radius: 42px;
  display: flex;
  font-size: 2px;
  left: 0;
  right: 0;
  margin: auto;
  background-color: black;
  will-change: width, height;
  clip: auto;
  overflow: hidden;
  justify-content: flex-start;
  box-shadow: (0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08));

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
