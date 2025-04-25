<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { Code, Search } from '@icon-park/vue-next'
import type { Widget } from '@widget-js/core'
import { AppApi, BrowserWindowApi, ElectronUtils, WidgetApi, WidgetPackageApi } from '@widget-js/core'

import { useDebounceFn, useElementSize } from '@vueuse/core'
import type { WidgetSearchOptions } from '@widget-js/web-api'
import { WebWidget } from '@widget-js/web-api'
import { useI18n } from 'vue-i18n'
import SearchItem from '@/views/add/SearchItem.vue'
import { WebWidgetApi } from '@/api/WebWidgetApi'
import WidgetTags from '@/views/add/WidgetTags.vue'
import FeatureWallList from '@/views/add/feature/FeatureWallList.vue'

const { t } = useI18n()
const keyword = ref('')
const selectedCategory = ref('')
const windowRef = ref()
const widgets = reactive<Widget[]>([])
const loading = ref(true)
const { height } = useElementSize(windowRef)
onMounted(async () => {
  await nextTick()
  document.title = t('search.title')
})

BrowserWindowApi.setup({ width: 750, height: 850, center: true })

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
  const options: WidgetSearchOptions = {
    page: 1,
    pageSize: 50,
    category: selectedCategory.value,
    keyword: keyword.value.trim(),
  }
  options.appVersion = version
  WebWidgetApi.search(options)
    .then((res) => {
      widgets.splice(0, widgets.length)
      widgets.push(
        ...res.data
          .map(it => WebWidget.fromObject(it))
          .filter(it => it.name != 'cn.widgetjs.widgets.dynamic_island'),
      )
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
</script>

<template>
  <div :class="{ browser: !ElectronUtils.hasElectronApi() }">
    <widget-base-dialog ref="windowRef" class="search-window" :body-padding="0" :title="t('search.title')">
      <template #body>
        <div class="body">
          <el-row justify="center" class="px-4 pt-2">
            <el-input
              v-model="keyword"
              size="large"
              clearable
              class="round-border"
              :placeholder="t('search.placeholder')"
              @keydown.enter="search"
            >
              <template #prefix>
                <Search />
              </template>
            </el-input>
          </el-row>
          <WidgetTags v-model="selectedCategory" class="px-4 pt-2" @change="search" />
          <el-scrollbar :height="height - 150">
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
        </div>
      </template>
    </widget-base-dialog>
  </div>
</template>

<style lang="scss">
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
  .body {
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
