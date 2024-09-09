
const express = require("express");
const router = express.Router();

const Authorization = require("../controllers/Authorization");

router.get("/AddDetails", Authorization)

module.exports = router;
