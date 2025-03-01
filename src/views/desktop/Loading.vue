<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <widget-wrapper>
    <div class="loading">
      <span class="loader" />
      <div>{{ t("loading") }}</div>
    </div>
  </widget-wrapper>
</template>

<style scoped lang="scss">
.loading {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  display: flex;
  place-items: center;
  font-size: 14px;
  flex-direction: column;
  place-content: center;
  gap: 8px;
  color: white;
  overflow: hidden;
  overflow-wrap: break-word;

  .desc {
    color: white;
    font-size: 12px;
    opacity: 0.5;
    overflow-wrap: break-word;
  }
}

.loader {
  width: 32px;
  height: 32px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #FFF;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
