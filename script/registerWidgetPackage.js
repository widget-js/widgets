const WebSocket = require("ws");
const {WebSocketEvent, WebSocketEventType} = require("@widget-js/core");
const registerWidgetPackage = (widgetPackage) => {
  if (process.env.NODE_ENV === 'development') {
    const url = `ws://127.0.0.1:3506`;
    const ws = new WebSocket(url)
    ws.onopen = () => {
      for (let widget of widgetPackage.widgets) {
        widget.packageName = widgetPackage.name
      }
      let webSocketEvent = new WebSocketEvent(WebSocketEventType.RESISTER_WIDGETS, widgetPackage);
      let data = JSON.stringify(webSocketEvent);
      console.log(data);
      ws.send(data);
      ws.close();
    }
  }
}
module.exports = registerWidgetPackage
