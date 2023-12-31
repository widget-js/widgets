<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
  useWidgetSize,
} from '@widget-js/vue3'
import { ref } from 'vue'
import {
  FileApi,
  WidgetApi,
} from '@widget-js/core'
import { PhotoData } from '@/widgets/photo/PhotoData'

const photos = ref<string[]>([])
const showGuide = ref(false)
const {
  widgetData,
  widgetParams,
} = useWidget(PhotoData, {
  onDataLoaded: (data) => {
    if (data && data.directory) {
      FileApi.readDirectory(data.directory).then((files) => {
        photos.value = files.filter((file) => {
          const ignoreCase = file.toLowerCase()
          return (
            ignoreCase.endsWith('.jpg')
            || ignoreCase.endsWith('.jpeg')
            || ignoreCase.endsWith('.gif')
            || ignoreCase.endsWith('.png')
          )
        })
      })
      showGuide.value = false
    }
    else {
      showGuide.value = true
    }
  },
})

const widgetSize = useWidgetSize()

async function showConfig() {
  // const widgetConfigUrl = await WidgetApi.getWidgetConfigUrl(widgetParams.name, widgetParams);
  // await BrowserWindowApi.openUrl(widgetConfigUrl!);
  WidgetApi.openConfigPage(widgetParams.id!)
}
</script>

<template>
  <WidgetWrapper>
    <div class="">
      <div class="photo" :style="{ borderRadius: `${widgetData.borderRadius ?? 0}px` }">
        <el-carousel
          :height="`${widgetSize.height.value}px`"
          indicator-position="none"
          :interval="widgetData.duration"
        >
          <el-carousel-item v-for="item in photos" :key="item">
            <el-image fit="cover" class="photo-item" :src="item" alt="" />
          </el-carousel-item>
          <el-carousel-item v-if="showGuide" @click="showConfig">
            <h4 class="justify-center">
              点击设置图片文件
            </h4>
          </el-carousel-item>
          <el-carousel-item v-else-if="photos.length == 0">
            <h4 class="justify-center">
              文件夹内没有找到图片
            </h4>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </WidgetWrapper>
</template>

<style scoped lang="scss">
.photo {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);

  .guide {
    position: fixed;
    top: 50%;
  }

  .photo-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.el-carousel__item h4 {
  display: flex;
  color: #fff;
  opacity: 0.75;
  height: 100%;
  place-items: center;
  margin: 0;
}
</style>
