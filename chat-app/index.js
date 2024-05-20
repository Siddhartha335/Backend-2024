const express = require("express")
const http = require("node:http")
const path = require("node:path")
const {Server} = require("socket.io")

const app = express()

app.use(express.static(path.resolve("./public")))

const server = http.createServer(app)
const io = new Server(server)

//Socket.io
io.on("connection",(socket)=> {
    // console.log("A new user connected!",socket.id)
    socket.on("user-message",(message)=> {
        // console.log(message)
        io.emit('message',message)
    })
})


//HTTP reqs
app.get("/",(req,res)=> {
    res.sendFile("index.html")
})

server.listen(3000,()=> {
    console.log("Server started on port 3000")
})