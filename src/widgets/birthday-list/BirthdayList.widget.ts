import { Widget, WidgetKeyword } from '@widget-js/core'

const name = 'cn.widgetjs.widgets.birthday_list'
// 组件标题
const title = { 'zh-CN': '生日列表' }
// 组件描述
const desc = { 'zh-CN': '自动倒计时的生日列表' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
const path = '/widget/birthday_list'
const BirthdayListWidgetDefine = new Widget({
  name,
  title,
  description: desc,
  keywords,
  lang: 'zh-CN',
  width: 4,
  previewImage: '/images/preview_birthday_list.png',
  height: 4,
  minWidth: 3,
  maxWidth: 4,
  minHeight: 3,
  categories: ['countdown'],
  maxHeight: 6,
  disabled: false,
  socialLinks: [
    { name: 'github', link: 'https://github.com/widget-js/widgets' },
  ],
  path,
  configPagePath: '/widget/config/birthday_list?frame=true&transparent=false',
})

export default BirthdayListWidgetDefine
