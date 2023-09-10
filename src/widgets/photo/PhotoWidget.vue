<template>
  <widget-wrapper>
    <div class="">
      <div class="photo" :style="{ borderRadius: `${widgetData.borderRadius ?? 0}px` }">
        <el-carousel :height="`${widgetParams.heightPx - 12}px`" indicator-position="none" :interval="5000">
          <template v-if="widgetParams.preview">
            <el-carousel-item v-for="item in defaultPhotos" :key="item">
              <img class="photo-item" :src="item" alt=""/>
            </el-carousel-item>
          </template>
          <template v-else>
            <el-carousel-item v-for="item in photos" :key="item">
              <img class="photo-item" :src="item" alt=""/>
            </el-carousel-item>
            <el-carousel-item v-if="showGuide" @click="showConfig">
              <h4 class="justify-center">点击设置图片文件</h4>
            </el-carousel-item>
            <el-carousel-item v-else-if="photos.length == 0">
              <h4 class="justify-center">文件夹内没有找到图片</h4>
            </el-carousel-item>
          </template>
        </el-carousel>
      </div>
    </div>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import {useWidget, WidgetWrapper} from '@widget-js/vue3'
import {PhotoData} from '@/widgets/photo/PhotoData'
import {ref} from 'vue'
import {FileApi, DeployedWidgetApi, WidgetApi} from '@widget-js/core'
import photo1 from './assets/photo1.jpg'
import photo2 from './assets/photo2.jpg'
import photo3 from './assets/photo3.jpg'
import PhotoWidget from "@/widgets/photo/Photo.widget";

const defaultPhotos = [photo1, photo2, photo3]
const photos = ref<string[]>([])
const showGuide = ref(false)
const defaultData = new PhotoData(PhotoWidget.name)
defaultData.borderRadius = 22
const {widgetData, widgetParams} = useWidget(PhotoData, {
  defaultData,
  onDataLoaded: (data) => {
    if (data && data.directory) {
      // photos.value
      console.log(photos.value)
      FileApi.readDirectory(data.directory).then((files) => {
        photos.value = files.filter((file) => {
          const ignoreCase = file.toLowerCase()
          return (
            ignoreCase.endsWith('.jpg') ||
            ignoreCase.endsWith('.jpeg') ||
            ignoreCase.endsWith('.gif') ||
            ignoreCase.endsWith('.png')
          )
        })
      })
      showGuide.value = false
    } else {
      showGuide.value = true
    }
  }
})

const showConfig = async () => {
  // const widgetConfigUrl = await WidgetApi.getWidgetConfigUrl(widgetParams.name, widgetParams);
  // await BrowserWindowApi.openUrl(widgetConfigUrl!);
  WidgetApi.openConfigPage(widgetParams.id!)
}
</script>

<style scoped lang="scss">
.photo {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);

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
