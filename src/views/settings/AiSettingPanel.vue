<script setup lang="ts">
import type { AiConfig } from '@widget-js/core'
import { Plus } from '@icon-park/vue-next'
import { useSortable } from '@vueuse/integrations/useSortable'
import { AiApi } from '@widget-js/core'
import consola from 'consola'
import { ElMessage, ElMessageBox } from 'element-plus'
import { nanoid } from 'nanoid'
import { onMounted, reactive, ref, shallowRef, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { delay } from '@/util/TimeUtils'
import AiConfigItem from './AiConfigItem.vue'

interface AiPreset {
  label: string
  model: string
  apiBaseUrl: string
  docUrl: string
}

const selectedPreset = ref('OpenAI')
const presets: AiPreset[] = [
  {
    label: 'OpenAI',
    model: 'gpt-4o',
    apiBaseUrl: 'https://api.openai.com/v1',
    docUrl: 'https://platform.openai.com/docs/api-reference',
  },
  {
    label: 'DeepSeek',
    model: 'deepseek-chat',
    apiBaseUrl: 'https://api.deepseek.com',
    docUrl: 'https://platform.deepseek.com/api_keys',
  },
  {
    label: 'Kimi',
    model: 'moonshot-v1-8k',
    apiBaseUrl: 'https://api.moonshot.cn/v1',
    docUrl: 'https://platform.moonshot.cn/console/account',
  },
  {
    label: 'Aliyun Bailian',
    model: 'qwen-plus',
    apiBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    docUrl: 'https://www.aliyun.com/product/tongyi',
  },
  {
    label: 'SiliconFlow',
    model: 'deepseek-ai/DeepSeek-V3',
    apiBaseUrl: 'https://api.siliconflow.cn/v1',
    docUrl: 'https://docs.siliconflow.cn/cn/userguide/introduction',
  },
  {
    label: 'Local (Ollama)',
    model: 'llama3.2',
    apiBaseUrl: 'http://localhost:11434/v1',
    docUrl: 'https://docs.ollama.com/',
  },
]

const { t } = useI18n()
const configList = shallowRef<AiConfig[]>([])
const loading = ref(false)
const listRef = useTemplateRef<HTMLElement>('listRef')

async function loadConfigs() {
  loading.value = true
  try {
    configList.value = await AiApi.getConfigList()
  }
  catch (e) {
    ElMessage.error(t('failedToLoad'))
  }
  finally {
    loading.value = false
  }
}

onMounted(loadConfigs)

// Dialog
const dialogVisible = ref(false)
const isEdit = ref(false)
const currentConfig = reactive<AiConfig>({
  id: '',
  model: '',
  apiKey: '',
  apiBaseUrl: '',
})

function onPresetChange(presetLabel: string) {
  const preset = presets.find(p => p.label === presetLabel)
  if (preset) {
    currentConfig.model = preset.model
    currentConfig.apiBaseUrl = preset.apiBaseUrl
  }
}

function openAddDialog() {
  isEdit.value = false
  currentConfig.id = nanoid()
  currentConfig.model = ''
  currentConfig.apiKey = ''
  currentConfig.apiBaseUrl = ''
  dialogVisible.value = true
}

function openEditDialog(config: AiConfig) {
  isEdit.value = true
  Object.assign(currentConfig, config)
  dialogVisible.value = true
}

async function saveConfig() {
  try {
    if (isEdit.value) {
      await AiApi.updateConfig({ ...currentConfig })
      ElMessage.success(t('updatedSuccessfully'))
    }
    else {
      await AiApi.addConfig({ ...currentConfig })
      ElMessage.success(t('addedSuccessfully'))
    }
    dialogVisible.value = false
    loadConfigs()
  }
  catch (e) {
    ElMessage.error(t('operationFailed'))
  }
}

async function deleteConfig(id: string) {
  try {
    await ElMessageBox.confirm(t('confirmDelete'), t('warning'), {
      confirmButtonText: t('confirm'),
      cancelButtonText: t('cancel'),
      type: 'warning',
    })
    await AiApi.deleteConfig(id)
    ElMessage.success(t('deletedSuccessfully'))
    loadConfigs()
  }
  catch (e) {
    // cancel or error
  }
}

// Sortable
useSortable(listRef, configList, {
  handle: '.drag-handle',
  onEnd: async () => {
    await delay(500)
    consola.log('configList', configList.value)
    AiApi.setConfigList(configList.value)
  },
  animation: 300,
})
</script>

<template>
  <div class="ai-setting-panel">
    <div class="header">
      <el-button type="primary" :icon="Plus" @click="openAddDialog">
        {{ t('add') }}
      </el-button>
    </div>

    <div ref="listRef" v-loading="loading" class="config-list">
      <AiConfigItem
        v-for="config in configList"
        :key="config.id"
        :config="config"
        @edit="openEditDialog"
        @delete="deleteConfig"
      />
    </div>

    <el-dialog v-model="dialogVisible" :title="isEdit ? t('edit') : t('add')" width="500px">
      <el-form :model="currentConfig" label-width="100px">
        <el-form-item :label="t('preset')">
          <el-select v-model="selectedPreset" :placeholder="t('selectPreset')" @change="onPresetChange">
            <el-option
              v-for="preset in presets"
              :key="preset.label"
              :label="preset.label"
              :value="preset.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('model')">
          <el-input v-model="currentConfig.model" :placeholder="t('modelPlaceholder')" />
        </el-form-item>
        <el-form-item :label="t('apiKey')">
          <el-input v-model="currentConfig.apiKey" type="password" show-password />
        </el-form-item>
        <el-form-item :label="t('baseUrl')">
          <el-input v-model="currentConfig.apiBaseUrl" :placeholder="t('baseUrlPlaceholder')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ t('cancel') }}</el-button>
          <el-button type="primary" @click="saveConfig">{{ t('confirm') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.ai-setting-panel {
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .config-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
