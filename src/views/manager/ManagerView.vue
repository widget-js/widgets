<script setup lang="ts">
import { WidgetBaseDialog } from '@widget-js/vue3'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import DeployedWidgetList from '@/views/manager/DeployedWidgetList.vue'

const { t } = useI18n()
const { height } = useWindowSize()
</script>

<template>
  <WidgetBaseDialog :body-padding="0" :title="t('manager.windowTitle')">
    <template #body>
      <el-scrollbar :height="height - 58">
        <DeployedWidgetList />
      </el-scrollbar>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">

</style>
