import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.photo'
// 组件标题
const title = { 'zh-CN': '轮播相册' }
// 组件描述
const description = { 'zh-CN': '轮播文件夹内的图片' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const path = '/widget/photo'
// 配置页路由地址
const configUrl = '/widget/config/photo'
// 组件关键词
const PhotoWidgetDefine = new Widget({
  previewImage: '/images/preview_photo.png',
  path,
  name,
  title,
  description,
  keywords,
  lang: 'zh-CN',
  width: 2,
  categories: ['fun'],
  height: 2,
  minWidth: 1,
  maxWidth: 6,
  minHeight: 1,
  maxHeight: 6,
  configPagePath: configUrl,
})

export default PhotoWidgetDefine
