<script setup lang="ts">
import type { DeployedWidget, Widget } from '@widget-js/core'
import { DeployedWidgetApi, WidgetApi } from '@widget-js/core'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDebugConfig } from '@/composition/useAppConfig'

const props = defineProps({
  deployedWidget: {
    type: Object as PropType<DeployedWidget>,
    required: true,
  },
})

const emits = defineEmits(['remove'])
const widget = ref<Widget>()
const { t, locale } = useI18n()
WidgetApi.getWidget(props.deployedWidget.name).then((value) => {
  widget.value = value
})

function removeWidget() {
  emits('remove', props.deployedWidget)
}

const debugMode = useDebugConfig()

function openDevTools() {
  DeployedWidgetApi.openDevTools(props.deployedWidget.id)
}

function refresh() {
  WidgetApi.reload(props.deployedWidget.id)
}
</script>

<template>
  <ElCard shadow="hover" body-style="padding:12px">
    <div class="flex flex-col gap-2">
      <div class="flex flex-col text-start">
        <div v-if="widget">
          <b>{{ t('manager.title') }}：</b>{{ widget.getTitle(locale) }}
        </div>
        <div class="flex gap-6">
          <span><b>{{ t('manager.name') }}：</b>{{ deployedWidget.name }}</span>
        </div>
        <!--        <div class="flex gap-6"> -->
        <!--          <span><Aiming class="mr-2" />X: {{ deployedWidget.x }} Y: {{ deployedWidget.y }}</span> -->
        <!--          <span><AutoWidth class="mr-2" />W: {{ deployedWidget.width }} H: {{ deployedWidget.height }}</span> -->
        <!--        </div> -->
      </div>
      <div class="flex">
        <el-button v-if="debugMode" size="small" type="primary" @click="openDevTools">
          DevTools
        </el-button>
        <el-button size="small" type="primary" @click="refresh">
          {{ t('manager.refresh') }}
        </el-button>
        <el-popconfirm :title="t('manager.confirmRemove')" width="200" @confirm="removeWidget">
          <template #reference>
            <el-button size="small" type="danger">
              {{ t('manager.remove') }}
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </ElCard>
</template>

<style scoped lang="scss">

</style>
