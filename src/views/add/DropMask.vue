<script setup lang="ts">
import { FolderDownload } from '@icon-park/vue-next'
import { useStorage } from '@vueuse/core'

const showKnowButton = useStorage('tip-drop-mask-button', true)
</script>

<template>
  <div class="drop-mask">
    <FolderDownload size="32" />
    <h1>安装本地组件包</h1>
    <h3>将组件包.zip拖放到此处即可安装</h3>
    <el-button v-if="showKnowButton" type="primary" @click="showKnowButton = false">
      知道了
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.drop-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  gap: 12px;
}
h1{
  padding: 0;
  margin: 0;
}
h3{
  padding: 0;
  margin: 0;
}
</style>
