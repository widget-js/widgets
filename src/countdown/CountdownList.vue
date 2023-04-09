<template>
  <widget-base-dialog title="事项设置">
    <template #main></template>
  </widget-base-dialog>
</template>

<script lang="ts" setup>
import { WidgetApi } from '@widget-js/core'

const store = WidgetApi.getStore('cn.widgetjs.widgets.countdown-list')
</script>

<style scoped lang="scss">
.main {
  min-height: 500px;
}
</style>
