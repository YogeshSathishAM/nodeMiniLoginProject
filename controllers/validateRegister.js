const express = require("express")
const app = express()
const path = require("path")

// importing jwt
const jwt = require("jsonwebtoken");

//connection to mongoDB
const mongoConnect = require("../mongodbConnect");

// import mongoSchema
const secretKeyDB = require("../mongooseSchema").mongSchemaSecretKey;
const usrDetailsDB = require("../mongooseSchema").mongSchemaUserDets;

const validateRegister = async (req,res)=>{

console.log("Enter validateRegister in controllers") 

        console.log(req.body)
        let username ="", password = 0;
        username = req.body.RegisterName
        password = req.body.RegisterPassword
        let errMsg = {data:"This password already exists, please use another password"}
        
        // to check if password has been used previously
        let findPassw = ""
        try{
         findPassw = await usrDetailsDB.find({password:password})
        }
        catch(err){
          console.log("there was erorr in searching "+err)
        }
        console.log(findPassw.length)
        
        if(findPassw.length !==0){
          res.render("register2",{errMsg})
          return;
        }
        else{
          //to enter the user details in database to store it
           console.log("to enter the user details in database to store it")
        
        usrDetailsDB.insertMany({username:req.body.RegisterName,password:req.body.RegisterPassword})
        
          res.redirect(`/TokenSetFromLoginPage?username=${req.body.RegisterName}&password=${req.body.RegisterPassword}`)
        }
        
        }

  module.exports = validateRegister
