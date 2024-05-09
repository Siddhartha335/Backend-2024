const express = require('express');
const URL = require("../models/url");
const {handleNewURL,handleGetRedirectURL,handleGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.post('/',handleNewURL)

router.get("/:id",handleGetRedirectURL)

router.get("/analytics/:id",handleGetAnalytics)

module.exports = router