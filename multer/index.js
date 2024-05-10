const express = require("express")
const path = require("node:path")
const multer = require("multer")

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        return cb(null,"./uploads");
    },
    filename:function (req,file,cb){
        return cb(null,`${Date.now()} - ${file.originalname}`);
    },
})

const upload = multer({storage})

//Midllewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Setting an view engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.get("/",(req,res)=> {
    res.render("home")
})

app.post("/upload",upload.single("profile"),(req,res)=> {
    console.log(req.file)

    res.redirect("/")
})

app.listen(PORT,()=> {
    console.log("Server startd on port",PORT)
})