var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cons = require('consolidate');

var app = express();

// views folder:
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//request parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.get('/', function(req,res){
  res.render('index.html');
});
app.get('/login', function(req,res){
  res.render('login.html');
});
app.get('/about', function(req,res){
  res.render('about.html');
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Findmech server listening on port %d in %s mode", this.address().port, app.settings.env);
});
