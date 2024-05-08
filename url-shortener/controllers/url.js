const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 8 });

const handleNewShortUrl = async (req, res) => {
  const shortID = uid.rnd();
  const body = req.body;
  if (!body) {
    res.json({ error: "body is required!" });
  }
  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    totalClicks: [],
  });
  // res.json({ id: shortID });
  res.render("home",{
    id:shortID
  })
};

const handleAnalytics = async (req, res) => {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  res.json({"TotalClicks":result.totalClicks.length,
"timestamp":result.totalClicks})
};

module.exports = {
  handleNewShortUrl,
  handleAnalytics,
};
