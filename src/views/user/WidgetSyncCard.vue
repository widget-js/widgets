<script setup lang="ts">
import type { Widget } from '@widget-js/core'
import { Time } from '@icon-park/vue-next'
import { WidgetApi } from '@widget-js/core'
import { ref } from 'vue'

const props = defineProps<{
  widget: Widget
}>()

const latestSyncAt = ref<string>('')

WidgetApi.getSyncInfo(props.widget.name).then((it) => {
  if (it && it.latestSyncTime) {
    latestSyncAt.value = `${new Date(it.latestSyncTime).toLocaleString()}`
  }
  else {
    latestSyncAt.value = '暂无同步'
  }
})
</script>

<template>
  <el-card shadow="none" body-style="padding: 12px;">
    <div class="flex">
      <div class="flex flex-col">
        <div class="font-bold">
          {{ widget.getTitle() }}
        </div>
        <el-text truncated class="text-sm text-gray-500" style="max-width: 180px">
          {{ widget.name }}
        </el-text>
      </div>
      <div class="ml-auto text-sm text-gray-500 flex gap-1 items-center">
        <Time />{{ latestSyncAt }}
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">

</style>
