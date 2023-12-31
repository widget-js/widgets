<script lang="ts">
import {
  nextTick,
  ref,
} from 'vue'
import { useMotion } from '@vueuse/motion'

export default {
  name: 'TextSwitcher',
  props: {
    text: {
      type: String,
      default: '',
    },
    fontSize: {
      type: Number,
      default: 18,
    },
  },
  setup(props) {
    const textSpan1 = ref()
    const textSpan2 = ref()
    const text1 = ref()
    const text2 = ref()

    const transition = {
      duration: 300,
      type: 'keyframes',
      ease: 'easeOut',
    }

    const variants = {
      initial: {
        y: -props.fontSize,
        opacity: 0,
        transition: { duration: 1 },
      },
      fadeIn: {
        y: 0,
        opacity: 1,
        transition: { ...transition },
      },
    }

    const fadeOut = (completeCallback: () => void) => {
      return {
        y: props.fontSize,
        opacity: 0,
        transition: {
          ...transition,
          onComplete: () => {
            completeCallback()
          },
        },
      }
    }

    const { apply: textApply1 } = useMotion(textSpan1, {
      ...variants,
      fadeOut: fadeOut(() => {
        textApply1('initial')
      }),
    })

    const { apply: textApply2 } = useMotion(textSpan2, {
      ...variants,
      fadeOut: fadeOut(() => {
        textApply2('initial')
      }),
    })

    const toggle = ref(true)
    return {
      textApply2,
      textSpan1,
      textSpan2,
      toggle,
      text1,
      text2,
      textApply1,
    }
  },
  watch: {
    text(newValue) {
      if (this.toggle) {
        this.text1 = newValue
        this.textApply1('fadeIn')
        this.textApply2('fadeOut')
      }
      else {
        this.text2 = newValue
        this.textApply1('fadeOut')
        this.textApply2('fadeIn')
        // this.text2 = newValue;
        // this.textApply2("fadeIn")
        // this.textApply2("fadeOut")
      }
      this.toggle = !this.toggle
    },
  },
  async mounted() {
    await nextTick()
    this.text1 = this.text
    await this.textApply1('fadeIn')
  },
}
</script>

<template>
  <div class="text-switcher">
    <!--    定位宽度用   -->
    <span :style="{ fontSize: `${fontSize}px`, visibility: 'hidden' }">{{ text1 }}</span>
    <span ref="textSpan1" class="text-1" :style="{ fontSize: `${fontSize}px` }">{{ text1 }}</span>
    <span ref="textSpan2" class="text-2" :style="{ fontSize: `${fontSize}px` }">{{ text2 }}</span>
  </div>
</template>

<style scoped lang="scss">
.text-switcher {
  position: relative;

  .text-2, .text-1 {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
