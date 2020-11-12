var Datastore = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = "thisISWorking";
var jwt = require("jsonwebtoken");
db = new Datastore({ filename: '../models/datafile', autoload: true });


//checks if the user aready exists before adding him to the DB
exports.isSignedUp = (req,res,next)=>{
  var user = req.body;
  console.log(typeof(user.name));
  db.find({name:`${user.name}`},function (err,docs){
    if(err) return res.send("err found");
    if(docs.length >0) res.send(`${user.name} already exist`);
    else next();
  });
}

//user signup route
exports.signup= (req,res)=>{
  var name = req.body.name;
  var planePassword = req.body.password;
  var isadmin = req.body.admin
  console.log(name);
  // hash the plainPassword and stores hashedPassword in DB 
  bcrypt.hash(planePassword, saltRounds, function(err, hashedPassword) {
    if (err) {
      console.log(err);
      return res.send("something went wrong. try again");
    }
    
    var user ={name :`${name}`,hashedPassword :`${hashedPassword}`,admin:`${isadmin}`};

    //insert the user into the DB
    db.insert(user , function (err){
      if (!err) return res.send("added to db");
      return res.send("could not add");
      });  
  });
};

//signin route

exports.signin = (req,res)=>{
  const name = req.body.name;
  const plainPassword = req.body.password;

  db.find({name:`${name}`},function (err,docs){
    if(err) return res.send("err found");
    if(docs.length ==0) return res.send("user does not exist");

    bcrypt.compare(plainPassword, docs[0].hashedPassword, function(err, result) {
      if (err)  return res.send("something went wrong");
      
      if(result){
        const user = {id :docs[0]._id};
        jwt.sign(user,secret,(err,token)=>{
          if(!err) return res.json({token :token});
          else return res.send("something went wrong");
        })
        
      }
      else return res.send("user and password does not match");    
      });
  });
  
};

exports.isSignedIn = (req,res,next)=>{
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token,secret,(err,decoded)=>{
        if (!err) {
          req.userId = decoded.id;
          next()}
        else return res.send("not authorized");
  });
}

exports.adminroute = (req,res)=>{
  //console.log(req.userId);
  res.send("u r in admin page");
}

exports.isAdmin  = (req,res,next)=>{
  const userId = req.userId;
  db.find({_id: userId },function  (err,docs){
    if(err || docs.length ==0) return res.send("not authorized");
    if(docs[0].admin == 1) next();
    else return res.send("not authorized to go ");
  })
}
