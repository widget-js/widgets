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
const url = '/widget/time_progress'
const width = 4
const height = 2
const minWidth = 2
const maxWidth = 4
const minHeight = 2

const maxHeight = 2
const TimeProgressWidgetDefine = new Widget({
  name,
  title,
  description,
  keywords,
  categories: ['time'],
  lang,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  configPagePath: '/widget/config/time_progress?frame=true&transparent=false',
  previewImage: '/images/preview_time_progress.png',
  path: url,
})
export default TimeProgressWidgetDefine
