<template>
  <div class="water-reminder" @mouseenter="showControl = true" @mouseleave="showControl = false">
    <div class="circle">
      <canvas id="canvas" :width="width" :height="height" ref="canvas"></canvas>
      <span class="text">{{ cupModel }}/{{ targetCup }}</span>
      <div class="border"></div>
    </div>
    <span class="title">每天{{ targetCup }}杯水</span>
    <div class="btn reset" @click="reset" v-show="showControl">
      <refresh theme="outline" :fill="color" />
    </div>
    <div class="btn add" @click="add" v-show="showControl">
      <plus theme="outline" :fill="color" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@icon-park/vue-next/styles/index.css'
import { computed, ref, watch } from 'vue'
import { WaveBall } from '@/widgets/water-reminder/model/WaveBall'
import { TransitionPresets, useElementSize, useTransition } from '@vueuse/core'
import { Plus, Refresh } from '@icon-park/vue-next'
import Color from 'color'

const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'white'
  },
  color: {
    type: String,
    default: '#2596FF'
  },
  cup: {
    type: Number,
    default: 0
  },
  targetCup: {
    type: Number,
    default: 8
  }
})
const emits = defineEmits(['update:cup'])
const cupModel = computed({
  get: () => {
    return props.cup
  },
  set: (value) => {
    emits('update:cup', value)
  }
})
const showControl = ref(false)

watch(
  () => props.color,
  () => {
    init()
  }
)

const canvas = ref<HTMLCanvasElement>()
const { width, height } = useElementSize(canvas)
const waveBall = new WaveBall({
  color: props.color
})
let ctx: CanvasRenderingContext2D
let frameId = -1
watch(width, (newValue) => {
  if (newValue > 0) {
    init()
    cancelAnimationFrame(frameId)
    step()
  }
})

const progress = computed(() => {
  return (currentCupTransition.value / props.targetCup) * 100
})
const currentCupTransition = useTransition(cupModel, { transition: TransitionPresets.easeOutCubic })
const init = () => {
  const canvas = document.getElementById('canvas')
  // @ts-ignore
  ctx = canvas.getContext('2d')
  waveBall.size = width.value
  waveBall.x = width.value / 2
  waveBall.y = width.value / 2
  waveBall.progress = progress.value
  waveBall.color = waveColor.value
  waveBall.render(ctx)
}

const step = function () {
  frameId = requestAnimationFrame(step)
  ctx.clearRect(0, 0, waveBall.size, waveBall.size)
  // waveBall.progress 100;
  waveBall.update(progress.value)
}

const add = () => {
  cupModel.value++
}

const reset = () => {
  cupModel.value = 0
  init()
}

const circleBorderColor = computed(() => {
  const color = new Color(props.color)
  return color.alpha(0.5).toString()
})

const waveColor = computed(() => {
  const color = new Color(props.color)
  return color.alpha(0.5).toString()
})

const shadowColor = computed(() => {
  const color = new Color(props.color)
  return color.alpha(0.5).toString()
})

const textColor = computed(() => {
  const color = new Color(props.color)
  return color.darken(0.8).toString()
})
</script>

<style scoped lang="scss">
.water-reminder {
  border-radius: 22px;
  width: 100%;
  height: 100%;
  background-color: v-bind(backgroundColor);

  .circle {
    height: 70%;
    width: 70%;
    position: relative;
    left: 15%;
    top: 10%;

    .border {
      border-radius: 50%;
      width: 100%;
      aspect-ratio: 1;
      border: 4px solid v-bind(circleBorderColor);
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      position: absolute;
    }

    #canvas {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .text {
      font-family: 'OPPOSans', 'Microsoft YaHei', Monospace, serif;
      font-style: normal;
      font-weight: 500;
      font-size: 2rem;
      line-height: 32px;
      color: v-bind(textColor);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .btn {
    position: relative;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background-color: rgba(255, 255, 255);
    box-shadow: 0 0 5px v-bind(shadowColor);
    bottom: 1.2rem;

    &.reset {
      position: absolute;
      left: 1.2rem;
    }

    &.add {
      position: absolute;
      right: 1.2rem;
      font-size: 1.2rem;
    }
  }

  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 21px;
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    text-align: center;
    color: v-bind(textColor);
  }
}
</style>
