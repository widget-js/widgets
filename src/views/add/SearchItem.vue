<script lang="ts">
import {
  AppApi,
  BrowserWindowApi,
  DeployMode,
  DeployedWidgetApi,
  NotificationApi,
  WidgetApi,
  WidgetPackageUtils,
  WidgetParams,
} from '@widget-js/core'
import { useBroadcastChannel } from '@vueuse/core'
import { ref } from 'vue'
import { WebWidget } from '@widget-js/web-api'
import { ArrowCircleUp } from '@icon-park/vue-next'
import { useI18n } from 'vue-i18n'
import semver from 'semver'
import WidgetContainer from '@/views/add/WidgetContainer.vue'
import { useDebugConfig } from '@/composition/useAppConfig'
import { useWidgetPackage } from '@/composition/useWidgetPackage'
import WidgetUtil from '@/utils/WidgetUtil'

export default {
  name: 'SearchItem',
  components: { WidgetContainer, ArrowCircleUp },
  props: {
    widget: {
      type: WebWidget,
      required: true,
    },
  },
  setup(props) {
    const i18n = useI18n()
    const isWidgetHosted = ref(false)
    const adding = ref(false)
    const { post } = useBroadcastChannel({ name: 'CHANNEL_MAIN' })
    const updateWidgetAdd = async () => {
      if (props.widget.isSupportBackground()) {
        const widgets = await DeployedWidgetApi.getDeployedWidgets(props.widget.name)
        if (widgets) {
          isWidgetHosted.value = widgets.length > 0
        }
        else {
          isWidgetHosted.value = false
        }
      }
    }
    const isDev = useDebugConfig()
    updateWidgetAdd()
    const remotePackage = props.widget.package
    const { upgradable, upgrading, checkUpgrade, upgradePackage } = useWidgetPackage(
      props.widget.packageName!,
      remotePackage?.version ?? '0.0.0',
      remotePackage?.remote,
    )
    return {
      upgrading,
      upgradable,
      checkUpgrade,
      upgradePackage,
      isDev,
      post,
      i18n,
      isWidgetHosted,
      updateWidgetAdd,
      adding,
    }
  },
  computed: {
    WidgetUtil() {
      return WidgetUtil
    },
    DeployMode() {
      return DeployMode
    },
  },
  mounted() {
    this.checkUpgrade()
  },
  methods: {
    BrowserWindowApi() {
      return BrowserWindowApi
    },
    async removeWidget() {
      await DeployedWidgetApi.removeDeployedWidgetByName(this.widget.name)
      await this.updateWidgetAdd()
    },
    async upgrade() {
      this.upgradePackage()
    },
    openDevTools() {
      DeployedWidgetApi.openDevTools(this.widget.name)
    },
    async addWidget(mode: DeployMode) {
      try {
        this.adding = true
        let versionPass = true
        const appVersion = await AppApi.getVersion('app')
        // If appVersion is undefined, it means the app is running at browser
        if (this.widget.requiredAppVersion && appVersion) {
          if (semver.gte(appVersion, this.widget.requiredAppVersion)) {
            versionPass = true
          }
          else {
            versionPass = false
            NotificationApi.error(
              this.i18n.t('update.upgradeToNew'),
            )
          }
        }
        if (versionPass) {
          const url = this.widget.package?.remote
            ? WidgetPackageUtils.getRemotePackageJsonUrl(this.widget.package?.remote)
            : undefined
          await DeployedWidgetApi.addWidget({
            widgetName: this.widget.name,
            deployMode: mode,
            packageJsonUrl: url,
          })
        }
      }
      finally {
        this.adding = false
      }
    },
    async addBackgroundWidget() {
      await this.addWidget(DeployMode.BACKGROUND)
      await this.updateWidgetAdd()
    },
    async openBackgroundWidgetSettings() {
      const widgetParams = new WidgetParams()
      widgetParams.id = this.widget.name
      widgetParams.name = this.widget.name
      WidgetApi.openConfigPageByName(this.widget.name)
    },
    async onClickAddNormal() {
      await this.addWidget(DeployMode.NORMAL)
    },
  },
}
</script>

<template>
  <div v-loading="adding" class="search-item">
    <div class="flex w-full">
      <div class="flex flex-col items-start">
        <span class="title">{{ widget.getTitle(i18n.locale.value) }}</span>
        <span class="desc">{{ widget.getDescription(i18n.locale.value) }} </span>
      </div>
      <div v-if="widget.socialLinks" class="ml-auto flex gap-2">
        <img v-for="social in widget.socialLinks.slice(0, 3)" :key="social.name" class="cursor-pointer h-6" :src="WidgetUtil.getSocialLinkIcon(social.name)" :alt="social.name" @click="BrowserWindowApi().openUrl(social.link, { external: true })">
      </div>
    </div>
    <WidgetContainer class="widget" :widget="widget" />
    <div class="flex gap-4">
      <div class="flex">
        <template v-if="widget.isSupportBackground()">
          <el-button v-show="widget.isConfigurable()" type="primary" round @click="openBackgroundWidgetSettings">
            {{ i18n.t("settings.title") }}
          </el-button>
          <el-button v-if="!isWidgetHosted" type="primary" round @click="addBackgroundWidget">
            {{ i18n.t("search.enable") }}
          </el-button>
          <el-button v-if="isWidgetHosted" type="danger" round @click="removeWidget">
            {{ i18n.t("search.disable") }}
          </el-button>
          <el-button v-if="isWidgetHosted && isDev" type="warning" round @click="openDevTools">
            DevTools
          </el-button>
        </template>
        <template v-else>
          <el-button v-if="widget.isSupportNormal()" type="primary" round @click="onClickAddNormal">
            {{ i18n.t("search.desktop") }}
          </el-button>
          <el-button v-if="widget.isSupportOverlap()" type="primary" round @click="addWidget(DeployMode.OVERLAP)">
            {{ i18n.t("search.overlap") }}
          </el-button>
          <el-button v-if="widget.isSupportTray()" type="primary" round @click="addWidget(DeployMode.TRAY)">
            {{ i18n.t("search.tray") }}
          </el-button>
        </template>
      </div>
      <el-button v-if="upgradable" v-loading="upgrading" type="warning" round @click="upgrade">
        <template #icon>
          <ArrowCircleUp />
        </template>
        {{ i18n.t("search.upgrade") }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sass:map";
@import "element-plus/theme-chalk/src/common/var.scss";

.search-item {
  margin-bottom: 20px;
  display: flex;
  background-color: white;
  border-radius: 16px;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: map.get($text-color, "primary");
    margin-bottom: 8px;
  }

  .desc {
    color: map.get($text-color, "secondary");
  }

  .widget {
    margin: 16px;
  }

  .buttons {
    justify-content: center;
    align-items: center;
    align-content: center;
    display: flex;

    .el-button {
      width: 70px;
    }
  }
}
</style>
