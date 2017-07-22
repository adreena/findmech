var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',  function(req,res,next){
  res.render('response');

});
router.get('/login', function(req,res){
  res.render('login', {active:{home:false,login: true, about:false, contact:false}});
});
router.get('/register', function(req,res){
  res.render('register', {active:{home:false,login: true, about:false, contact:false}});
});

router.get('/user', function(req,res){
  console.log('Loggedin ')
  res.render('user', { name:'kimia', active:{home:false,login: true, about:false, contact:false}});
});

router.post('/register', function(req,res){
  res.redirect('user');
});
module.exports = router;
