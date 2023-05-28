// import { ref, watch } from 'vue'
// import { CubicBezierPoints, EasingFunction, useTransition } from '@vueuse/core'
// import { BrowserWindowApi } from '@widget-js/core'
// import { MaybeRef } from '@vueuse/shared'
//
// export interface UseBrowserWindowAnimationOptions {
//   transition?: MaybeRef<EasingFunction | CubicBezierPoints>
//   duration?: MaybeRef<number>
//   delay?: MaybeRef<number>
//   /**
//    * Disables the transition
//    */
//   disabled?: MaybeRef<boolean>
// }
//
// export function useBrowserWindowAnimation(options: UseBrowserWindowAnimationOptions) {
//   const x = ref(0)
//   const y = ref(0)
//   const width = ref(600)
//   const height = ref(800)
//   const ready = ref(false)
//
//   const animationX = useTransition(x, options)
//   const animationY = useTransition(y, options)
//   const animationWidth = useTransition(width, options)
//   const animationHeight = useTransition(height, options)
//
//   BrowserWindowApi.getBounds().then((bounds) => {
//     x.value = bounds.x
//     y.value = bounds.y
//     width.value = bounds.width
//     height.value = bounds.height
//     ready.value = true
//   })
//
//   watch([animationX, animationY, animationWidth, animationHeight], async ([x, y, width, height]) => {
//     if (ready.value) {
//       await BrowserWindowApi.setBounds({ x, y, width, height }, false)
//     }
//   })
//
//   return { ready, x, y, width, height }
// }
