<script lang="ts" setup>
import { WidgetApi } from '@widget-js/core'
import { WebWidget } from '@widget-js/web-api'
import { nextTick, onMounted } from 'vue'
import { FileFailed, PictureOne } from '@icon-park/vue-next'
import { computedAsync } from '@vueuse/core'

const props = defineProps({
  widget: {
    type: WebWidget,
    required: true,
  },
})

const previewImage = computedAsync(async () => {
  if (props.widget.package && props.widget.package.remote) {
    return `https://${props.widget.package.remote.hostname}${props.widget.package.remote.base}${props.widget.previewImage}`
  }
  else {
    const url = await WidgetApi.getWidgetPackageUrl(props.widget.packageName!)
    return url + props.widget.previewImage!
  }
}, null)
const cellSize = 72
const containerHeight = cellSize * 2
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
    <el-image
      v-if="!!widget.previewImage"
      class="preview-image"
      :src="previewImage"
      alt=""
      fit="contain"
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
  position: relative;
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

iframe {
  transform: scale(1);
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));

  &.editing {
    transform: scale(0.9);
  }
}

.toolbox {
  position: absolute;
  right: 0;
  top: 0;

  .el-button.is-circle {
    border-radius: 50%;
    padding: 8px;
    border-color: white;
    border-width: 2px;
    width: 32px;
    height: 32px;
  }

  .mgc_delete_line {
    &::before {
      color: white;
    }
  }

  .mgc_edit_2_fill {
    &::before {
      color: white;
    }
  }

  .mgc_edit_2_line {
    &::before {
      color: white;
    }
  }

  .mgc_delete_fill {
    &::before {
      color: white;
    }
  }

  .mgc_close_line {
    &::before {
      color: white;
    }
  }
}
</style>
