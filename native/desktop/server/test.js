const WebSocket = require('ws');

console.log("开始建立通讯");

const ws = new WebSocket('ws://127.0.0.1:9233');

ws.on('open', function() {
  console.log("已连接，正在发送验证信息")
  ws.send('execute system shakehand node2\n');
});

ws.on('message', function(data) {
  console.log(data);
});

ws.on('error', function(err){
    console.log(err);
});