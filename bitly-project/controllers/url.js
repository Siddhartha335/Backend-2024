const URL = require("../models/url");
const ids = require("short-id");

ids.configure({
  length: 8,
  algorithm: "sha1",
  salt: Math.random,
});

const handleNewURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required!" });
  let shortId = ids.generate();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy:req.user._id
  });
  // res.json({ id: shortId });
  res.render("home",{id: shortId,redirectURL:body.url})
};

const handleGetRedirectURL = async (req, res) => {
  const id = req.params.id;
  let result = await URL.findOneAndUpdate(
    { shortId:id },
    { $push: { visitHistory: { timestamp: Date.now(), } } }
  );
//   console.log(result)
  res.redirect(result.redirectURL);
};

const handleGetAnalytics = async(req,res) => {
  const id = req.params.id;
  let result = await URL.findOne({shortId:id})
  res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports = {
  handleNewURL,
  handleGetRedirectURL,
  handleGetAnalytics
};
