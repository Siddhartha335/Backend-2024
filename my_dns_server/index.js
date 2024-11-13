const dgram = require('node:dgram');
const dnsPacket = require('dns-packet');
const server = dgram.createSocket('udp4');

const db = {
    'sraut.com':'127.0.0.1',
    "www.sraut.com":'123.0.0.1',
}

server.on('message', (msg, rinfo) => {
    const incomingRequest = dnsPacket.decode(msg);
    const ipFromDb = db[incomingRequest.questions[0].name];
    const ans = dnsPacket.encode({
        type:'response',
        id:incomingRequest.id,
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions:incomingRequest.questions,
        answers: [{
            type:"A",
            class:"IN",
            name:incomingRequest.questions[0].name,
            data:ipFromDb
        }]
    })

    server.send(ans,rinfo.port,rinfo.address)

    // console.log(
    //     {msg:incomingRequest.questions,
    //     rinfo:rinfo}
    // );
});

server.bind(53,()=> {
    console.log('UDP server listening on port 53');
});