<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLongPress } from '@vueuse/core'
import { NotificationApi } from '@widget-js/core'
import { useI18n } from 'vue-i18n'
import { useDebugConfig } from '@/composition/useAppConfig'

const props = defineProps({
  iconSize: {
    type: Number,
    default: 20,
  },
})

const debugMode = useDebugConfig()
const github = ref()
const { t } = useI18n()
onLongPress(
  github,
  () => {
    NotificationApi.info(t('notification.enableDevMode'))
    debugMode.value = true
  },
  { delay: 3000 },
)
const iconSizePx = computed(() => `${props.iconSize}px`)
</script>

<template>
  <div class="social">
    <a target="_blank" href="https://widgetjs.cn/">
      <img src="../../assets/images/logo.png" alt="Widget"></a>
    <a target="_blank" href="https://v.douyin.com/YhuNAb8/">
      <img src="../../assets/images/douyin.png" alt="TikTok"></a>

    <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=TgO2mUQe">
      <img src="../../assets/images/qq.png" alt="QQ"></a>

    <a target="_blank" href="https://space.bilibili.com/207395767">
      <img src="../../assets/images/bilibili_logo_red.png" alt="Bilibili"></a>
    <a ref="github" target="_blank" href="https://github.com/widget-js">
      <img src="../../assets/images/github-mark.png" alt="GitHub"></a>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/theme.scss';

.social {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;

  a {
    text-decoration: none;
    color: $color-primary;
    line-height: 0;
    img {
      width: v-bind(iconSizePx);
    }
  }
}
</style>
