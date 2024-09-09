// NextOps.js
const express = require("express");
const router = express.Router();

// Correct the path if necessary
const Authentication = require("../controllers/Authentication");

router.get("/", Authentication)

module.exports = router;
