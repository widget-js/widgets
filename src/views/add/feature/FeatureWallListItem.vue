<script setup lang="ts">
import { Finance, UpOne } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import type { FeatureWall } from '@/model/FeatureWall'
import { FeatureWallApi } from '@/api/FeatureWallApi'

const model = defineModel<FeatureWall>({ required: true })

async function likeFeatureWall(id: number) {
  try {
    await FeatureWallApi.like(id)
    model.value.likes += 1
    ElMessage.success('点赞成功')
  }
  catch (error) {
    ElMessage.error('点赞失败')
  }
}
const showPreview = ref(false)
const urlList = computed(() => {
  return model.value.previewImage
    ? [model.value.previewImage]
    : []
})

function contentClick() {
  showPreview.value = true
}
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex flex-1 items-center gap-4">
      <el-avatar class="cursor-pointer" size="large" :src="model.previewImage" shape="square" @click="showPreview = true" />
      <el-image-viewer
        v-if="showPreview"
        :url-list="urlList"
        show-progress
        @close="showPreview = false"
      />
      <div class="flex flex-col cursor-pointer" style="width: 85%" @click="contentClick">
        <div class="font-bold">
          {{ model.title }}
        </div>
        <div>
          {{ model.description }}
        </div>
      </div>
    </div>
    <div class="actions ml-auto">
      <el-popover placement="left" width="420">
        <template #default>
          <img :src="model.rewardQRCode" width="400">
        </template>
        <template #reference>
          <el-button v-if="model.rewardQRCode" type="primary">
            <template #icon>
              <Finance />
            </template>
            打赏
          </el-button>
        </template>
      </el-popover>
      <el-button type="primary" @click="likeFeatureWall(model.id)">
        <template #icon>
          <UpOne />
        </template>  赞同 ({{ model.likes }})
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
