const express = require("express");
const {connectToMongoDB} = require("./connection")
const path = require("node:path")
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly,checkAuth} = require("./middlewares/auth")

const URLRouter = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
const userRouter = require("./routes/user")

const app = express()
const PORT = 3000;

//Connection of an database!
connectToMongoDB("mongodb://127.0.0.1:27017/bitly")

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

//View engines
app.set("view engine","ejs")
app.set('views',path.resolve("./views"))

//Routes
app.use("/url",restrictToLoggedInUserOnly,URLRouter)
app.use("/",checkAuth,staticRouter)
app.use("/user",userRouter)

app.listen(PORT,()=> {
    console.log("Server started on port ",PORT)
})
