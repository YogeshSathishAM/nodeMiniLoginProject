const express = require("express");
const app = express();
const router = express.Router()

const TokenSetFromLoginPage = require("../controllers/TokenSetFromLoginPage")
const ComnfromRegistPage = require("../controllers/ComnfromRegistPage")


router.post("/TokenSetFromLoginPage", TokenSetFromLoginPage)
router.get("/TokenSetFromLoginPage", ComnfromRegistPage)

module.exports = router