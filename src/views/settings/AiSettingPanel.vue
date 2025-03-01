<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const aiConfig = reactive({
  apiKey: '',
  url: '',
  model: '',
})
</script>

<template>
  <el-form label-width="80">
    <el-form-item label="API Key">
      <el-input v-model="aiConfig.apiKey" />
    </el-form-item>
    <el-form-item label="Base URL">
      <el-input v-model="aiConfig.url" />
    </el-form-item>
    <el-form-item label="Model">
      <el-input v-model="aiConfig.model" />
    </el-form-item>
    <el-form-item :label="t('settings.language')">
      <el-input v-model="aiConfig.model" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
