<script setup lang="ts">
import { FileFailed } from '@icon-park/vue-next'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { WidgetApi } from '@widget-js/core'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const route = useRoute()
const { t } = useI18n()
const hasNetwork = computed(() => {
  const errorCode = route.query.errorCode
  if (errorCode == '-106' || errorCode == '-105') {
    return false
  }
  return true
})
const desc = computed(() => {
  if (!hasNetwork.value) {
    return t('network.offline')
  }
  return route.query.errorDescription
})
//
// useEventListener('online', () => {
//   WidgetApi.reload()
// })
const axiosIns = axios.create({
  timeout: 3000,
})
useIntervalFn(() => {
  axiosIns.get('https://baidu.com').then(() => {
    WidgetApi.reload()
  })
}, 3000)
</script>

<template>
  <widget-wrapper>
    <div class="failed">
      <FileFailed size="32" />
      <div>{{ t('network.failed', { msg: route.query.errorCode }) }}</div>
      <p class="desc">
        {{ desc }}
      </p>
    </div>
  </widget-wrapper>
</template>

<style scoped lang="scss">
.failed {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.48);
  border-radius: var(--widget-border-radius);
  display: flex;
  place-items: center;
  font-size: 14px;
  flex-direction: column;
  place-content: center;
  gap: 8px;
  color: var(--widget-color);
  overflow: hidden;
  overflow-wrap: break-word;

  .desc {
    color: var(--widget-color);
    font-size: 12px;
    opacity: 0.5;
    overflow-wrap: break-word;
  }
}
</style>
