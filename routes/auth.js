const express = require("express");
var router = express.Router();
const {signin , signup , isSignedUp,isSignedIn,adminroute,isAdmin } = require("../controller/auth");

//signin route
router.post("/signin",signin);

//signup route 
router.post("/signup",isSignedUp, signup);

//router.post("/signout",signout);

router.get("/protected",isSignedIn,isAdmin ,adminroute);


module.exports = router;