import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.wave_progress'
const title = { 'zh-CN': '波浪进度' }
// 组件标题
const description = { 'zh-CN': '用波浪显示事件进度' }
// 组件描述
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
const lang = 'zh-CN'
const path = '/widget/wave_progress'
const width = 1
const height = 2
const minWidth = 1
const maxWidth = 3
const minHeight = 2
const maxHeight = 7
const WaveProgressWidgetDefine = new Widget({
  path,
  configPagePath: '/widget/config/wave_progress?frame=true&transparent=false&width=600&height=390',
  name,
  title,
  categories: ['time'],
  description,
  keywords,
  lang,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  socialLinks: [
    { name: 'github', link: 'https://github.com/widget-js/widgets' },
  ],
  previewImage: '/images/preview_wave_progress.png',
})
export default WaveProgressWidgetDefine
