import redis from "./client.js";

async function init() {
    // await redis.lpush("mylist", "Hello", "World")
    const result = await redis.lrange("mylist", 0, -1)
    console.log(result)
    // await redis.blpop("mylist", 20)
}

init()