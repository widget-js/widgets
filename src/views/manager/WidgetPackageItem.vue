<script setup lang="ts">
import type { PropType } from 'vue'
import type { WidgetPackage } from '@widget-js/core'
import { useI18n } from 'vue-i18n'

defineProps({
  widgetPackage: {
    type: Object as PropType<WidgetPackage>,
    required: true,
  },
})

const emits = defineEmits(['uninstall'])

const { t } = useI18n()
</script>

<template>
  <ElCard shadow="hover" body-style="padding:12px">
    <div class="flex">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col text-start">
          <div v-if="widgetPackage">
            <b>{{ t('settings.widgetPackage.title') }}</b>{{ widgetPackage.getTitle() }}
          </div>
          <div class="flex gap-6">
            <span><b>{{ t('settings.widgetPackage.name') }}</b>{{ widgetPackage.name }}</span>
          </div>
          <div class="flex">
            <div><b>{{ t('settings.widgetPackage.installPath') }}</b></div><el-text truncated style="max-width: 600px">
              {{ widgetPackage.url }}
            </el-text>
          </div>
        </div>
      </div>
      <div class="ml-auto flex items-center">
        <el-popconfirm
          :cancel-button-text="t('settings.widgetPackage.cancel')"
          width="200"
          :confirm-button-text="t('settings.widgetPackage.confirm')"
          :title="t('settings.widgetPackage.uninstallConfirm')" @confirm="emits('uninstall', widgetPackage)"
        >
          <template #reference>
            <el-button type="danger" size="small">
              {{ t('settings.widgetPackage.uninstall') }}
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </ElCard>
</template>

<style scoped lang="scss">

</style>
