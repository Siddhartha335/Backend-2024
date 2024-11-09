import express from "express"
import redis from "./client.js"

const app = express()
const PORT =8000

app.get("/", async(req, res) => {

    const cachedvalue = await redis.get("users");

    if(cachedvalue) return  res.json(JSON.parse(cachedvalue));


   const result = await fetch("https://jsonplaceholder.typicode.com/users");
   const data = await result.json();

   await redis.set('users',JSON.stringify(data))
   await redis.expire('users', 30)

   res.json(data)
   
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})