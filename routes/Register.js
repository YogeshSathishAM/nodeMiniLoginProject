const express = require("express");
const app = express();
const router = express.Router()
const path = require("path");

const Register = require("../controllers/Register")

router.get("/Register", Register)

module.exports = router