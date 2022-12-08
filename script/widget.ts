import WebSocket from "ws";

const url = `ws://127.0.0.1:3506`
const ws = new WebSocket(url)
ws.on("open",()=>{
  ws.send(JSON.stringify({type:"ws::fun.zujian.core.resister_widgets"},
    ))
})

ws.on("error",(e)=>{
  console.log(e)
})


