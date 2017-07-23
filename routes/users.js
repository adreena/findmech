var express = require('express');
var router = express.Router();
var multer = require('multer');

/* GET home page. */
router.get('/',  function(req,res,next){
  res.render('response');

});
router.get('/login', function(req,res,next){
  res.render('login', {active:{home:false,login: true, about:false, contact:false}});
});
router.get('/register', function(req,res,next){
  res.render('register', {message: '',active:{home:false,login: true, about:false, contact:false}});
});

router.get('/user', function(req,res,next){
  console.log('Loggedin ')
  res.render('user', { name:'kimia', active:{home:false,login: true, about:false, contact:false}});
});

router.post('/register', function(req,res,next){

  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;


  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
    console.log(errors);
    res.render('register', {message: errors, active:{home:false,login: true, about:false, contact:false}});
  } else{
    console.log('No Errors');
  }

});
module.exports = router;
