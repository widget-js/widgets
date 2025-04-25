<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { BrowserWindowApi } from '@widget-js/core'
import { FeatureWallApi } from '@/api/FeatureWallApi'
import type { FeatureWall } from '@/model/FeatureWall'
import FeatureWallListItem from '@/views/add/feature/FeatureWallListItem.vue'

const featureWalls = ref<FeatureWall[]>([])
const loading = ref(false)

async function fetchFeatureWalls() {
  loading.value = true
  try {
    featureWalls.value = await FeatureWallApi.findAll()
  }
  catch (error) {
    ElMessage.error('获取数据失败')
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFeatureWalls()
})
</script>

<template>
  <div v-loading="loading" class="flex flex-col gap-4 w-full">
    <div class="flex flex-col gap-2 w-full">
      <el-card v-for="(item, index) in featureWalls" :key="item.id" shadow="hover">
        <FeatureWallListItem v-model="featureWalls[index]" />
      </el-card>
    </div>
    <div class="w-full flex items-center justify-center">
      <el-button type="warning" @click="BrowserWindowApi.openUrl('https://faq.widgetjs.cn', { external: true })">
        提交你的需求
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
