import {
  BackgroundWidget,
  DeployMode,
  WidgetKeyword,
} from '@widget-js/core'

const name = 'cn.widgetjs.widgets.phone_reminder'
// 组件标题
const title = { 'zh-CN': '来电提醒' }
// 组件描述
const description = { 'zh-CN': '用灵动通知加语音，提醒重要事项' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const url = '/widget/phone_reminder'
// 组件关键词
const PhoneReminderWidgetDefine = new BackgroundWidget({
  name,
  title,
  description,
  keywords,
  lang: 'zh-CN',
  supportDeployMode: DeployMode.BACKGROUND,
  categories: ['fun'],
  previewImage: '/images/preview_phone_reminder.png',
  path: url,
  configPagePath: '/widget/config/phone_reminder?frame=true&transparent=false',
})

export default PhoneReminderWidgetDefine
