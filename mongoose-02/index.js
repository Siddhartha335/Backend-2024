const express = require("express");
const userRouter = require("./routes/user");
const connection = require("./connection");

const PORT = 8000;

const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));

//Creating an connection
connection("mongodb://127.0.0.1:27017/practice");

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
