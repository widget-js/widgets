import {Widget, WidgetKeyword} from "@widget-js/core";

const name = "cn.widgetjs.widgets.time_progress";
const title = {"zh": "时间进度"};
//组件标题
const description = {"zh": "年、月、周、日进度剩余百分比"};
const keywords = [WidgetKeyword.RECOMMEND];
const lang = "zh"
const url = "/widget/time_progress";
// const configUrl = "/widget/config/time_progress";
const width = 4;
const height = 2;
const minWidth = 4;
const maxWidth = 4;
const minHeight = 2;
const maxHeight = 2;
const TimeProgressWidgetDefine = new Widget({
    name, title, description, keywords, lang, width, height, maxWidth, maxHeight, minWidth, minHeight, url
})
export default TimeProgressWidgetDefine
