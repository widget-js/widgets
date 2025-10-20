<script setup lang="ts">
import type { PropType } from 'vue'
import type { WidgetPackage } from '@widget-js/core'

defineProps(
  {
    widgetPackage: {
      type: Object as PropType<WidgetPackage>,
      required: true,
    },
  },
)

const emits = defineEmits(['uninstall'])
</script>

<template>
  <ElCard shadow="hover" body-style="padding:12px">
    <div class="flex">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col text-start">
          <div v-if="widgetPackage">
            <b>组件包标题：</b>{{ widgetPackage.getTitle() }}
          </div>
          <div class="flex gap-6">
            <span><b>组件包名：</b>{{ widgetPackage.name }}</span>
          </div>
        </div>
      </div>
      <div class="ml-auto flex items-center">
        <el-popconfirm cancel-button-text="取消" width="200" confirm-button-text="确认" title="确认卸载该组件包吗？" @confirm="emits('uninstall', widgetPackage)">
          <template #reference>
            <el-button type="danger" size="small">
              卸载
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </ElCard>
</template>

<style scoped lang="scss">

</style>
