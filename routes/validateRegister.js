const express = require("express");
const app = express();
const router = express.Router()
const path = require("path");

const validateRegister = require("../controllers/validateRegister")

router.post("/validateRegister", validateRegister)

module.exports = router