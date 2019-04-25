let sockets = {};

const shakehandReg = /^execute system shakehand ([0-9a-zA-Z]+)\s*$/;

function createSocket(conn){
    let chunks = "";
    let listener = conn.on('message', n => {
        chunks += n;
        if(chunks.indexOf('\n') != -1){
            // 换行代表握手指令发送完毕
            let match = shakehandReg.exec(chunks)
            if(match){
                // 识别正确，创建新 Socket
                let src = match[1];
                console.log("已与 " + src + "建立连接！");
                conn.send("data system shakehand success\n");
                conn.removeListener(listener);
                socket[src] = new Socket(conn, src);
            }else{
                // 识别错误，拒绝连接
                console.log("检测到一个连接，但由于无法识别握手内容而失败：" + chunks);
                conn.close();
            }
        }
    })
}

function sendMessage(src, cmd){
    if(!src in sockets) throw new Error("没有名为 " + src + " 的 socket 连接！");
    sockets[src].socket.send(cmd);
}

function receiveMessage(src, cmd){
    try{
        console.log("接收到了来自 " + src + " 的指令 " + cmd + "！");
        commandParse(src, cmd);
    }catch(e){
        console.error(e.what());
    }
}

class Socket{
    constructor(conn, src){
        this.socket = conn;
        this.src = src;

        // 由于一次可能会传输多行，或一次性没传完完整的数据
        // 所以需要一个缓冲区变量
        let chunks = "";
        conn.on('message', n => {
            chunks += n;
            let pos = chunks.indexOf('\n');
            while(pos != -1){
                // 有完整结束的一行，开始处理命令
                receiveMessage(src, chunks.slice(0, pos));
                chubks = chunks.slice(pos + 1);
                pos = chunks.indexOf('\n');
            }
        });
        conn.on('close', () => {
            console.log("连接 " + name + " 已关闭。");
            delete sockets[name];
        })
    }
}