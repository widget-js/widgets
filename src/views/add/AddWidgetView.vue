<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { Code, Install, Search } from '@icon-park/vue-next'
import type { Category, Widget } from '@widget-js/core'
import { AppApi, BrowserWindowApi, ElectronUtils, NotificationApi, WidgetApi, WidgetPackageApi } from '@widget-js/core'

import { useDebounceFn, useDropZone, useStorage, useWindowSize } from '@vueuse/core'
import type { WidgetSearchOptions } from '@widget-js/web-api'
import { WebWidget } from '@widget-js/web-api'
import { useI18n } from 'vue-i18n'
import { ElNotification } from 'element-plus'
import consola from 'consola'
import SearchItem from '@/views/add/SearchItem.vue'
import { WebWidgetApi } from '@/api/WebWidgetApi'
import WidgetTags from '@/views/add/WidgetTags.vue'
import FeatureWallList from '@/views/add/feature/FeatureWallList.vue'
import DropMask from '@/views/add/DropMask.vue'

const { t } = useI18n()
const keyword = ref('')
const selectedCategory = ref('')
const windowRef = ref()
const widgets = reactive<Widget[]>([])
const loading = ref(true)
const { height } = useWindowSize()
onMounted(async () => {
  await nextTick()
  document.title = t('search.title')
})

async function search() {
  loading.value = true
  if (selectedCategory.value == 'debug') {
    widgets.splice(0, widgets.length)
    WidgetPackageApi.getPackages().then(async (widgetPackages) => {
      for (const widgetPackage of widgetPackages.filter(it => it.development)) {
        const localWidgets = await WidgetApi.getWidgets()
        widgets.push(
          ...localWidgets
            .map(it => WebWidget.fromObject(it))
            .filter(it => it.packageName == widgetPackage.name),
        )
      }
    }).finally(() => {
      loading.value = false
    })
    return
  }

  const version = await AppApi.getVersion()
  const keywordStr = keyword.value.trim()
  const options: WidgetSearchOptions = {
    page: 1,
    pageSize: 50,
    category: selectedCategory.value,
    keyword: keywordStr,
  }
  options.appVersion = version
  let localWidgets = (await WidgetApi.getWidgets()).filter(it => !it.disabled)

  if (selectedCategory.value) {
    localWidgets = localWidgets.filter(it => it.categories && it.categories.includes(selectedCategory.value as Category))
  }
  if (keywordStr) {
    localWidgets = localWidgets.filter((it) => {
      const title = JSON.stringify(it.title)
      const description = JSON.stringify(it.description)
      return title.includes(keywordStr) || description.includes(keywordStr)
    })
  }
  WebWidgetApi.search(options)
    .then((res) => {
      widgets.splice(0, widgets.length)
      widgets.push(
        ...res.data
          .map(it => WebWidget.fromObject(it))
          .filter(it => it.name != 'cn.widgetjs.widgets.dynamic_island'),
      )
      for (const localWidget of localWidgets) {
        if (widgets.some(it => it.name == localWidget.name)) {
          continue
        }
        widgets.push(WebWidget.fromObject(localWidget))
      }
    })
    .catch(() => {
      widgets.splice(0, widgets.length)
      widgets.push(...localWidgets)
    })
    .finally(() => {
      loading.value = false
    })
}

const searchDebounce = useDebounceFn(search, 1000)
watch(keyword, () => {
  searchDebounce()
})

search()

function goDevPage() {
  BrowserWindowApi.openUrl('https://widgetjs.cn/guide/', { external: true })
}

const bodyRef = ref<HTMLDivElement>()
const showKnowButton = useStorage('tip-drop-mask-button', true)

const { isOverDropZone } = useDropZone(bodyRef, {
  onDrop: async (files: File[] | null, _: DragEvent) => {
    if (files && files.length > 0) {
      const file = files[0]
      try {
        consola.info(`开始安装组件包: `, file)
        await WidgetPackageApi.install(file.path)
        await NotificationApi.success('安装成功')
        window.location.reload()
      }
      catch (e) {
        ElNotification({
          title: '安装失败',
          message: e.message,
          type: 'error',
        })
      }
    }
  },
  dataTypes: ['application/x-zip-compressed'],
  multiple: false,
})

const isShowMask = computed(() => {
  return isOverDropZone.value || showKnowButton.value
})
</script>

<template>
  <div :class="{ browser: !ElectronUtils.hasElectronApi() }">
    <WidgetBaseDialog ref="windowRef" class="search-window" :body-padding="0" :title="t('search.title')">
      <template #body>
        <div ref="bodyRef" class="dialog-body">
          <div class="px-4 pt-2 w-full flex gap-2">
            <el-input
              v-model="keyword"
              size="large"
              class="round-border flex-1"
              :placeholder="t('search.placeholder')"
              @keydown.enter="search"
            >
              <template #prefix>
                <Search />
              </template>
            </el-input>
            <el-button size="large" @click="AppApi.openWidgetPackageManagerWindow()">
              <template #icon>
                <Install />
              </template>已安装管理
            </el-button>
          </div>
          <WidgetTags v-model="selectedCategory" class="px-4 pt-2" @change="search" />
          <el-scrollbar :height="height - 140">
            <el-row v-loading="loading" justify="start" class="px-4">
              <template v-if="selectedCategory == 'wish'">
                <FeatureWallList />
              </template>
              <template v-else>
                <template v-if="widgets.length == 0 && selectedCategory == 'debug'">
                  <div class="flex flex-col gap-4 items-center justify-center w-full" style="height: 70vh">
                    <Code size="48" />
                    <div>{{ t('search.developerTip') }}</div>
                    <el-button type="primary" @click="goDevPage">
                      {{ t('search.devDoc') }}
                    </el-button>
                  </div>
                </template>

                <template v-for="item in widgets" :key="item.name">
                  <el-col :span="12">
                    <div class="grid-content ep-bg-purple" />
                    <SearchItem :key="item.name" :widget="item as WebWidget" />
                  </el-col>
                </template>
              </template>
            </el-row>
          </el-scrollbar>
          <DropMask v-show="isShowMask" />
        </div>
      </template>
    </WidgetBaseDialog>
  </div>
</template>

<style lang="scss" scoped>
.browser{
  background-color: #e7e7e7;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .search-window{
    max-width: 1100px;
    max-height: 800px;
  }
}
@import '@/assets/scss/theme.scss';

.dialog-wrapper {
  .dialog-body {
    position: relative;
    height: calc(100vh - 42px);
    background-color: $fill-color-default;
  }
}

.footer:not(*) {
  padding: 0;
}

.el-col:nth-child(odd) {
  padding-right: 10px;
}

.el-col:nth-child(even) {
  padding-left: 10px;
}
</style>
