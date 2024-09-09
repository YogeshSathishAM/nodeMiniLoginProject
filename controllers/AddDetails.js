const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded())

// DB connection imports:

//connection to mongoDB
const mongoConnect = require("../mongodbConnect");

// import mongoSchema
const secretKeyDB = require("../mongooseSchema").mongSchemaSecretKey;
const usrDetailsDB = require("../mongooseSchema").mongSchemaUserDets;

const AddDetails = (req,res,next) =>{
console.log("In addDetails file in controllers")
console.log(req.cookies) // this can be used invase we need specific user details to locate him
res.send("In addDetails file in controllers")
// usrDetailsDB.updateOne()
}

module.exports = AddDetails