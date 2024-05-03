const express = require("express");
let users = require("../MOCK_DATA1.json");
const fs = require("node:fs")
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
// const PORT = 3000;

//Middlewares
// app.use(express.urlencoded({extended:false}))
router.use(express.urlencoded({extended:false}))

router.use((req,res,next)=> {
  // console.log("Hello from middleware1");
  // req.myUserName = "Siddhartha Raut"
  // res.json({msg:"Hello from middleware1"})
  fs.appendFile("log1.txt",`${Date.now()}: ${req.method} ${req.ip} ${req.path}\n`,(err)=> {
    if(err) {
      throw new Error(`There is an error in ${err}`)
    } else {
      console.log("Succesfully created an log file!");
    }
  })
  next();
})

router.get("/",(req,res)=> {
  res.json(users)
})

//It is used for cross platform apps like react, flutter etc
router.get("/api/users",(req,res)=> {
  // console.log(`My name is ${req.myUserName}`)
  res.setHeader("X-MyName","Siddhartha"); //custom headers  always add x- to custom headers
  res.json(users)
})

//It is used to directly render the HTML
router.get("/users",(req,res)=> {
  const html = `<ul>
      ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
  </ul>`
  res.send(html)
})

//Route Chaining

router.route("/api/users/:id").
get((req,res)=> {
  const id = Number.parseInt(req.params.id);
  const specific_user = users.filter((user)=> user.id === id);
  if(specific_user.length==0) {
    return res.status(404).json({msg:"No user found!"})
  }
  else {
    res.json(specific_user);
  }
}).
patch((req,res)=> {
  const id = Number.parseInt(req.params.id);
  let specific_user = users.find((user)=> user.id === id);
  const {first_name,email} = req.body
  let updatedUser = { ...specific_user,first_name,email}

  const existingUserIndex = users.findIndex((user)=> user.id === updatedUser.id)

  if(existingUserIndex !== -1) {
    users[existingUserIndex] = updatedUser
  }
  else {
    users.push(updatedUser)
  }

  fs.writeFile("MOCK_DATA1.json",JSON.stringify(users),(err)=> {
    if(err) {
      throw new Error(`Error in patch request ${err}`);
    }
    else {
      console.log("Succesfully handle patch request!");
      res.json({msg:"Succesfully handled patch request!"})
    }
  })


}).
delete((req,res)=> {
  const id = Number.parseInt(req.params.id);
  let specific_users = users.filter((user)=> user.id !== id);

  fs.writeFile("MOCK_DATA1.json",JSON.stringify(specific_users),(err)=> {
    if(err) {
      throw new Error(`Error in handling delete request ${err}`)
    }
    else {
      console.log("Succesfully handling delete requests!")
      res.json({msg:"Sucesfully deleted specific path id"})
    }
  })
})

//Dynamic path parameter: represented by colon
// app.get("/api/users/:id",(req,res)=> {
//   const id = Number.parseInt(req.params.id);
//   const specific_user = users.filter((user)=> user.id === id);
//   res.json(specific_user);
// })

//post request

router.post("/api/users",(req,res)=> {
  let body = req.body;
  body = {id:users.length+1, ...body}
  users = [body, ...users]
  // console.log(body);
  fs.writeFile("MOCK_DATA1.json",JSON.stringify(users),(err) => {
    if(err) {
      throw new Error(`There is an ${err}`)
    }
    else {
      console.log("Succesfully added to the file!");
      res.status(201).json ({msg:"Success"})
    }
  })
})

// app.listen(PORT,()=> {
//   console.log(`Server started on port ${PORT}`);
// })

app.use("/.netlify/functions/index", router);
module.exports.handler = serverless(app);