<script setup lang="ts">
import { reactive, watch } from 'vue'
import consola from 'consola'
import { useStorage } from '@vueuse/core'
import { AppApi, WidgetTheme } from '@widget-js/core'
import ThemeTags from '@/views/settings/theme/ThemeTags.vue'
import type { ThemeTag } from '@/views/settings/theme/ThemeTag'

const widgetTheme = reactive<WidgetTheme>(new WidgetTheme({
  fontFamily: undefined,
  fontSize: '16px',
}))

AppApi.getThemeCSS().then((value) => {
  if (value) {
    Object.assign(widgetTheme, WidgetTheme.fromCSS(value))
    consola.log('widgetTheme', widgetTheme)
  }
  watch(widgetTheme, async (newValue) => {
    const css = newValue.toCSS(':root')
    consola.info('New CSS', css)
    await AppApi.setThemeCSS(css)
  }, { deep: true })
})

function onThemeTagChange(tag: ThemeTag) {
  Object.assign(widgetTheme, tag.theme)
}

const selectTheme = useStorage('selectTheme', 'translucent')
</script>

<template>
  <el-form label-width="90px" label-position="left">
    <ThemeTags v-model="selectTheme" @tag-click="onThemeTagChange" />
    <WidgetThemeForm
      v-model="widgetTheme"
      class="mt-2"
      :theme-option="{
        fontSize: [8, 50],
        useGlobalTheme: false,
        primaryColor: true,
        backgroundColor: true,
        backgroundBorderColor: true,
        backgroundBoxShadowColor: true,
        dividerColor: true,
        fontFamily: true,
        color: true,
        borderRadius: true,
      }"
    />
  </el-form>
</template>

<style lang="scss">
.el-form {
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}

.setting-section:nth-child(n + 2) {
  margin-top: 12px;
}

h4{
  color: black;
  font-weight: bold;
}
</style>
