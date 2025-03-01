<script lang="ts" setup>
import { useCssVar, useDebounceFn, useWindowSize } from '@vueuse/core'
import { nextTick, onMounted, ref } from 'vue'
import type { BroadcastEvent, Rectangle } from '@widget-js/core'
import { AppApi, AppApiEvent, GridRect } from '@widget-js/core'
import { useAppBroadcast } from '@widget-js/vue3'
import { useRoute } from 'vue-router'
import consola from 'consola'
import { GridSystemDrawer } from '@/views/desktop/GridSystemDrawer'
import { GridSystem } from '@/views/desktop/GridSystem'

const { width: windowWidth, height: windowHeight } = useWindowSize()
const hintRef = ref<HTMLDivElement>()
const route = useRoute()

let gridSystemDrawer: GridSystemDrawer

const x = useCssVar('--hint-x', hintRef)
const y = useCssVar('--hint-y', hintRef)
const width = useCssVar('--hint-width', hintRef)
const height = useCssVar('--hint-height', hintRef)
const gridSystem = ref<GridSystem>()
const updateGrid = useDebounceFn((bounds: Rectangle) => {
  const gridRect = new GridRect(bounds.x - gridSystem.value!.screenLeft!, bounds.y - gridSystem.value!.screenTop!, bounds.width, bounds.height)
  const rect = gridSystemDrawer.gridSystem.snapWindow(
    gridRect,
    gridSystem.value!.cellSize,
    bounds.width,
    gridSystem.value!.cellSize,
    bounds.height,
  )
  x.value = `${rect.left}px`
  y.value = `${rect.top}px`
  width.value = `${rect.width}px`
  height.value = `${rect.height}px`
}, 100)

useAppBroadcast(
  [AppApiEvent.MOVING_GRID_WINDOW, AppApiEvent.STOP_MOVING_GRID_WINDOW],
  async (event: BroadcastEvent) => {
    if (event.event == AppApiEvent.MOVING_GRID_WINDOW) {
      updateGrid(event.payload)
    }
  },
)

onMounted(async () => {
  await nextTick()
  const cellSize = (await AppApi.getGridCellSize()) as number
  consola.log('cellSize', cellSize)
  gridSystem.value = new GridSystem(
    cellSize,
    16,
    windowWidth.value,
    windowHeight.value,
    Number.parseInt(route.query.x as string),
    Number.parseInt(route.query.y as string),
  )

  gridSystemDrawer = new GridSystemDrawer(gridSystem.value!)
})
</script>

<template>
  <!--  <div ref="block" :style="style" class="block"></div> -->
  <canvas id="canvas" :width="windowWidth" :height="windowHeight" />
  <div ref="hintRef" class="hint" />
<!--  <div class="dev-info" v-if="route.query['dev']"> -->
<!--    <ul> -->
<!--      <li>screenLeft:{{ gridSystem?.screenLeft }}</li> -->
<!--      <li>screenTop:{{ gridSystem?.screenTop }}</li> -->
<!--      <li>left:{{ gridSystem?.left }}</li> -->
<!--      <li>top:{{ gridSystem?.top }}</li> -->
<!--      <li>bottom:{{ gridSystem?.bottom }}</li> -->
<!--      <li>right:{{ gridSystem?.right }}</li> -->
<!--      <li>width:{{ route.query['width'] }}</li> -->
<!--      <li>height:{{ route.query['height'] }}</li> -->
<!--    </ul> -->
<!--  </div> -->
</template>

<style scoped lang="scss">
html,
body,
.grid {
  margin: 0;
  overflow: hidden;
}

.grid {
  position: absolute;
  display: block;
  background-image: repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
  background-size: calc(96px + 16px) calc(96px + 16px);
  overflow: hidden;
}

.block {
  width: 110px;
  position: absolute;
  height: 110px;
  border-radius: 0.5rem;
  background: rgba(205, 13, 13, 0.53);
  z-index: 3;
}

#canvas {
  position: absolute;
  z-index: 1;
}

.hint {
  --hint-x: 5000;
  --hint-y: 5000;
  --hint-width: 1px;
  --hint-height: 1px;
  position: absolute;
  z-index: 2;
  left: var(--hint-x);
  top: var(--hint-y);
  width: var(--hint-width);
  height: var(--hint-height);
  background-color: rgba(0, 0, 0, 0.30);
  transition: all 0.2s ease-out;
}

.dev-info {
  font-weight: bold;
  text-align: right;
  position: absolute;
  color: #09244b;
  bottom: 16px;
  right: 16px;
}
</style>
