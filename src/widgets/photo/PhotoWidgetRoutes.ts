import PhotoWidgetDefine from './Photo.widget'

const url = PhotoWidgetDefine.getIndexRoute().url
const name = PhotoWidgetDefine.name

const configUrl = PhotoWidgetDefine.getConfigRoute()!.url

const PhotoWidgetRoutes = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.photo" */ './PhotoWidget.vue')
  },
  {
    path: configUrl,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.photo.config" */ './PhotoConfigView.vue')
  }
]

export default PhotoWidgetRoutes
