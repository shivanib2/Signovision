var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel = require("./users");
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));


router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login', { messages: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password.'
}));

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});


router.post('/signup', function(req, res, next) {
  const { username, email, fullname, password } = req.body;
  const newUser = new userModel({ username, email, fullname });
  userModel.register(newUser, password, function(err, user) {
    if (err) {
      console.error(err);
      return res.redirect('/signup');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/index');
    });
  });
});

router.get('/index', isLoggedIn, function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;
