import type { RouteRecordRaw } from 'vue-router'
import PhotoWidgetDefine from './Photo.widget'

const url = PhotoWidgetDefine.path
const name = PhotoWidgetDefine.name

const configUrl = PhotoWidgetDefine.configPagePath!.split('?')[0]

const PhotoWidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.photo" */ './PhotoWidgetView.vue'),
  },
  {
    path: configUrl!,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.photo.config" */ './PhotoConfigView.vue'),
  },
]

export default PhotoWidgetRoutes
