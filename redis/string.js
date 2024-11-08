import redis from "./client.js";

async function init() {
    // await redis.set("msg:3", "Yo man! how are you?")
    await redis.expire("msg:3", 10)
    const result = await redis.get("msg:3")
    console.log("Result -> ", result)

}

init()  