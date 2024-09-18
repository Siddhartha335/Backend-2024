import express from "express"
import { setUser } from "./services/auth.js";
import cors from "cors"

const app = express();

app.use(express.json())

app.use(cors());

app.post("/login", (req,res)=> {
    // const {email,password} = req.body
    const token = setUser(req.body)
    res.json({token});
})


app.listen(8000, ()=> {
    console.log("Server started on port 8000!")
})