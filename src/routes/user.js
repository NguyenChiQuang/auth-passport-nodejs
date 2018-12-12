const express = require('express');
const passport = require('passport');
const facebookLoginStrategy = require('../passport/login-facebook');
const user = require('../controllers/user');

const authCheckMiddleware = require('../middleware/auth-check');


passport.use('facebook-login', facebookLoginStrategy)
const router = express.Router();

router.post('/login/local', user.login.manual);

router.get('/login/fb', user.login.facebook);

router.get('/login/facebook/callback', passport.authenticate('facebook-login', { successRedirect: '/',
failureRedirect: '/login' }));

router.get('/login/google', user.login.google);

router.get('/login/google/callback', (req,res)=>{
    res.send('you reached call back uri');
});

router.post('/register', user.register);

router.get('/user', authCheckMiddleware, user.getAll)



module.exports = router;