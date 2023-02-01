<template>
  <div
      class="wave-progress-container"
      ref="containerRef"
      :style="{ fontSize: fontSize, backgroundColor: backgroundColors[0], height: height + 'px', width: width + 'px', borderRadius: $props.extra?.borderRadius + 'px' }"
  >
    <div class="tips">
      <div class="title">{{ title }}</div>
      <div class="desc">剩余</div>
    </div>

    <canvas
        ref="canvasRef"
        class="wave-canvas"
        :width="cbWidth"
        :height="cbHeight"
        :style="{ backgroundColor: backgroundColors[0], height: cbHeight + 'px', width: cbWidth + 'px' }"
    ></canvas>
    <div class="percentage">{{ 100 - floor(transitionRation, 0) }}%</div>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, ref} from "vue";
import dayjs, {Dayjs} from "dayjs";
import {TransitionPresets, useInterval, useTransition, useWindowSize} from "@vueuse/core";
import {Lunar, LunarMonth} from "lunar-typescript";
import {ProgressType} from "./model/WaveProgressData";
import Color from "color";
import {delay, floor} from 'lodash'

dayjs.locale("zh-cn");

const ratio = ref(1);
const {width, height} = useWindowSize();

const canvasRef = ref<HTMLCanvasElement>();
const containerRef = ref<HTMLDivElement>();

const cbHeight = ref(0);
const cbWidth = ref(0);

const props = defineProps({
  locale: {
    type: String,
    default: "zh-cn",
    required: false,
  },
  progressType: {
    type: Number,
    default: 0
  },
  eventName: {
    type: String,
    default: "今天"
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  isLunar: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String
  }
});

const backgroundColors = computed(() => {
  const hex = props.backgroundColor;
  let color = hex;
  if (!color) {
    switch (props.progressType) {
      case ProgressType.today:
        color = "#ff5594ff";
        break;
      case ProgressType.toWeek:
        color = "#ff8e55ff";
        break;
      case ProgressType.toMonth:
        color = "#bb55ffff";
        break;
      case ProgressType.toYear:
        color = "#6055ffff";
        break;
      default:
        color = "#ff8e55ff";
    }
  }
  const colorValue = Color(color);
  return [0.4, 0.8, 0.9, 0.95].map((item) => colorValue.alpha(item).string());
});
const currentHeight = ref(0);
const transitionCurrentHeight = useTransition(currentHeight, {
  duration: 1000,
  transition: TransitionPresets.easeOutBack
});

const onInitCanvas = () => {
  nextTick(() => {
    const ctx = canvasRef.value!.getContext("2d")!; // height: number = canvas.offsetHeight,
    // width: number = width.value

    let step: number = 0;
    // 动起来
    const loop = function () {
      step++;
      const lines: string[] = [backgroundColors.value[1] + backgroundColors.value[2], backgroundColors.value[3]];
      // const offset = parseInt(fontSize.value) / 2;

      const boxHeight = (cbHeight.value = containerRef.value?.offsetHeight ?? 158);
      const boxWidth = (cbWidth.value = containerRef.value?.offsetWidth ?? 58);
      currentHeight.value = (boxHeight * ratio.value) / 100;

      ctx.clearRect(0, 0, boxWidth, boxHeight);
      // 画三个不同颜色的矩阵
      for (let j = lines.length - 1; j >= 0; j--) {
        // 每个矩阵的角度都不同，每个之间相差100度
        const angle: number = ((step + j * 100) * Math.PI) / 180;
        const deltaHeight: number = Math.sin(angle) * 20;
        ctx.fillStyle = backgroundColors.value[j];
        ctx.beginPath(); // 开始绘制
        ctx.moveTo(0, transitionCurrentHeight.value);
        const relativeX: number = boxWidth / 4;

        // const sinX = Math.sin(relativeX);
        ctx.bezierCurveTo(
            relativeX,
            transitionCurrentHeight.value - deltaHeight,
            boxWidth - relativeX,
            transitionCurrentHeight.value + deltaHeight,
            boxWidth,
            transitionCurrentHeight.value
        );
        ctx.lineTo(boxWidth, boxHeight);
        ctx.lineTo(0, boxHeight);
        ctx.fill(); // 上色
        ctx.closePath(); // 结束绘制
      }
      requestAnimationFrame(loop); // 启动函数
    };

    loop();
  });
};

const refresh = async () => {
  await nextTick();
  dayjs.locale(props.locale);
  const now = dayjs();
  initRenderView(now);

  const dayEnd = now.endOf("day");
  const day = getRatioValue(now, props.progressType);
  // 每个百分比刷新一次就好
  const daySurplus = 100 - day;
  const interval = dayEnd.diff(now) / daySurplus;
  intervalRenderView(interval);
}

onMounted(async () => {
  delay(async () => {
    await refresh();
  }, 500)
  onInitCanvas();
});

const fontSize = computed(() => {
  return Math.min(width.value / 76, height.value / 134, (containerRef.value?.offsetWidth ?? 58) / 76) * 21 + "px";
});

// 渲染视图
function initRenderView(now: Dayjs) {
  ratio.value = getRatioValue(now, props.progressType);
}

const transitionRation = useTransition(ratio, {
  duration: 1000,
  transition: TransitionPresets.easeOutCubic
});

const title = computed(() => {
  switch (props.progressType) {
    case ProgressType.today:
      return "今天";
    case ProgressType.toWeek:
      return "本周";
    case ProgressType.toMonth:
      return "本月";
    case ProgressType.toYear:
      return "今年";
    default:
      return props.eventName;
  }
})

// 计算百分比
const getRatioValue = (now: Dayjs, progressType: ProgressType): number => {
  let start: Dayjs;
  let end: Dayjs;
  switch (progressType) {
    case ProgressType.today:
      start = now.startOf("day");
      end = now.endOf("day");
      break;
    case ProgressType.toWeek:
      start = now.startOf("week");
      end = now.endOf("week");
      break;
    case ProgressType.toMonth:
      if (props.isLunar) {
        const nowLunar = Lunar.fromDate(now.toDate());
        const monthDay = LunarMonth.fromYm(nowLunar.getYear(), nowLunar.getMonth());
        const firstDay = Lunar.fromYmd(nowLunar.getYear(), nowLunar.getMonth(), 1).getSolar();
        const endDay = Lunar.fromYmd(nowLunar.getYear(), nowLunar.getMonth(), monthDay!.getDayCount()).getSolar();
        start = dayjs(firstDay.getCalendar());
        end = dayjs(endDay.getCalendar()).endOf("day");
      } else {
        start = now.startOf("month");
        end = now.endOf("month");
      }

      break;
    case ProgressType.toYear:
      if (props.isLunar) {
        const nowLunar = Lunar.fromDate(now.toDate());
        const firstDay = Lunar.fromYmd(nowLunar.getYear(), 1, 1).getSolar();
        const endDay = Lunar.fromYmd(nowLunar.getYear() + 1, 1, 1).getSolar();
        end = dayjs(endDay.getCalendar());
        start = dayjs(firstDay.getCalendar());
      } else {
        start = now.startOf("year");
        end = now.endOf("year");
      }
      break;
    case ProgressType.custom:
      start = startDate.value;
      end = endDate.value;
      break;
    default:
      start = now.startOf("day");
      end = now.endOf("day");
  }
  if (start.isAfter(now) || start.isAfter(end)) {
    return 0;
  }

  const ratio = now.diff(start) / end.diff(start);
  return parseInt(Math.round(Number(ratio * 100)).toFixed(0));
}

const startDate = computed(() => {
  return dayjs(props.startDate)
});

const endDate = computed(() => {
  return dayjs(props.endDate)
});
// 定时刷新视图
const intervalRenderView = (interval: number) => {
  if (interval < 1000) {
    interval = 1000;
  }
  useInterval(interval, {
    callback: () => {
      initRenderView(dayjs());
    },
  });
}

defineExpose({
  refresh,
});
</script>

<style scoped lang="scss">
body {
  background: transparent;
  overflow: hidden;
}

.wave-progress-container {
  font-size: 21px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 5em;
  // padding: 0 0.38em 0.5em;
  border-radius: 0.5em;
  background-color: #ffffff;
  text-align: left;
  font-family: Roboto-Medium, "Microsoft YaHei", serif;
  color: #494644;

  .tips {
    text-align: center;
    margin-top: 0.67em;
    z-index: 10;

    .title {
      color: #fff;
      font-size: 0.95em;
      line-height: 1.17em;
    }

    .desc {
      color: #fff;
      font-size: 0.57em;
    }
  }

  .wave-canvas {
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    width: inherit;
    border-radius: inherit;
  }

  .percentage {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 1.14em;
    bottom: 8px;
    color: #fff;
    z-index: 9;
  }
}
</style>
