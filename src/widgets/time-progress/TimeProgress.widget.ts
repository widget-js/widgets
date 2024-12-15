import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.time_progress'
const title = { 'zh-CN': '时间进度' }
// 组件标题
const description = { 'zh-CN': '年、月、周、日进度剩余百分比' }
const keywords = [WidgetKeyword.RECOMMEND]
const lang = 'zh-CN'
const TimeProgressWidgetDefine = new Widget({
  name,
  title,
  description,
  keywords,
  categories: ['time'],
  lang,
  width: 4,
  socialLinks: [
    { name: 'github', link: 'https://github.com/widget-js/widgets' },
  ],
  height: 2,
  configPagePath: '/widget/config/time_progress?frame=true&transparent=false&width=600&height=400',
  previewImage: '/images/preview_time_progress.png',
  path: '/widget/time_progress',
})
export default TimeProgressWidgetDefine
