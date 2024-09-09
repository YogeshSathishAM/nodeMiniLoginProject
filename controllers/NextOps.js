
const express = require("express")
const app = express()
const path = require("path")

const NextOps = (req, res) => {
    console.log("entring nextOps in controllers");
  
    // sending the html page
    res.sendFile(path.join(__dirname,'../views','index.html')) // this works, check other format
    
  //  V V V V V V V V V V V V V V V V V V V  IMPORTANT POINT  //////////////////////////////
    //res.sendFile(__dirname+'/views/index.html')
/*
In above code, __dirname+'/views/index.html means we are finding the code in this
path : /home/niveus/Documents/Assesm&IntrvDetls/ProjectMongo/controllers/views/index.html
which is wrong since the index.html is in views folder

The __dirname variable points to the directory where the current script 
(in this case, the controller) resides.


*/
//V V V V V V V V V V V V V V V V V V V V  IMPORTANT POINT  /////////////////////////

 // here in html file unless there
    //is name="" entry in the body for any element, the response that we pass
    //from one api, is not caught in the body of the req body which gets
    // received in the req body of next api
  };

  module.exports = NextOps