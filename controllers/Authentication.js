const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded())

const Authentication = (req,res,next) =>{
console.log("authenticted, now proceed to next()")
next()
}

module.exports = Authentication
