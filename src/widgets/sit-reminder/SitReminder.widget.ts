import {
  DeployMode,
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.sit_reminder'
// 组件标题
const title = { 'zh-CN': '久坐提醒' }
// 组件描述
const description = { 'zh-CN': '设置间隔，定时提醒，适合长期久坐的人群' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const url = '/widget/sit_reminder'
// 配置页路由地址
const configUrl = '/widget/config/sit_reminder'
// 组件关键词
const SitReminderWidgetDefine = new Widget({
  name,
  title,
  description,
  keywords,
  lang: 'zh-CN',
  width: 4,
  height: 2,
  minWidth: 4,
  maxWidth: 4,
  categories: ['utilities'],
  minHeight: 2,
  previewImage: '/images/preview_sit_reminder.png',
  maxHeight: 2,
  backgroundThrottling: false,
  supportDeployMode: DeployMode.BACKGROUND,
  path: url,
  configPagePath: configUrl,
})

export default SitReminderWidgetDefine
