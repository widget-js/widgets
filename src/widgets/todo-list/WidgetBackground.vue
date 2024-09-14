<script setup lang="ts">
// 获取根元素
import consola from 'consola'

const root = document.documentElement
const wallpaperVarName = '--widget-wallpaper'

// 创建一个 MutationObserver 实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      // 获取 CSS 变量的值
      const wallpaperVar = getComputedStyle(root).getPropertyValue(wallpaperVarName).trim()
      consola.log('Widget wallpaper changed', wallpaperVar)
    }
  })
})

// 配置 MutationObserver 观察根元素的属性变化
observer.observe(root, {
  attributes: true,
  attributeFilter: ['style'],
})
</script>

<template>
  <div class="widget-background-stack">
    <div class="widget-background" />
    <div class="widget-background-mask" />
  </div>
</template>

<style>
.widget-background-stack {
  border-radius: var(--widget-border-radius);
  overflow: hidden;
  position: absolute;
  width: var(--widget-inner-width);
  height: var(--widget-inner-height);
  z-index: -1;
}

.widget-background,.widget-background-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: var(--widget-inner-width);
  height: var(--widget-inner-height);
  border-radius: var(--widget-border-radius);
  overflow: hidden;
  transition: all 0.2s ease-out;
}

.widget-background{
  z-index: -3;
  background-image: var(--widget-wallpaper);
  border-radius: var(--widget-border-radius);
  background-position: calc(var(--widget-outer-padding) * -1);
  background-size: 100vw 100vh ;
  background-repeat: no-repeat;
}

.editing>.widget-background-stack>.widget-background{
  background-image:none;
}

.editing>.widget-background-stack>.widget-background-mask{
  transform: scale(0.8);
}

.widget-background-mask{
  z-index: -2;
  background-color: var(--widget-background-color);
  border: var(--widget-background-border,1px solid var(--widget-background-border-color,hsla(0,0%,100%,.06)));
  box-shadow: var(--widget-backgroun-box-shadow,inset 0 1px 0 0 var(--widget-background-box-shadow-color,hsla(0, 0%, 100%, 0.1)));
  backdrop-filter: blur(var(--widget-wallpaper-blur,16px));
}
</style>
