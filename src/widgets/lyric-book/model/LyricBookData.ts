import {WidgetData} from "@widget-js/core";


export function readFile(filePath) {
    // 创建一个新的xhr对象
    let xhr = new XMLHttpRequest()
    if (!window.XMLHttpRequest) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    const okStatus = document.location.protocol === 'file' ? 0 : 200
    xhr!.open('GET', filePath, false)
    xhr.overrideMimeType('text/html;charset=utf-8')
    xhr.send(null)
    return xhr.status === okStatus ? xhr.responseText : null
}

export default class LyricBookData extends WidgetData {
    static readonly lineHeight = 48;
    /**
     * 当前行数位置
     */
    currentPage = 0;

    file?: string;
    /**
     * 首次使用引导
     */
    showGuide = true;

}
