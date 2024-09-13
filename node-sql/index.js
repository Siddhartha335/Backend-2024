import express from "express"
import userRouter from "./routes/userRoute.js"

const app = express();

app.use(express.json())

//insert user to database

app.use("/users",userRouter)



app.listen(8000, ()=> {
    console.log("Server started on port 8000.");
})