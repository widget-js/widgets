<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppRuntimeInfo } from '@/composition/useAppRuntimeInfo'

const { simpleInfo } = useAppRuntimeInfo()

const { t } = useI18n()
</script>

<template>
  <WidgetBaseDialog :title="t('appInfo')">
    <template #body>
      <div v-if="simpleInfo" class="flex cursor-pointer flex-col items-start">
        <div v-for="key in Object.keys(simpleInfo)" :key="`info-${key}`">
          <b>{{ key }}: </b>{{ simpleInfo[key] }}
        </div>
      </div>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">

</style>
