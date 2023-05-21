<template>
  <div class="collection">
    <div class="flex flex-col">
      <div class="title">文件夹</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CollectionWidget'
}
</script>

<style scoped lang="scss">
.collection {
  width: 100vw;
  height: 100vh;
  background-color: #F0F2F5;
  border-radius: 22px;
  padding: 16px;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
