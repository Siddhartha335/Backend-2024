import redis from "./client.js";

async function init() {
    const bikeFields = await redis.hset("bike:1",{
        model:"Audi 8",
        color:"Red",
        brand:"Audi",
        price:5000
    })

    console.log(`Number of feilds were added: ${bikeFields}`)

    const model = await redis.hget("bike:1","model")
    console.log(model)

    const price = await redis.hget("bike:1","price")
    console.log(price)
}

init();