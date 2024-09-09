const express = require("express")
const app = express()
const path = require("path")

const Register = (req,res)=>{

     let data = {
        info:"this is the page to register your details",
        info2:"hey there"
                 }
     // res.render("register",{man:data})   this works
     res.render("register",{data})
  }

  module.exports = Register
