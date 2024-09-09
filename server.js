const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
require("dotenv").config(); // this  is for getting details from .evn file

// set the view engine to ejs
app.set('view engine', 'ejs');

//connection to mongoDB
const mongoConnect = require("./mongodbConnect");

// import mongoSchema
const secretKeyDB = require("./mongooseSchema").mongSchemaSecretKey;
const usrDetailsDB = require("./mongooseSchema").mongSchemaUserDets;

// import from Routes folder
const Authentication = require("./routes/Authentication")
const NextOps = require("./routes/NextOps")
const Register = require("./routes/Register")
const validateRegister = require("./routes/validateRegister")
const TokenSetFromLoginPage = require("./routes/TokenSetFromLoginPage")
const Authorization = require("./routes/Authorization")
const AddDetails = require("./routes/AddDetails")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser()) // this is to easily define and separate the  different data stored in cookie

const jwt = require("jsonwebtoken");

// const Authentication = require("./controllers/Authentication") // this importing is required for this format of exporting: "module.exports = Authentication"

//////////////////////////////////////////////////////////////////////////////////
//  FIRST API
app.get("/",Authentication, NextOps) // now works after disabling below apis

/////////////////////////////////////////////////////////////////////////////////
//2ND API: TO REGISTER
app.get("/Register",Register)
 
//////////////////////////////////////////////////////////////////////////////////
// 3RD API: VALIDATING DETAILS ENTERED IN REGISTER API
app.post("/validateRegister", validateRegister)

/////////////////////////////////////////////////////////////////////////////
// 4TH API : setting token
// this TOKEN API is for the user coming after logging into website
app.post("/TokenSetFromLoginPage", TokenSetFromLoginPage)
app.get("/TokenSetFromLoginPage", TokenSetFromLoginPage)
  
///////////////////////////////////////////////////////////////////////////////////////
// 5TH API : ADD DETAILS API: API AFTER LOGGING IN DIRECT OR THROUGH REGITSER API
app.get("/AddDetails",Authorization,AddDetails)

////////////////////////////////////////////////////////////////////////

// SEVENTH API - DELETE API
app.get("/delete", (req, res) => {
  secretKeyDB
    .deleteMany({})
    .then(() => {
      console.log("all secretKeys deleted");
    })
    .catch((err) => {
      console.log("error in deleting all records" + err);
    });
});

// API to listen to server
app.listen(3000, () => {
  console.log("listening to server 3000");
});

/*

What Happens in req.user = user

Attach User: The req.user = user; line attaches the decoded user information to the request object.
Access in Route: Later in the /profile route handler, you can access req.user to get the authenticated user’s details.

Why Attach to req?

Consistency:
Once you attach the user object to the req object, it can be accessed in all subsequent middleware or route handlers for the current request.
Security: This ensures that the user data is available during the entire lifecycle of the request without needing to pass it explicitly between different functions.

In short, req.user = user is a convenient way to store the authenticated 
user's data (or any other relevant info) on the request object, making it 
available for further processing in the API.

VIMP:
but  assigning req.user = user in one API request does not automatically make 
the user object available in the req object of subsequent API requests. Each 
HTTP request is stateless and independent, meaning that data assigned to 
the req object in one request is not carried over to the next request.

*/
