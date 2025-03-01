<script setup lang="ts">
import { reactive } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import { useI18n } from 'vue-i18n'
import { useDebugConfig } from '@/composition/useAppConfig'

const emits = defineEmits(['change'])
const { t } = useI18n()
const modelValue = defineModel({ default: '' })
const items = reactive([
  { icon: 'all-application', labelKey: 'tags.all', value: '' },
  { icon: 'robot-one', labelKey: 'tags.ai', value: 'ai' },
  { icon: 'tool', labelKey: 'tags.tools', value: 'utilities' },
  { icon: 'speed', labelKey: 'tags.productivity', value: 'productivity' },
  { icon: 'doc-detail', labelKey: 'tags.news', value: 'news' },
  { icon: 'sun-one', labelKey: 'tags.weather', value: 'weather' },
  { icon: 'optimize', labelKey: 'tags.fun', value: 'fun' },
  { icon: 'calendar', labelKey: 'tags.calendar', value: 'calendar' },
  { icon: 'time', labelKey: 'tags.time', value: 'time' },
  { icon: 'finance', labelKey: 'tags.finance', value: 'finance' },
  { icon: 'pic', labelKey: 'tags.photo', value: 'photo' },
  { icon: 'code', labelKey: 'tags.debug', value: 'debug' },
],
)
function onChange(value: string) {
  modelValue.value = value
  emits('change', modelValue)
}

useDebugConfig((_) => {
})
</script>

<template>
  <el-scrollbar always height="50">
    <div class="flex gap-2">
      <el-tag v-for="item in items" :key="item.labelKey" class="cursor-pointer" :effect="modelValue == item.value ? 'dark' : 'plain'" round size="large" :type="modelValue == item.value ? 'primary' : 'info'" @click="onChange(item.value)">
        <IconPark :type="item.icon" /> {{ t(item.labelKey) }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
