<script lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'

export default {
  name: 'VoiceBar',
  props: {
    backgroundColor: {
      type: String,
      default: '#86D98A',
    },
  },
  setup() {
    const foregroundHeight = ref(100)
    const backgroundHeight = ref(100)

    return {
      foregroundHeight,
      backgroundHeight,
    }
  },
  mounted() {
    useIntervalFn(() => {
      this.foregroundHeight = this.getRandomArbitrary(10, 50)
      this.backgroundHeight = this.getRandomArbitrary(10, 100)
    }, 200)
  },
  methods: {
    getRandomArbitrary: (min, max) => {
      return Math.random() * (max - min) + min
    },
  },
}
</script>

<template>
  <div class="voice-bar">
    <span class="background" :style="{ transform: `scaleY(${backgroundHeight}%)`, backgroundColor }" />
    <span class="foreground" :style="{ transform: `scaleY(${foregroundHeight}%)` }" />
  </div>
</template>

<style scoped lang="scss">
.voice-bar {
  position: relative;
  width: 2px;
  height: 20px;

  .foreground, .background {
    width: 100%;
    border-radius: 6px;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    transition-property: transform;
    transition-duration: 0.5s;
  }

  .foreground {
    width: 2px;
    background-color: white;
  }

  .background {
    background-color: #86D98A;
  }
}
</style>
