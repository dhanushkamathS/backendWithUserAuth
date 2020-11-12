
// Bringing all the dependencies in
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const exjwt = require('express-jwt');
const secret = "dhanush";
const app = express();

//app.use(bodyParser.json());
app.use(express.json());
app.get("/",(req,res)=>{
  var name = req.body.name;
  var password = req.body.password;
  console.log(name);
  res.send("found");
     
})

app.get("/tk",async (req,res)=>{
    const token = jwt.sign({ foo: 'bar' }, "notsobad");
    console.log(token);
    res.send("ggg");
      
 })

app.get("/token",(req,res)=>{
    var body = req.headers.authorization.split(' ')[1];
   //var decoded = jwt.decode(body) 
        console.log(req) // bar
      
    res.send("gggg");
});




app.listen(3000, () => {
  // eslint-disable-next-line
  console.log(`Magic happens on port ${8080}`);
});


