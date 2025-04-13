<script setup lang="ts">
import type { DeployedWidget, Widget } from '@widget-js/core'
import { DeployedWidgetApi, WidgetApi } from '@widget-js/core'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Code, Delete, Refresh } from '@icon-park/vue-next'
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
const ignoreMouseEvents = ref<boolean>(props.deployedWidget.isIgnoreMouseEvents ?? false)
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

function onIgnoreMouseEventChange() {
  WidgetApi.setIgnoreMouseEvents(props.deployedWidget.id, ignoreMouseEvents.value)
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
      <div class="flex items-center">
        <el-checkbox v-model="ignoreMouseEvents" class="mr-auto" @change="onIgnoreMouseEventChange">
          鼠标穿透
        </el-checkbox>
        <span class="ml-auto" />
        <el-button v-if="debugMode" size="small" type="primary" @click="openDevTools">
          <Code />
        </el-button>
        <el-button size="small" type="primary" @click="refresh">
          <Refresh />
        </el-button>
        <el-popconfirm :title="t('manager.confirmRemove')" width="200" @confirm="removeWidget">
          <template #reference>
            <el-button size="small" type="danger">
              <Delete />
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </ElCard>
</template>

<style scoped lang="scss">

</style>
