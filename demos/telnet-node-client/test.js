let net = require("net");

let client = net.connect(9234, 'localhost');

client.setEncoding('utf-8');

client.on('connect', () => {
    client.write('TestC\r\n');
    console.log("Get!");
});

client.on('data', conn => {
    console.log(conn.toString());
})

client.on('end', () => {
    console.log("Done!");
})