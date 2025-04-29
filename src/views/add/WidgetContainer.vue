<script lang="ts" setup>
import { WidgetApi } from '@widget-js/core'
import { WebWidget } from '@widget-js/web-api'
import { nextTick, onMounted, ref } from 'vue'
import { FileFailed, PictureOne } from '@icon-park/vue-next'
import { computedAsync } from '@vueuse/core'

const props = defineProps({
  widget: {
    type: WebWidget,
    required: true,
  },
})

const cellSize = 72
const containerHeight = cellSize * 2
const showPreview = ref(false)

const previewImage = computedAsync(async () => {
  if (props.widget.package && props.widget.package.remote) {
    return `https://${props.widget.package.remote.hostname}${props.widget.package.remote.base}${props.widget.previewImage}`
  }
  else {
    const url = await WidgetApi.getWidgetPackageUrl(props.widget.packageName!)
    return url + props.widget.previewImage!
  }
}, null)

onMounted(async () => {
  await nextTick()
})
</script>

<template>
  <div
    :style="{
      height: `${containerHeight}px`
    }"
    class="widget-container"
  >
    <el-image-viewer
      v-if="showPreview"
      :url-list="[previewImage]"
      show-progress
      @close="showPreview = false"
    />
    <el-image
      v-if="!!widget.previewImage"
      class="preview-image cursor-pointer"
      :src="previewImage"
      alt=""
      fit="contain"
      @click="showPreview = true"
    >
      <template #error>
        <FileFailed />
      </template>
      <template #placeholder>
        <PictureOne />
      </template>
    </el-image>
  </div>
</template>

<style scoped lang="scss">
.widget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  display: flex;
  height: 36px;
  align-items: center;
}

.preview-image {
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));
  width: 100%;
  height: auto;
  max-height: 128px;
}
</style>
