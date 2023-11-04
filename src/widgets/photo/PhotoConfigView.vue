<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    :widget-data="widgetData"
    ref="dialog"
    @apply="onApplyClick()"
    @confirm="onSaveClick()">
    <template v-slot:form>
      <ElFormItem label="文件夹">
        <ElInput
          v-model="directory"
          @click="onPickFolderFocus"
          placeholder="自动轮播文件夹内照片（jpg,gif,png,jpeg）" />
      </ElFormItem>
      <el-form-item label="轮播时间（秒）">
        <el-input-number :min="1" :max="1000" v-model="durationModel"></el-input-number>
      </el-form-item>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import { useWidget, WidgetConfigOption, WidgetEditDialog } from '@widget-js/vue3'
import { BrowserWindowApi, DialogApi, WidgetDataApi } from '@widget-js/core'
import { computed, reactive, ref } from 'vue'
import { PhotoData } from '@/widgets/photo/PhotoData'
import PhotoWidget from '@/widgets/photo/Photo.widget'

const defaultData = new PhotoData(PhotoWidget.name)
defaultData.borderRadius = 22
const { widgetData, widgetParams } = useWidget(PhotoData, {
  defaultData,
  onDataLoaded: () => {
    directory.value = widgetData.value.directory
  }
})

BrowserWindowApi.setup({
  height: 400,
  width: 600
})
const durationModel = computed({
  get: () => {
    return Math.floor(widgetData.value.duration / 1000)
  },
  set: (val) => {
    widgetData.value.duration = val * 1000
  }
})

//修改成需要设置组件参数配置
const widgetConfigOption = reactive(
  new WidgetConfigOption({
    custom: true,
    backgroundColor: false,
    borderRadius: true,
    preview: false
  })
)

const onSaveClick = async () => {
  await onApplyClick()
  window.close()
}

const onApplyClick = async () => {
  await WidgetDataApi.save(widgetData.value)
}

const directory = ref('')

async function onPickFolderFocus() {
  const pickedFolder = await DialogApi.pickFolder()
  if (pickedFolder) {
    widgetData.value.directory = pickedFolder
    directory.value = pickedFolder
  }
}
</script>

<style scoped></style>
