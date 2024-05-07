const express = require("express");
const userRouter = require("./routes/user")
const {connectMongoDB} = require("./connections")

const app = express();
const PORT = 3000;

//Middlewares
app.use(express.urlencoded({ extended: false }));

//Connections of an database
connectMongoDB("mongodb://127.0.0.1:27017/mongoose");

//Routes
app.use("/users",userRouter);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



// app.use((req,res,next)=> {
//   // console.log("Hello from middleware1");
//   // req.myUserName = "Siddhartha Raut"
//   // res.json({msg:"Hello from middleware1"})
//   fs.appendFile("log1.txt",`${Date.now()}: ${req.method} ${req.ip} ${req.path}\n`,(err)=> {
//     if(err) {
//       throw new Error(`There is an error in ${err}`)
//     } else {
//       console.log("Succesfully created an log file!");
//     }
//   })
//   next();
// })