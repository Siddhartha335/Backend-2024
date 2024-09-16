import express from "express";
import userRouter from "./src/routes/userRoute.js";
import connection from "./src/models/index.js";

const app = express();

app.use(express.json());

//insert user to database

app.use("/users", userRouter);

app.listen(8000, async () => {
  console.log("Server started on port 8000.");

  try {
    await connection.authenticate();
    connection.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
