import { Widget, WidgetKeyword } from '@widget-js/core'

const name = 'cn.widgetjs.widgets.birthday_list'
//组件标题
const title = { 'zh-CN': '生日列表' }
//组件描述
const desc = { 'zh-CN': '自动倒计时的生日列表' }
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
const path = '/widget/birthday_list'
const configPagePath = '/widget/config/birthday_list?win_width=1100&win_height=900'
const BirthdayListWidgetDefine = new Widget({
  name: name,
  title: title,
  description: desc,
  keywords: keywords,
  lang: 'zh-CN',
  width: 4,
  previewImage: '/images/preview_birthday_list.png',
  height: 4,
  minWidth: 3,
  maxWidth: 4,
  minHeight: 3,
  maxHeight: 6,
  path: path,
  configPagePath: configPagePath
})

export default BirthdayListWidgetDefine
