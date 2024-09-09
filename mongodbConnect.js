const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/projectmongo")
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

  module.exports = mongoose
  

