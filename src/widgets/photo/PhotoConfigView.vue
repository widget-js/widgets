<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidgetData,
} from '@widget-js/vue3'
import {
  BrowserWindowApi,
  DialogApi,
} from '@widget-js/core'
import {
  computed,
  ref,
} from 'vue'
import { PhotoData } from '@/widgets/photo/model/PhotoData'
import PhotoWidget from '@/widgets/photo/Photo.widget'

const directory = ref('')
const defaultData = new PhotoData(PhotoWidget.name)
defaultData.theme.borderRadius = '22px'
const {
  widgetData,
  widgetParams,
  save,
} = useWidgetData(PhotoData, {
  defaultData,
  onDataLoaded: () => {
    directory.value = widgetData.value.directory
  },
})

BrowserWindowApi.setup({
  height: 400,
  width: 600,
})
const durationModel = computed({
  get: () => {
    return Math.floor(widgetData.value.duration / 1000)
  },
  set: (val) => {
    widgetData.value.duration = val * 1000
  },
})

// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  showFooter: true,
  theme: {
    backgroundColor: false,
    borderRadius: true,
  },
})

async function onPickFolderFocus() {
  const pickedFolder = await DialogApi.pickFolder()
  if (pickedFolder) {
    widgetData.value.directory = pickedFolder
    directory.value = pickedFolder
  }
}
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <ElFormItem label="文件夹">
        <ElInput
          v-model="directory"
          placeholder="自动轮播文件夹内照片（jpg,gif,png,jpeg）"
          @click="onPickFolderFocus"
        />
      </ElFormItem>
      <el-form-item label="轮播时间（秒）">
        <el-input-number v-model="durationModel" :min="1" :max="1000" />
      </el-form-item>
      <el-form-item label="随机播放">
        <el-switch v-model="widgetData.random" />
      </el-form-item>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
