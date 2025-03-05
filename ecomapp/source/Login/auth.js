var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var pool = require('../../../db');

//Configure the local strategy for use by Passport.
passport.use(new LocalStrategy(function verify(username, password, cb) {
        pool.query('SELECT * FROM users WHERE username = $1', [username], function(err, result) {
            if (err) {
                return cb(err);
            }
            if (result.rows.length === 0) { 
                return cb(null, false, { message: 'Incorrect username or password' }); 
            }
            var row = result.rows[0];
                
            crypto.pbkdf2(password, row.salt, 310000, 32, 'sha512', (err, hashedPassword) => {
                if (err) { 
                    return cb(err); 
                }
                if (!crypto.timingSafeEqual(Buffer.from(row.hashed_password, 'hex'), hashedPassword)) {
                    return cb(null, false, { message: 'Incorrect username or password' });
            }
            return cb(null, row);
            });
        });
    }
));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, user);
    });
});

//Login route
router.get('/login', function(req, res, next) {
    res.render('login');
});
//use - localhost:5001/auth/login


router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));


//Logout route
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
    }
      res.redirect('/');
    });
  });

  //SIGN UP

  router.get('/signup', function(req, res, next) {
    res.render('signup');
  });

  router.post('/signup', function(req, res, next) {
    var salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha512', (err, hashedPassword) => {
        if (err) { 
            return next(err); 
        }
        pool.query('INSERT INTO users (username, hashed_password, salt, first_name, last_name, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', 
            [req.body.username, hashedPassword.toString('hex'), salt, req.body.first_name, req.body.last_name, req.body.address], 
            function(err, result) {            
            if (err) { 
                return next(err); 
            }
            var user = {
                id: result.rows[0].id,
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address
            };
            req.login(user, function(err) {
                if (err) { 
                    return next(err); 
                }
                res.redirect('/');
            });
        });
    });
});
module.exports = router;