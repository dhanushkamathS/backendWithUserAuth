const express = require("express");
var router = express.Router();
const { homepage } = require("../controller/homeroute");



router.get("/tata",homepage);

module.exports = router;

