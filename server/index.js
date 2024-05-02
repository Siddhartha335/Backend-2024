// const http = require("node:http");
// const fs = require("node:fs");
// const url = require("url");

// const server = http.createServer((req, res) => {
//   // console.log(req.headers)
//   if (req.url === "/favicon.ico") {
//     return res.end("");
//   }
//   const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`;
//   const myurl = url.parse(req.url,true);
// //   console.log(myurl);
//   fs.appendFile("log.txt", log, () => {
//     switch (myurl.pathname) {
//       case "/":
//         res.writeHead(200);
//         res.end("<p>Hello from Homepage</p>");
//         break;
//       case "/about":
//         res.writeHead(200);
//         const {name} = myurl.query;
//         res.end(`<p>Hello from ${name}</p>`);
//         break;
//       case "/contact":
//         res.writeHead(200);
//         res.end("<p>Hello from contact page</p>");
//         break;
//       default:
//         res.end("<p>404 Not found!");
//     }
//   });
// });

// server.listen(3001, () => {
//   console.log("Server has started on port 3001!");
// });


const express = require("express");

const app = express();

app.get("/",(req,res)=> {
    res.send("<p>Hello from home route!</p>")
})

app.get("/about",(req,res)=> {
    res.send("<p>Hello from about page!</p>")
})

app.listen(3000,()=> {
    console.log("Server started on port 3000!");
})
