<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue'
import type {
  Dayjs,
  OpUnitType,
} from 'dayjs'
import dayjs from 'dayjs'
import {
  TransitionPresets,
  useInterval,
  useTransition,
} from '@vueuse/core'
import floor from 'lodash-es/floor'
import {
  WidgetWrapper,
  useWidget,
  useWidgetSize,
} from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import Color from 'color'

const props = defineProps({
  locale: {
    type: String,
    default: 'zh-cn',
    required: false,
  },
  isLunar: {
    type: Boolean,
    default: false,
    required: false,
  },
})
const { widgetData } = useWidget(WidgetData, { loadDataByWidgetName: true })
dayjs.locale('zh-cn')
const progressBackground = computed(() => {
  return new Color(widgetData.value.theme.color).alpha(0.8).hexa()
})
const today = ref(100)
const toWeek = ref(100)
const toMonth = ref(100)
const toYear = ref(100)
const container = ref<HTMLDivElement>()
const options = {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
}
const todayTransition = useTransition(today, options)
const weekTransition = useTransition(toWeek, options)
const monthTransition = useTransition(toMonth, options)
const yearTransition = useTransition(toYear, options)

onMounted(() => {
  const now = dayjs()
  initRenderView(now)

  const dayEnd = now.endOf('day')
  const day = getRatioValue(now, 'day')
  // 每个百分比刷新一次就好
  const daySurplus = 100 - day
  const interval = dayEnd.diff(now) / daySurplus
  intervalRenderView(interval)
})

const { height } = useWidgetSize()

const fontSize = computed(() => {
  return `${(height.value / 134) * 21}px`
})

// 农历 月
// function lunarMonth(now: Dayjs): number {
//   const nowLunar = Lunar.fromDate(now.toDate())
//   // 获取当月天数
//   const monthDay = LunarMonth.fromYm(nowLunar.getYear(), nowLunar.getMonth())
//
//   // 获取当月第一天 转solar
//   const firstDay = Lunar.fromYmd(nowLunar.getYear(), nowLunar.getMonth(), 1).getSolar()
//   // 获取当月最后一天
//   const endDay = Lunar.fromYmd(nowLunar.getYear(), nowLunar.getMonth(), monthDay!.getDayCount()).getSolar()
//
//   const endDate = dayjs(endDay.getCalendar()).endOf('day')
//   const startDate = dayjs(firstDay.getCalendar())
//   const ratio = now.diff(startDate) / endDate.diff(startDate)
//   const value = parseInt(Math.round(Number((1 - ratio) * 100)).toFixed(0))
//   return value
// }

// 农历 月
// function lunarYear(now: Dayjs): number {
//   const nowLunar = Lunar.fromDate(now.toDate())
//   // 获取今年的一月一日即春节
//   const firstDay = Lunar.fromYmd(nowLunar.getYear(), 1, 1).getSolar()
//   // 获取当月第一天 转solar
//   // 获取第二年第一天
//   const endDay = Lunar.fromYmd(nowLunar.getYear() + 1, 1, 1).getSolar()
//   const endDate = dayjs(endDay.getCalendar())
//   const startDate = dayjs(firstDay.getCalendar())
//   const ratio = now.diff(startDate) / endDate.diff(startDate)
//   return parseInt(Math.round(Number((1 - ratio) * 100)).toFixed(0))
// }

// 渲染视图
function initRenderView(now: Dayjs) {
  const day = getRatioValue(now, 'day')
  const week = getRatioValue(now, 'week')

  const month: number = getRatioValue(now, 'month')
  const year: number = getRatioValue(now, 'year')
  today.value = day
  toWeek.value = week
  toMonth.value = month
  toYear.value = year
}

// 计算百分比
function getRatioValue(now: Dayjs, type: OpUnitType): number {
  const start = now.startOf(type)
  const end = now.endOf(type)
  const ratio = now.diff(start) / end.diff(start)
  return Number.parseInt(Math.round(Number((1 - ratio) * 100)).toFixed(0))
}

function formatNumber(num: number) {
  return floor(num).toString().padStart(2, '0')
}

// 定时刷新视图
function intervalRenderView(interval: number) {
  if (interval < 1000) {
    interval = 1000
  }

  useInterval(interval, {
    callback: () => {
      initRenderView(dayjs())
    },
  })
}
</script>

<template>
  <WidgetWrapper>
    <div ref="container" class="time-progress-container" :style="{ fontSize }">
      <div class="header">
        <div class="title">
          时间进度 <span v-if="props.isLunar">(农历)</span>
        </div>
        <div class="decorate" />
      </div>
      <div class="process-group">
        <div class="process-item">
          <div class="desc">
            今天
          </div>
          <div class="process">
            <div class="active today" :style="{ width: `${todayTransition}%` }" />
          </div>
          <div class="percentage">
            {{ formatNumber(todayTransition) }}%
          </div>
        </div>

        <div class="process-item">
          <div class="desc">
            本周
          </div>
          <div class="process">
            <div class="active to-week" :style="{ width: `${weekTransition}%` }" />
          </div>
          <div class="percentage">
            {{ formatNumber(weekTransition) }}%
          </div>
        </div>

        <div class="process-item">
          <div class="desc">
            本月
          </div>
          <div class="process">
            <div class="active to-month" :style="{ width: `${monthTransition}%` }" />
          </div>
          <div class="percentage">
            {{ formatNumber(monthTransition) }}%
          </div>
        </div>

        <div class="process-item">
          <div class="desc">
            今年
          </div>
          <div class="process">
            <div class="active to-year" :style="{ width: `${yearTransition}%` }" />
          </div>
          <div class="percentage">
            {{ formatNumber(yearTransition) }}%
          </div>
        </div>
      </div>
    </div>
  </WidgetWrapper>
</template>

<style scoped lang="scss">
$font-color: #494644;
$border-radius: 12px;
$transition-duration: 125ms;

.time-progress-container {
  overflow: hidden;
  font-size: 21px;
  position: relative;
  width: inherit;
  height: inherit;
  padding: 0 0.38em 0.5em;
  border-radius: var(--widget-border-radius);
  color: var(--widget-color);
  background-color: var(--widget-background-color);
  text-align: left;
  font-family: OPPOSans-Bold;

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
      background-image: url('@/widgets/time-progress/images/time_progress_decorate.svg');
      background-size: cover;
    }
  }

  .process-group {
    overflow: hidden;

    .process-item {
      display: flex;
      height: 0.81em;
      margin: 0.19em 0;
      overflow: hidden;
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
        background-color: v-bind(progressBackground);
        margin: 0 6px;
        border-radius: $border-radius;
        overflow: hidden;

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
