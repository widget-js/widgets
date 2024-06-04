<script lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import '@/common/dayjs-extend'
import Color from 'color'
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
    backgroundColor: {
      type: String,
      default: '#FFC455',
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
    const daysColor = computed(() => {
      const color = new Color(props.backgroundColor)
      return color.alpha(1).darken(0.7).toString()
    })

    const shadowColor = computed(() => {
      const color = new Color(props.backgroundColor)
      return color.lighten(0.2).alpha(0.5).toString()
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
      daysColor,
      titleFontSizePx,
      descFontSizePx,
      shadowColor,
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
  background-color: var(--widget-background-color);

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
      box-shadow: 0 3px 5px v-bind(shadowColor);

      &:nth-child(1) {
        top: 8px;
      }

      &:nth-child(2) {
        top: 4px;
      }

    }

    .info {
      position: absolute;
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
        color: v-bind(daysColor);
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
