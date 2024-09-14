<script lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import '@/common/dayjs-extend'
import { useAppBroadcast } from '@widget-js/vue3'
import { SystemApiEvent } from '@widget-js/core'

export default {
  name: 'CountdownWidget',
  props: {
    title: { type: String },
    date: { type: String },
    isLunar: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: Number,
      default: 54,
    },
  },
  setup(props) {
    const days = computed(() => {
      const now = dayjs()
      return dayjs(props.date).diff(now, 'day')
    })
    useAppBroadcast([SystemApiEvent.DATE_CHANGED], () => {
      days.effect.run()
    })
    const fontSizePx = computed(() => {
      return `${props.fontSize}px`
    })
    const titleFontSizePx = computed(() => {
      return `${props.fontSize / 2.8}px`
    })

    const descFontSizePx = computed(() => {
      return `${props.fontSize / 3}px`
    })
    return {
      days,
      titleFontSizePx,
      descFontSizePx,
      fontSizePx,
    }
  },
}
</script>

<template>
  <div class="countdown-widget">
    <span class="title">{{ title }}</span>
    <div class="stack">
      <div class="card" />
      <div class="card" />
      <div class="card" />
      <div class="info">
        <span class="still">{{ days < 0 ? '已经' : '还有' }}</span>
        <span class="days">{{ Math.abs(days) }}</span>
        <span class="unit">天</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.countdown-widget {
  border-radius: var(--widget-border-radius);
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  align-items: center;
  height: 100%;
  background-color: var(--widget-background-color);
  --days-color: color-mix(in srgb, var(--widget-background-color) 10%, black 70%);
  --card-shadow-color: color-mix(in srgb, var(--widget-background-color) 100%, white 80%);
  .title {
    font-size: v-bind(titleFontSizePx);
    color: white;
    font-weight: bold;
  }

  .stack {
    margin-top: 8px;
    width: 100%;
    height: 72%;
    position: relative;

    .card {
      color: white;
      border-radius: 12px;
      width: 100%;
      position: absolute;
      height: 100%;
      background-color: white;
      box-shadow: 0 3px 5px var(--card-shadow-color);

      &:nth-child(1) {
        top: 8px;
      }

      &:nth-child(2) {
        top: 4px;
      }

    }

    .info {
      position: relative;
      padding: 8px;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      justify-items: center;
      display: flex;
      flex-direction: column;

      .still {
        color: #878D9C;
        font-size: v-bind(descFontSizePx);
        padding-bottom: 4px;
        border-bottom: #BEC8DF 2px solid;
      }

      .days {
        font-size: v-bind(fontSizePx);
        color: var(--days-color);
        display: flex;
        align-items: center;
        font-weight: bold;
        flex-grow: 1;
        text-align: center;
        vertical-align: center;
      }

      .unit {
        color: #878D9C;
        font-size: v-bind(descFontSizePx);
      }
    }
  }
}
</style>
