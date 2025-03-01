<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import consola from 'consola'

const fonts = reactive<string[]>([])
const model = defineModel()
interface LocalFont {
  family: string
  fullName: string
  postscriptName: string
  style: string
}
async function loadFonts() {
  if (document.visibilityState !== 'visible') {
    consola.info('loadFonts: document is not visible')
    return
  }
  const localFonts = await (window as any).queryLocalFonts() as LocalFont[]
  fonts.splice(0, fonts.length)
  for (const localFont of localFonts) {
    if (fonts.includes(localFont.family)) {
      continue
    }
    fonts.push(localFont.family)
  }
}

onMounted(() => {
  loadFonts()
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && fonts.length === 0) {
    loadFonts()
  }
})
</script>

<template>
  <el-select v-model="model" filterable placeholder="默认字体">
    <el-option :value="undefined">
      默认字体
    </el-option>
    <el-option v-for="font in fonts" :key="font" :value="font" :style="{ fontFamily: font }">
      {{ font }} - 中国智造，慧及全球
    </el-option>
  </el-select>
</template>

<style scoped lang="scss">

</style>
