import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.glitch";
//组件标题
const title = {"zh-CN": "故障时钟"};
//组件描述
const description = {"zh-CN": "Glitch"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/glitch";
//配置页路由地址
const configUrl = undefined;
//组件关键词
const GlitchWidgetDefine = new Widget({
  name: name,
  title: title,
  description: description,
  keywords: keywords,
  lang: "zh-CN",
  width: 4,
  height: 2,
  minWidth: 4,
  maxWidth: 4,
  minHeight: 2,
  maxHeight: 2,
  previewImage: '/images/preview_glitch_clock.png',
  path: url,
  configPagePath:configUrl,
})

export default GlitchWidgetDefine;
