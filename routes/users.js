var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserController = require('../controllers/user.controller.js');
var User = require('../schemas/user.schema.js');


router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});


/*Register*/
router.get('/register', function(req, res,next) {
   res.render('register',{title: 'Register'});
});
