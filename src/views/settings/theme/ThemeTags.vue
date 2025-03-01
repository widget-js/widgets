<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { DefaultWidgetTheme } from '@widget-js/core'
import type { ThemeTag } from '@/views/settings/theme/ThemeTag'

const emits = defineEmits(['tagClick'])
const { t } = useI18n()

const translucent = DefaultWidgetTheme
const dark = DefaultWidgetTheme.copy({
  primaryColor: '#1890ff',
  backgroundColor: '#001529',
  backgroundBorderColor: 'rgba(255,255,255,0.25)',
  backgroundBoxShadowColor: 'rgba(255,255,255,0.25)',
  dividerColor: 'rgba(255,255,255,0.25)',
  color: '#fff',
})

const light = DefaultWidgetTheme.copy({
  primaryColor: '#1890ff',
  backgroundColor: '#ffffff',
  backgroundBorderColor: 'transparent',
  backgroundBoxShadowColor: 'transparent',
  dividerColor: 'rgba(0,0,0,0.1)',
  color: '#001529',
})

const themes: ThemeTag[] = [
  { name: 'theme.translucent', value: 'translucent', theme: translucent },
  { name: 'theme.dark', value: 'dark', theme: dark },
  { name: 'theme.light', value: 'light', theme: light },
]

const modelValue = defineModel({ default: 'translucent' })
function onChange(value: ThemeTag) {
  modelValue.value = value.value
  emits('tagClick', value)
}
</script>

<template>
  <div class="flex gap-2">
    <el-tag v-for="item in themes" :key="item.name" class="cursor-pointer" :effect="modelValue == item.value ? 'dark' : 'plain'" round size="large" :type="modelValue == item.value ? 'primary' : 'info'" @click="onChange(item)">
      {{ t(item.name) }}
    </el-tag>
  </div>
</template>

<style scoped lang="scss">

</style>
