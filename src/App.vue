<script setup>
import { useAppLanguage } from '@widget-js/vue3'
import consola from 'consola'
import { i18n } from '@/i18n/i18n'

useAppLanguage({
  onLoad: (lang) => {
    consola.log('App language loaded:', lang)
    i18n.global.locale = lang
  },
  onChange: (lang) => {
    consola.log('App language onChange:', lang)
    i18n.global.locale = lang
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
