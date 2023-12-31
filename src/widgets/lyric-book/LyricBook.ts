import {
  DeployMode,
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

// TODO 修改组件信息，标题，描述，关键词
const name = 'cn.widgetjs.widgets.lyric_book'
// 组件标题
const title = { 'zh-CN': '歌词小说' }
// 组件描述
const description = { 'zh-CN': '资本家看了都会流泪的摸鱼工具' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const url = '/widget/lyric_book'
// 配置页路由地址
const configUrl = '/widget/config/lyric_book'
// 组件关键词
const LyricBookWidgetDefine = new Widget({
  name,
  title,
  description,
  keywords,
  previewImage: '/images/preview_lyric_book.png',
  lang: 'zh-CN',
  width: 10,
  height: 6,
  minWidth: 4,
  maxWidth: 12,
  minHeight: 4,
  maxHeight: 8,
  supportDeployMode: DeployMode.OVERLAP,
  path: url,
  configPagePath: configUrl,
})

export default LyricBookWidgetDefine
