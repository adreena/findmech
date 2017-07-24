var express = require('express');
var router = express.Router();

/* GET home page. */

function getHeader(toggle){
  var active ={
    home:false,
    login:false,
    about: false,
    logout:false
  };
  if(toggle == 'home'){
    active.home = true;
  }else if (toggle == 'login') {
    active.login = true;
  }
  else if (toggle == 'about') {
    active.about = true;
  }
  else if (toggle == 'contact') {
    active.contact = true;
  }
  return active;
}

router.get('/', function(req,res,next){
  console.log('authenticated:', req.isAuthenticated());
  if(req.isAuthenticated()){
    res.redirect('/users/myaccount')
  }
  else{
    var active = getHeader('home');
    res.render('index', {active:active});
  }


});
/* GET home page. */
// router.get('/', ensureAuthenticated, function(req, res, next) {
//   res.render('index', { title: 'Members' });
// });
//
// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
//     console.log('>>>',req.isAuthenticated())
// 		return next();
// 	}
//   console.log('****', req.isAuthenticated())
// 	res.redirect('/users/login');
// }



router.get('/about', function(req,res){
  var active = getHeader('about');
  res.render('about', {active:active});
});

router.get('/contact', function(req,res){
  var active = getHeader('contact');
  res.render('contact', {active:active});
});

router.post('/contact/z', function(req,res){
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

module.exports = router;
