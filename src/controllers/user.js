const mongoose = require('mongoose');
const passport = require('passport');
const localLoginStrategy = require('../passport/login-passport');

passport.use('local-login', localLoginStrategy);

const User = require('../models/user');

module.exports = {
    login: (req, res, next) => {
        return passport.authenticate('local-login', (err, token, data) => {
            if (err) {
                return res.status(403).json(err);
            }
            return res.json({
                token,
                data
            });
        })(req, res, next);
    },

    register: (req, res, next) => {
        const { email, password } = req.body;
        const user = new User({ email, password });
        if (!email || !password) { throw new Error('You must provide an email and password.'); }
      
        return User.findOne({ email })
            .then(existingUser => {
                if (existingUser) {
                return res.status(403).json('Email in use');
                }
                return res.json(user.save());
            });
    },

    getAll: (req, res, next) => {
        return User.findAll({})
            .then(users => {
                res.status(201).send({ data: users})
            })
    }
}