var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');

var authenticate = require('../authenticate');

var Dish = require('./models/dishes');
var Station = require('./models/stations');
var User = require('./models/users');
var Order = require('./models/orders');

var orderRoutes = express.Router();
orderRoutes.use(bodyParser.json());



orderRoutes.post('/getDishes' ,authenticate.verifyUser, function(req,res)
{
    Station.find({"code" : req.body.code})
            .populate('dishes')
            .exec(function(err, stat)
            {
                if(err)
                {
                    throw err;
                }
                else
                {
                    res.send(stat[0].dishes);
                }
            })
});

orderRoutes.post('/addToCart' ,authenticate.verifyUser, function(req,res)
{
    Dish.find({"name" : req.body.name} ,function(err,dish)
    {
        if(err)
        {
            throw err;
        }
        req.user.Cart.push(dish[0]._id); 
        req.user.save(function(err)
        {
            if(err)
            {
                throw err;
            }
            res.send('Dish added Successfuly'); 
        });     
    })
});

orderRoutes.post('/makeOrder' ,authenticate.verifyUser, function(req,res)
{
    if(req.user.Cart.length == 0)
    {
        res.send('Cart is empty');       
    }
    else
    {
        Order.create(req.body , function(err,order)
        {
            if(err)
            {
                throw err;   
            }
            var p = 0;
            for(var i = 0;i<req.user.Cart.length;i++)
            {
                order.dishes.push(req.user.Cart[i]);   
            }
            req.user.Cart.splice(0,req.user.Cart.length)
            req.user.save();
            order.user = req.user._id;
            order.save(function()
            {
                res.send("order Successful");  
            });

        })
    }
});

module.exports = orderRoutes;
