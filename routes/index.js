var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',  function(req,res,next){
  res.render('index', {active:{home:true,login: false, about:false, contact:false}});

});

router.get('/about', function(req,res){
  res.render('about', {active:{home:false,login: false, about:true, contact:false}});
});

router.get('/contact', function(req,res){
  res.render('contact', {active:{home:false,login: false, about:false, contact:true}});
});

router.post('/contact/send', function(req,res){
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
