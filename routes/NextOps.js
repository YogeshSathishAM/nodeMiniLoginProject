const express = require("express");
const app = express();
const router = express.Router()
const path = require("path");

const NextOps = require("../controllers/NextOps")

router.get("/", NextOps)

module.exports = router