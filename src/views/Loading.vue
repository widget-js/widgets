<script lang="ts" setup>

</script>

<template>
  <widget-base-dialog title="启动中">
    <template #body>
      <div v-loading="true" class="loading" element-loading-background="transparent" />
    </template>
  </widget-base-dialog>
</template>

<style scoped>
.loading {
  height: 100px;
}
</style>
