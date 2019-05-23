import PluginDashboard from "./pluginDashboard";
import { EventEmitter } from 'events';
let WebSocket = eval('require\("ws"\)');

const server = new WebSocket.Server({ port: 9233 }, () => console.log("已创建服务器！"));

let clients = {}

let clientConnectionEventEmitter = new EventEmitter();

server.on('connection', conn => {
    console.log("获取到了新的连接！");
    let client = new PluginDashboard(conn);
    client.register({
        'system': {
            'register': name => {
                console.log("已注册新的连接 ", name);
                clients[name] = client;
                client.register({
                    'system': { 'register': () => null }
                });
                clientConnectionEventEmitter.emit(name);
                return "ok";
            }
        }
    });
});

export let send = (client, ...data) => clients[client].send(data);

export let register = (client, obj) => clients[client].register(obj);

export let receive = (client, obj) => clients[client].receive(obj);

export let connectionEvents = clientConnectionEventEmitter;