require("dotenv").config()

const express = require("express")
const path = require("node:path")
const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")
const {connectToMongoDB} = require("./connections")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

const app = express();
const PORT = process.env.PORT || 3000;

//Connections
connectToMongoDB(process.env.MONGO_URL).then(()=> console.log("Connected to a database succesfully"));

//Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.use(checkForAuthenticationCookie("token"))

//Static folders
app.use(express.static(path.resolve("./public")))

//Seeting up an views
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//Routes
app.use("/",userRouter)
app.use("/blog",blogRouter)

app.listen(PORT,()=> {
    console.log("Server startd on port", PORT)
})
