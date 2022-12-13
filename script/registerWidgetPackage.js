const WebSocket = require("ws");
const {WebSocketEvent, WebSocketEventType} = require("@widget-js/core");
const consola = require("consola");
const registerWidgetPackage = async (widgetPackage) => {
  if (process.env.NODE_ENV === 'development') {
    const url = `ws://127.0.0.1:3506`;
    const ws = new WebSocket(url)
    ws.onerror = () => {
      consola.error("注册组件失败，客户端可能没有启动，或者端口占用")
    }
    ws.onopen = () => {
      for (let widget of widgetPackage.widgets) {
        widget.packageName = widgetPackage.name
      }
      let webSocketEvent = new WebSocketEvent(WebSocketEventType.RESISTER_WIDGETS, widgetPackage);
      let data = JSON.stringify(webSocketEvent);
      ws.send(data);
      ws.close();
    }
  }
}
module.exports = registerWidgetPackage
