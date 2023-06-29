<template>
  <div class="root">
    <div ref="container" class="clock-container" :style="{
          backgroundColor:backgroundColor,
       width:`${width}px`,
       height:`${height}px`
       }">
      <div :class="{circles:true,...fillClass}">
        <div :class="{center:true,'white-bg':true,}"/>
        <img class="center" src="./images/clock_bg.png" alt="">
        <img ref="hour" class="center hour tick" :style="{
      transform:  'rotate('+ hourDeg +'deg)',
    }" src="./images/clock_hand_hour.png" alt="">
        <img ref="minute" class="center minute tick" :style="{
      transform:  'rotate('+ minuteDeg +'deg)',
    }" src="./images/clock_hand_minute.png" alt="">
        <img ref="startSecondDeg" class="center second" :style="{
      transform: 'rotate('+ secondDeg +'deg)',
    }" src="./images/clock_hand_second.png" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {nextTick, ref} from "vue";
import {TransitionPresets, useInterval, useTransition} from '@vueuse/core'
import dayjs from "dayjs";
import {delay} from "lodash";

export default {
  name: "ClockWidget",
  props: {
    backgroundColor: {
      type: String,
      default: "#333"
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
  },
  async mounted() {
    await nextTick()
  },
  setup() {
    const secondDeg = ref(0);
    const hourDeg = ref(0);
    const minuteDeg = ref(0);
    const firstShot = ref(true);

    const calAddDeg = (current: number, max: number, previousDeg: number, deg: number) => {
      if (current == 0) current = max;
      const previous = previousDeg / deg;
      if (previous == current) return 0;
      let addDeg = (current - previous % max) * deg;
      return addDeg % 360;
    }

    const getHour = () => {
      const hour = dayjs().hour();
      return hour > 12 ? hour - 12 : hour;
    }

    const updateTime = () => {
      const now = dayjs();
      const second = now.second();
      const minute = now.minute();
      secondDeg.value = secondDeg.value + calAddDeg(second, 60, secondDeg.value, 6);
      minuteDeg.value = (minute / 60 * 360);
      hourDeg.value = (getHour() / 12 * 360);
    }

    useInterval(1000, {
          callback: (counter) => {
            updateTime();
          }
        }
    )
    return {firstShot, minuteDeg, hourDeg, secondDeg, updateTime, getHour}
  },
  computed: {
    fillClass() {
      if (this.width > this.height) {
        return {"fill-height": true, "fill-width": false}
      }
      return {"fill-height": false, "fill-width": true}
    }
  }
}


</script>

<style lang="scss" scoped>
//背景设置为透明，并隐藏滚动条
body * {
  background: transparent;
  overflow: hidden;
  user-select: none;
}

.clock-container {
  overflow: hidden;
  background-color: black;
  border-radius: 20px;
  height: 100%;
  position: relative;
  width: 100%;

  img {
    transform: scale(0.9);
    pointer-events: none;
  }

  .circles.fill-width > * {
    width: 100%;
    aspect-ratio: 1;
  }

  .circles.fill-height > * {
    height: 100%;
    aspect-ratio: 1;
  }

  .center {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }

  .tick {
    transition-duration: 1s;
    transition-property: transform;
    transition-timing-function: ease-out;
  }

  .second {
    transition-duration: 0s;
    transition-timing-function: linear;
  }

  .white-bg {
    background-color: white;
    background-position: center;
    border-radius: 50%;
    transform: scale(0.9);
  }

}


</style>
