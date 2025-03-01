<script>
import { nextTick } from 'vue'
import Driver from 'driver.js'
import { delay } from '@/utils/TimeUtils'
import 'driver.js/dist/driver.min.css'

export default {
  name: 'TrayGuide',
  async mounted() {
    await nextTick()
    await delay(1000)
    const driver = new Driver({
      closeBtnText: '关闭',
      doneBtnText: '知道了',
      allowClose: false,
      onDeselected: (_) => {
        window.close()
      },
    })
    driver.defineSteps([{
      element: '#tray_guide',
      popover: {
        title: '托盘图标',
        description: '用鼠标右击托盘图标也可以添加组件',
      },
    }])
    driver.start()
  },
}
</script>

<template>
  <div id="tray_guide" class="tray_guide">
    <video src="../../assets/video/tray_guide.webm" autoplay loop />
  </div>
</template>

<style scoped>
* {
  overflow: hidden;
}

.tray_guide {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
