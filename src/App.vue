<script setup>
import { useAppLanguage } from '@widget-js/vue3'
import { i18n } from '@/i18n/i18n'

useAppLanguage({
  onLoad: (lang) => {
    i18n.global.locale.value = lang
  },
  onChange: (lang) => {
    i18n.global.locale.value = lang
  },
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
html{
  font-family: var(--widget-font-family);
  font-size: var(--widget-font-size);
}
</style>
