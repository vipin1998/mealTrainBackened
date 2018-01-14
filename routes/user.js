var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var authenticate = require('../authenticate');


var userRoutes = express.Router();
userRoutes.use(bodyParser.json());



var User = require('./models/users');

userRoutes.post('/check', function(req, res)
{    
    User.find({'phone' : req.body.phone}, function(err , old_user)
    {
        if(old_user.length != 0)
        {
            var token = authenticate.getToken({_id: old_user[0]._id});
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You are successfully logged in!'});   
        }
        else
        {
            res.send('Welcome');
        }
    })
});

userRoutes.post('/signUp', function(req, res)
{    
    User.create(req.body , function(err,new_user)
    {
        if (err)
        {
            throw err;
        };
        var token = authenticate.getToken({_id: new_user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, status: 'You are successfully logged in!'});
    })
});

userRoutes.use(passport.initialize());
module.exports = userRoutes;
