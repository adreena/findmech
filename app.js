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

app.listen(3000);
console.log('App started on port 3000');
