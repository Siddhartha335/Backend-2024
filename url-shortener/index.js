const path = require("node:path");
const express = require("express");
const useRouter = require("./routes/url");
const handleConnection = require("./connection");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

//Connections
handleConnection("mongodb://127.0.0.1:27017/shortURL");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", useRouter);

app.use("/", staticRouter);

app.use("/user",userRoute);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find();
  // console.log(typeof allUrls);
  res.render("home", {
    urls: allUrls,
  });
});

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortID },
    {
      $push: {
        totalClicks: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // res.send(entry.redirectURL);
  // res.redirect(entry.redirectURL);

  // console.log(entry.redirectURL)
});

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
