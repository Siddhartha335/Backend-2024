const express = require('express');
const {handleNewShortUrl,handleAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/",handleNewShortUrl)

router.get("/analytics/:shortID",handleAnalytics)

module.exports = router