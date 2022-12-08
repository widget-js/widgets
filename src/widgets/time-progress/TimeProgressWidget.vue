<template>
  <div class="time-progress-container" ref="container" :style="{fontSize: fontSize}">
    <div class="header">
      <div class="title">时间进度 <span v-if="props.isLunar">(农历)</span></div>
      <div class="decorate"></div>
    </div>
    <div class="process-group">
      <div class="process-item">
        <div class="desc">今天</div>
        <div class="process">
          <div class="active today" :style="{ width: today + '%' }"></div>
        </div>
        <div class="percentage">{{ today }}%</div>
      </div>

      <div class="process-item">
        <div class="desc">本周</div>
        <div class="process">
          <div class="active to-week" :style="{ width: toWeek + '%' }"></div>
        </div>
        <div class="percentage">{{ toWeek }}%</div>
      </div>

      <div class="process-item">
        <div class="desc">本月</div>
        <div class="process">
          <div class="active to-month" :style="{ width: toMonth + '%' }"></div>
        </div>
        <div class="percentage">{{ toMonth }}%</div>
      </div>

      <div class="process-item">
        <div class="desc">今年</div>
        <div class="process">
          <div class="active to-year" :style="{ width: toYear + '%' }"></div>
        </div>
        <div class="percentage">{{ toYear }}%</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref , nextTick, computed, defineProps} from "vue";
import dayjs, { Dayjs, OpUnitType } from "dayjs";
import { useInterval,useWindowSize } from "@vueuse/core";
import { LunarMonth, Lunar } from "lunar-typescript";
require(`dayjs/locale/zh-cn`);
dayjs.locale("zh-cn");

const today = ref(100);
const toWeek = ref(100);
const toMonth = ref(100);
const toYear = ref(100);
const container = ref<HTMLDivElement>();
const props = defineProps({
    locale: {
      type: String,
      default: "zh-cn",
      required: false
    },
    isLunar: {
      type: Boolean,
      default: false,
      required: false
    }
});

// 创建时国际化
(() => {
  dayjs.locale(props.locale);
})();


onMounted(() => {
  const now = dayjs();
  initRenderView(now);

  const dayEnd = now.endOf("day");
  const day = getRatioValue(now, "day");
  // 每个百分比刷新一次就好
  const daySurplus = 100 - day;
  const interval = dayEnd.diff(now) / daySurplus;
  intervalRenderView(interval);
});


const {width, height} = useWindowSize();


let fontSize = computed(() => {
  return (height.value / 134) * 21 + "px";
})

// 农历 月
function lunarMonth(now: Dayjs): number {
  const nowLunar = Lunar.fromDate(now.toDate());
  // 获取当月天数
  const monthDay = LunarMonth.fromYm(nowLunar.getYear(), nowLunar.getMonth());

  // 获取当月第一天 转solar
  const firstDay = Lunar.fromYmd(nowLunar.getYear(), nowLunar.getMonth(), 1).getSolar();
  // 获取当月最后一天
  const endDay = Lunar.fromYmd(nowLunar.getYear(), nowLunar.getMonth(), monthDay!.getDayCount()).getSolar();

  const endDate = dayjs(endDay.getCalendar()).endOf("day");
  const startDate = dayjs(firstDay.getCalendar());
  const ratio = now.diff(startDate) / endDate.diff(startDate);
  const value = parseInt(Math.round(Number((1 - ratio) * 100)).toFixed(0));
  return value;
}

// 农历 月
function lunarYear(now: Dayjs): number {
  const nowLunar = Lunar.fromDate(now.toDate());
  // 获取今年的一月一日即春节
  const firstDay = Lunar.fromYmd(nowLunar.getYear(), 1, 1).getSolar();
  // 获取当月第一天 转solar
  // 获取第二年第一天
  const endDay = Lunar.fromYmd(nowLunar.getYear() + 1, 1, 1).getSolar();
  const endDate = dayjs(endDay.getCalendar());
  const startDate = dayjs(firstDay.getCalendar());
  const ratio = now.diff(startDate) / endDate.diff(startDate);
  const value = parseInt(Math.round(Number((1 - ratio) * 100)).toFixed(0));
  return value;
}

// 渲染视图
function initRenderView(now: Dayjs) {
  const day = getRatioValue(now, "day");
  const week = getRatioValue(now, "week");

  let month: number;
  let year:number;
  if ( props.isLunar ) {
    month = lunarMonth(now);
    year = lunarYear(now);
  } else {
    month = getRatioValue(now, "month");
    year = getRatioValue(now, "year");
  }

  handleChangeValue(today, day);
  handleChangeValue(toWeek, week);
  handleChangeValue(toMonth, month);
  handleChangeValue(toYear, year);
}

// 计算百分比
function getRatioValue(now: Dayjs, type: OpUnitType): number {
  const start = now.startOf(type);
  const end = now.endOf(type);
  const ratio = now.diff(start) / end.diff(start);
  const value = parseInt(Math.round(Number((1 - ratio) * 100)).toFixed(0));
  return value;
}

// 定时刷新视图
function intervalRenderView(interval: number) {
  if (interval < 1000) {
    interval = 1000;
  }
  useInterval(interval, {
    callback: () => {
      initRenderView(dayjs());
    },
  });
}
// 减少值， 主要用于数字倒计时
function handleChangeValue(start: Ref<number>, end: number) {
  const interval = 1250 / (100 - end);
  const { pause } = useInterval(interval, {
    callback: () => {
      if (start.value > end) {
        start.value--;
      } else if (end > start.value) {
        start.value++;
      } else {
        pause();
      }
    },
    controls: true,
  });
}

</script>

<style scoped lang="scss">


$font-color: #494644;
$border-radius: 11px;
$transition-duration: 125ms;
body {
  background: transparent;
  overflow: hidden;
}

.time-progress-container {
  font-size: 21px;
  overflow: hidden;
  position: relative;
  width: inherit;
  height: inherit;
  padding: 0 0.38em 0.5em;
  border-radius: 0.5em;
  background-color: #ffffff;
  text-align: left;
  font-family: OPPOSans-Bold;
  color: $font-color;

  .header {
    position: relative;
    height: 1.71em;
    display: flex;
    align-items: center;

    .title {
      position: absolute;
      font-size: 0.76em;
      // left: 0.5em;
      font-weight: bold;
    }

    .decorate {
      position: absolute;
      height: 1.71em;
      width: 3.52em;
      right: 8px;
      background-image: url("~@/widgets/time-progress/images/time_progress_decorate.svg");
      background-size: cover;
    }
  }

  .process-group {
    overflow: hidden;
    .process-item {
      display: flex;
      height: 0.81em;
      margin: 0.19em 0;
      flex-direction: row;
      align-items: center;

      .desc {
        width: 2.1em;
        font-size: 0.57em;
        font-weight: bold;
      }

      .process {
        flex: 1;
        height: 0.5em;
        text-align: right;
        background-color: #e2e2e2ff;
        margin: 0 7px;
        border-radius: $border-radius;

        .active {
          width: 100%;
          height: 100%;
          margin-left: auto;
          border-radius: $border-radius;
          // transition: width linear $transition-duration;
        }
      }

      .percentage {
        width: 2.5em;
        text-align: center;
        font-size: 0.57em;
        font-weight: bold;
      }
    }

    .today {
      background-color: #ff8e55ff;
    }

    .to-week {
      background-color: #ff5594ff;
    }

    .to-month {
      background-color: #bb55ffff;
    }

    .to-year {
      background-color: #6055ffff;
    }
  }
}
</style>
