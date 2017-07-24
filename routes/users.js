var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //is authenticate
  if (req.isAuthenticated() && req.user){
    res.redirect('/users/myaccount')
  }
});

router.get('/myaccount', function(req,res,next){
  if (req.isAuthenticated() && req.user){
    res.render('myaccount', {user:req.user})
  }
  else {
    res.redirect('/');
  }
})

router.get('/register', function(req, res, next) {
  res.render('register',{message:'',active:{home:false,login: true, about:false, contact:false, logout:false}});
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated() && req.user){
    res.redirect('/users/myaccount')
  }
  res.render('login', {active:{home:false,login: true, about:false, contact:false, logout:false}});
});

router.post('/login', function handleLocalAuthentication(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.status(403).json({message: "no user found"})
        }

        // Manually establish the session...
        req.login(user, function(err) {
            if (err){
               console.log(error)
               return next(err);
             }
            console.log('*** sLoggedin :',user)
            res.redirect('/users/myaccount');
        });
    })(req, res, next);
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done){

  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));

router.post('/register',function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.username;
  var address = req.body.address;
  var password = req.body.password;
  var password2 = req.body.password2;
  var membershipType = req.body.membershipType;
  console.log(membershipType)

  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('address','Address field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username(phone) field is required').notEmpty();
  req.checkBody('membershipType','membership type is required').notEmpty()
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {message:errors, active:{home:false,login: true, about:false, contact:true, logout:false}});
  } else{
  	var newUser = new User({
      name: name,
      email: email,
      username:phone,
      password: password,
      address:address,
      membershipType:membershipType
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
    });

    req.flash('success', 'You are now registered and can login');

    res.render('register', {message:'You are now registered and can login', active:{home:false,login: true, about:false, contact:true, logout:false}});
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/users/login');
});

module.exports = router;
