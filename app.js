var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var expressValidator = require('express-validator')
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// views folder:
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//request parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(expressValidator({
    errorFormatter: function(param, msg, value){
      var namespace = param.split('.')
      , root = namespace.shift()
      ,formParam= root;
    while(namespace.length){
      formParam += '[' + namespace.shift() +']';
    }
    return {
      param: formParam,
      msg:msg,
      value:value
    };
  }
}));

app.use(require('connect-flash')());
app.use(function(req,res,next){
  res.locals.message = require('express-messages');
  next();
});

//routes
app.use('/',routes);
app.use('/users',users);

// app.get('/', function(req,res){
//   res.render('index.html');
// });


app.listen(process.env.PORT || 3000, function(){
  console.log("Findmech server listening on port %d in %s mode", this.address().port, app.settings.env);
});
