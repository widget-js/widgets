import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.wave_progress";
const title = {"zh-CN": "波浪进度"};
//组件标题
const description = {"zh-CN": "用波浪显示事件进度"};
//组件描述
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const lang = "zh-CN"
const url = "/widget/wave_progress";
const configUrl = "/widget/config/wave_progress";
const width = 1;
const height = 2;
const minWidth = 1;
const maxWidth = 3;
const minHeight = 2;
const maxHeight = 7;
const WaveProgressWidgetDefine = new Widget({
  name, title, description, keywords, lang, width, height, maxWidth, maxHeight, minWidth, minHeight,
  routes: [
    {
      url: url,
      name: 'index'
    },
    {
      url: configUrl,
      name: 'config'
    },
  ]
})

export default WaveProgressWidgetDefine;




