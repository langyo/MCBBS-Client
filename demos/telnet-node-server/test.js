let net = require(net);

let server = net.createServer(conn => {
    conn.write("TestS");
    conn.on('close', () => console.log("Link closed"));
    conn.on('data', data => console.log(data.toString('utf8')));
}).listen(9233);