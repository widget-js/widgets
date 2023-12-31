import {
  DeployMode,
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.key_stroke'
// 组件标题
const title = { 'zh-CN': '键盘演示' }
// 组件描述
const description = { 'zh-CN': '在屏幕显示每一次快捷键敲击' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const url = '/widget/key_stroke'
// 配置页路由地址
const configUrl = undefined
// 组件关键词
const KeyStrokeWidgetDefine = new Widget({
  name,
  title,
  description,
  keywords,
  lang: 'zh-CN',
  width: 4,
  height: 3,
  minWidth: 4,
  maxWidth: 4,
  minHeight: 3,
  maxHeight: 3,
  supportDeployMode: DeployMode.BACKGROUND,
  backgroundThrottling: false,
  permissions: ['keyboard'],
  movable: false,
  previewImage: '/images/preview_keystroke.png',
  path: url,
  configPagePath: configUrl,
})

export default KeyStrokeWidgetDefine
