const express = require("express");
var Datastore = require('nedb')
var homeroute = require("./routes/homeroute");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
var auth = require("./routes/auth");

var app = express();
app.use(cookieParser());
app.use(express.json());
//gaining access to the DB
db = new Datastore({ filename: 'models/datafile', autoload: true });

// the home route 
app.use("/",homeroute);

// the authentication route 
app.use("/",auth);

//listening at port 3000
app.listen(3000,()=>{
    console.log("running ...");
})

