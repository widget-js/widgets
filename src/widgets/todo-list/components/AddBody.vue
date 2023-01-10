<template>
  <div class="add-body">
    <el-input v-model="content" placeholder="请输入代办内容"></el-input>
    <div class="buttons">
      <el-button @click="emits('cancel')">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const content = ref("")
const emits = defineEmits(["cancel", "confirm"]);
const confirm=()=>{
  emits('confirm', content.value);
  content.value = "";
}
</script>

<style scoped lang="scss">
.add-body {
  .buttons {
    margin-top: 16px;
    display: flex;

    button {
      flex: 1;
    }
  }
}
</style>
