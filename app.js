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

app.get('/contact', function(req,res){
  res.render('contact.html');
});

app.post('/contact/send', function(req,res){
  var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user:'kim.hszd@gmail.com',
      pass:'Stanlaurel9530!'
    }
  });
  var mailOptions = {
    from: 'B T',
    to: 'khassanz@ualberta.ca',
    subject:'boogh submission',
    text:'You have a submission from Name:'+req.body.name+' Email:'+ req.body.email+ 'Message:'+req.body.message,
    html: '<p>You have a submission with following details</p> <ul><li>from Name:'+req.body.name+'</li><li>Email:'+ req.body.email+ '</li><li>Message:'+req.body.message+'</li></ul>'
  };
  transporter.sendMail(mailOptions, function(error,info){
      if(error){
        console.log(error);
        res.redirect('/');
      }
      else{
        console.log('Message Sent');
        res.redirect('/')
      }
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Findmech server listening on port %d in %s mode", this.address().port, app.settings.env);
});
