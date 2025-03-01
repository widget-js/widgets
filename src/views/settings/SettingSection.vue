<script lang="ts" setup>
defineProps({
  title: {
    type: String,
  },
})
</script>

<template>
  <div class="setting-section">
    <el-row justify="start" class="title">
      {{ title }}
    </el-row>
    <el-card shadow="hover" class="content">
      <slot />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/theme.scss";

.setting-section {
  .title {
    @include title-medium-bold
  }
  .content{
    margin-top: 16px;
  }
}
</style>
