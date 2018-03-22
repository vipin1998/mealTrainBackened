var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

var userRoutes = express.Router();
userRoutes.use(bodyParser.json());

var User = require('./models/users');


userRoutes
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post('/login',cors.corsWithOptions, function(req, res)
{    
    User.find({'phone' : req.body.phone,'password' : req.body.password}, function(err , old_user)
    {
        if(old_user.length != 0)
        {
            var token = authenticate.getToken({_id: old_user[0]._id});
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: old_user[0]["name"]});   
        }
        else
        {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, token:'none' , status: 'Invalid Username or Password'})
        }
    })
});

userRoutes
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post('/register', cors.corsWithOptions, function(req, res)
{    
    User.find({'phone' : req.body.phone}, function(err , old_user)
    {
        if(old_user.length != 0)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, token: 'none', status: 'Mobile Number already Exist'});  
        }
        else
        {
            User.create(req.body , function(err,new_user)
            {
                if (err)
                {
                    throw err;
                }
                else
                {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, token: 'none', status: 'Registeration Successfully'}); 
                }
            })
        }
    })
});

userRoutes.use(passport.initialize());
module.exports = userRoutes;
