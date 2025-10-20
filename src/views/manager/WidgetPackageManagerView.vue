<script setup lang="ts">
import { WidgetBaseDialog } from '@widget-js/vue3'
import { useWindowSize } from '@vueuse/core'
import { WidgetPackage, WidgetPackageApi } from '@widget-js/core'
import { ref } from 'vue'
import WidgetPackageItem from '@/views/manager/WidgetPackageItem.vue'

const { height } = useWindowSize()
const packages = ref<WidgetPackage[]>([])
WidgetPackageApi.getPackages().then((list) => {
  packages.value = list.map(it => WidgetPackage.parseObject(it))
})

async function uninstallPackage(pkg: WidgetPackage) {
  await WidgetPackageApi.uninstall(pkg.name)
  packages.value = packages.value.filter(it => it.name !== pkg.name)
}
</script>

<template>
  <WidgetBaseDialog :body-padding="0" title="已安装管理">
    <template #body>
      <el-scrollbar :height="height - 48">
        <div class="p-4 flex flex-col gap-2">
          <WidgetPackageItem v-for="item in packages" v-show="item.name != 'cn.widgetjs.widgets'" :key="item.name" :widget-package="item" @uninstall="uninstallPackage" />
        </div>
      </el-scrollbar>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">

</style>
