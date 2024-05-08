const express = require("express");

const router = express.Router();

const {handleUserSignUp} = require("../controllers/user")

router.post("/",handleUserSignUp);

module.exports = router;
