import redis from "./client.js";

async function init() {
    
    const result = await redis.get("user:2")
    console.log("Result -> ", result)

}

init()  