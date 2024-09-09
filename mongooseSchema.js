const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const secretKetSchema = new mongoose.Schema({
  secretKey:{type:String},
  jwt:{type:String},
  password: { type: Number},
  username: { type: String}
  // Add more fields as per your product requirements
});

const userDetailsSchema = new mongoose.Schema({
    password: { type: Number},
    username: { type: String}
    // Add more fields as per your product requirements
  });

const mongSchemaSecretKey = mongoose.model('secretkey', secretKetSchema);
const mongSchemaUserDets = mongoose.model('userdetails', userDetailsSchema);
module.exports = {mongSchemaSecretKey,mongSchemaUserDets}