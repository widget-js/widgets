import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.labor_progress'
// 组件标题
const title = { 'zh-CN': '打工进度' }
// 组件描述
const description = { 'zh-CN': '打工人，打工魂' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
const url = '/widget/labor_progress'

// 组件关键词
const LaborProgressWidgetDefine = new Widget({
  name,
  title,
  description,
  keywords,
  lang: 'zh-CN',
  width: 4,
  categories: ['fun'],
  height: 1,
  previewImage: '/images/preview_labor_progress.png',
  minWidth: 3,
  maxWidth: 6,
  socialLinks: [
    { name: 'github', link: 'https://github.com/widget-js/widgets' },
  ],
  minHeight: 1,
  maxHeight: 2,
  path: url,
  configPagePath: '/widget/config/labor_progress?frame=true&transparent=false',
})

export default LaborProgressWidgetDefine
