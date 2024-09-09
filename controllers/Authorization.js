const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

app.use(cookieParser())

const jwt = require("jsonwebtoken");

// DB connection imports:

//connection to mongoDB
const mongoConnect = require("../mongodbConnect");

// import mongoSchema
const secretKeyDB = require("../mongooseSchema").mongSchemaSecretKey;
const usrDetailsDB = require("../mongooseSchema").mongSchemaUserDets;

app.use(express.json())
app.use(express.urlencoded())

const Authorization = async (req,res,next)=>{
    console.log("entered authorization folder in controllers")
    console.log(req.cookies)
let jToken = req.cookies.jToken
let secretkey = req.cookies.secretKey
console.log(jToken)
console.log("\n")
console.log(secretkey)
secretkey = secretkey.toString()
console.log(secretkey)

// getting the user from the jwt.verify method after getting the secretkey and jToken from cookies
let userFromCookies = ""
userFromCookies = jwt.verify(jToken,secretkey)
console.log(userFromCookies)

// to get the user details from DB using secretKey derived from cookies
let userFromDB = ""
let result = ""

try{
result = await secretKeyDB.find({secretKey:`${secretkey}`},{username:1,password:1,_id:0})
}
catch(error){
    console.log("There was an error in retrieving the data "+error)
}

console.log("the result retrieved from DB is:")
console.log(result)

let passwordFrmDB = result[0].password
let usernameFrmDB = result[0].username
userFromDB = usernameFrmDB+passwordFrmDB
console.log(usernameFrmDB+passwordFrmDB)

if(userFromDB===userFromCookies){
    next() }
    else{
        res.send("the validation of user failed hence you cant access this Ops API")
    }

}

module.exports = Authorization