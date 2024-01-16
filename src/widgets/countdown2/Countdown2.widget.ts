import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.countdown2'
// 组件标题
const title = { 'zh-CN': '倒计时' }
// 组件描述
const description = { 'zh-CN': '简单的倒计时组件，支持农历' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const url = '/widget/countdown2'
// 配置页路由地址
const configUrl = '/widget/config/countdown2'
// 组件关键词
const Countdown2WidgetDefine = new Widget({
  path: url,
  configPagePath: configUrl,
  name,
  title,
  description,
  keywords,
  previewImage: '/images/preview_countdown2.png',
  lang: 'zh-CN',
  width: 2,
  height: 2,
  minWidth: 2,
  maxWidth: 4,
  minHeight: 2,
  maxHeight: 4,
})

export default Countdown2WidgetDefine
