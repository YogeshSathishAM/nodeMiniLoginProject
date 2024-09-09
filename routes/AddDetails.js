// NextOps.js
const express = require("express");
const router = express.Router();

// Correct the path if necessary
const AddDetails = require("../controllers/AddDetails");

router.get("/AddDetails", AddDetails)

module.exports = router;
