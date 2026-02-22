<script setup lang="ts">
import type { AiConfig } from '@widget-js/core'
import { CheckOne, Delete, Drag, Edit } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  config: AiConfig
}>()

const emit = defineEmits<{
  (e: 'edit', config: AiConfig): void
  (e: 'delete', id: string): void
}>()

const { t } = useI18n()
const testing = ref(false)

async function testConfig() {
  testing.value = true
  try {
    const baseUrl = props.config.apiBaseUrl.replace(/\/$/, '')
    const url = `${baseUrl}/chat/completions`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.config.apiKey}`,
      },
      body: JSON.stringify({
        model: props.config.model,
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 5,
      }),
    })

    if (response.ok) {
      ElMessage.success(t('connectionSuccess'))
    }
    else {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.error?.message || response.statusText
      ElMessage.error(`${t('connectionFailed')}: ${errorMsg}`)
    }
  }
  catch (e: any) {
    ElMessage.error(`${t('connectionFailed')}: ${e.message}`)
  }
  finally {
    testing.value = false
  }
}
</script>

<template>
  <div class="config-item">
    <div class="drag-handle">
      <Drag theme="outline" size="20" fill="#333" />
    </div>
    <div class="info">
      <div class="model">
        {{ config.model }}
      </div>
      <div class="url">
        {{ config.apiBaseUrl }}
      </div>
    </div>
    <div class="actions">
      <el-tooltip content="测试" placement="top">
        <el-button circle :icon="CheckOne" :loading="testing" @click="testConfig" />
      </el-tooltip>
      <el-button circle :icon="Edit" @click="emit('edit', config)" />
      <el-button circle type="danger" :icon="Delete" @click="emit('delete', config.id)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.config-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  -webkit-user-drag: element;
  .drag-handle {
    cursor: grab;
    margin-right: 15px;
    display: flex;
    align-items: center;
    color: var(--el-text-color-secondary);

    &:active {
      cursor: grabbing;
    }
  }

  .info {
    flex: 1;

    .model {
      font-weight: bold;
      font-size: 16px;
    }

    .url {
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
  }

  .actions {
    display: flex;
    gap: 10px;
  }
}
</style>
