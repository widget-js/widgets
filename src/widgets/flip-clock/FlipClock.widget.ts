import { Widget, WidgetKeyword } from '@widget-js/core';
const name = 'cn.widgetjs.widgets.flip_clock';
//组件标题
const title = { 'zh-CN': '翻页时钟' };
//组件描述
const description = { 'zh-CN': '' };
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const path = '/widget/flip_clock';
//配置页路由地址
const configPagePath = undefined;
//组件关键词
const FlipClockWidgetDefine = new Widget({
  name: name,
  title: title,
  description: description,
  keywords: keywords,
  lang: 'zh-CN',
  width: 4,
  height: 2,
  minWidth: 4,
  maxWidth: 4,
  minHeight: 2,
  maxHeight: 2,
  previewImage: '修改为组件预览图地址',
  path,
  configPagePath,
});

export default FlipClockWidgetDefine;
