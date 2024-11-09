import redis from "./client.js";

async function init() {

    await redis.sadd('ip', '127.0.0.1')
    await redis.sadd('ip', '244.178.44.111')
    const result  = await redis.smembers('ip')

    const checkMember = await redis.sismember('ip', '127.0.0.1')

    console.log(`Result -> ${result}`)
    console.log(checkMember)

}

init()