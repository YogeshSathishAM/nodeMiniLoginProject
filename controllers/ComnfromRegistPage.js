const express = require("express")
const app = express()
const path = require("path")

//connection to mongoDB
const mongoConnect = require("../mongodbConnect");

// import mongoSchema
const secretKeyDB = require("../mongooseSchema").mongSchemaSecretKey;
const usrDetailsDB = require("../mongooseSchema").mongSchemaUserDets;

const ComnfromRegistPage = async(req,res)=>{ // in trecirection, the req and res will be empty especially when redirected to get request URL
    
    // import the JWT after installing it
    const jwt = require("jsonwebtoken");
  
let username = req.query.username
let password = req.query.password
console.log("in ComnfromRegistPage "+username+" "+password)

   // CHECKING IF THE ENTERED NAME AND PASSWORD ARE ALREADY THERE IN DB
   let searcPassAndUsern = await usrDetailsDB.find({$and:[{username:username},{password:password}]})
  console.log("searching in db for entered usrn and passd")
  console.log(searcPassAndUsern.length)
  
  let errMsg = {data:"The username or password is not matching, please register first"}
  
  if(searcPassAndUsern.length === 0){ // if no user found then send to register page
      res.render("register2",{errMsg})
      return
  }
  
  // CREATE SECRETKEY AND STORE IN DB
  let secretKey = require("crypto").randomBytes(64).toString("hex");
    //console.log(process.env.secretKey); this is used to get secretKey from .env if we are taking secretKey from .env and not from DB
    
    // to create the jwt
    // secretKey = process.env.secretKey; // getting secretkey that is stored in .env file using process.env

    let jToken = jwt.sign(username + password, secretKey);
    console.log("The json token is: " + jToken);
  
    // saving the jwt in databases collection - secretKeyDB
    secretKeyDB
      .insertMany({username:username,password:password,jwt: jToken, secretKey:secretKey})
      .then(() => {
        console.log("jwt and secretKey inserted in db");
      })
      .catch((err) => {
        console.log("err in inserting jwt and secretKey in db " + err);
      });
  
      let user1 = ""
    // to derive the username from the jwt // thbis is actually to be done in apis where main ops occur, here for practice
    jwtVerify = jwt.verify(jToken, secretKey, (err, user) => {
      if (err) console.log("there was error while verifying jwt", +err);
  
      console.log("The user is: " + user);
      user1 = user
      req.user = user; // detailed explanation below, not really required here, just added for understanding
  
    });
    res.cookie("jToken",jToken)
  res.cookie("secretKey",secretKey)
let userDerived = {userValue:"Welcome to Homepage "+user1}
  //res.sendFile(__dirname + "../views" + "/index2.html"); // this doesnt work
  //res.sendFile(path.join(__dirname,'../views','wlcmPage.html'))  // works for normal html file withput res.render
  res.render("wlcmPage",{userDerived})
}

  module.exports = ComnfromRegistPage