import WebSocket from "ws";
import {WebSocketEvent, WebSocketEventType} from "@widget-js/core";
import consola from "consola";

const registerWidgetPackage = async (widgetPackage) => {
    if (process.env.NODE_ENV === 'development') {
        if (!widgetPackage.devOptions.devUrl) {
            consola.error("注册组件失败，没有配置开发链接devUrl，示例：http://127.0.0.1:8080")
            return
        }
        const url = `ws://127.0.0.1:3506`;
        const ws = new WebSocket(url)
        ws.onerror = () => {
            consola.error("注册组件失败，客户端可能没有启动，或者端口占用")
        }
        ws.onopen = () => {
            widgetPackage.url = widgetPackage.devOptions.devUrl;
            for (const widget of widgetPackage.widgets) {
                widget.packageName = widgetPackage.name;
            }
            const webSocketEvent = new WebSocketEvent(WebSocketEventType.RESISTER_WIDGETS, widgetPackage);
            consola.info(`Widgets size:${widgetPackage.widgets.length}`);
            widgetPackage.widgets.forEach((it) => {
                consola.info(it.name);
            });
            const data = JSON.stringify(webSocketEvent);
            ws.send(data);
            ws.close();
        }
    }
}

export default registerWidgetPackage;
