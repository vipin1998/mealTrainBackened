var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');

var authenticate = require('../authenticate');

var Dish = require('./models/dishes');
var Station = require('./models/stations');
var User = require('./models/users');
var Order = require('./models/orders');
var Comment = require('./models/comments')

var orderRoutes = express.Router();
orderRoutes.use(bodyParser.json());


orderRoutes.get('/getDishes/:code' , function(req,res)
{
    Station.find({"code" : req.params.code})
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

orderRoutes.get('/getFeaturedDish' , function(req , res)
{
    Dish.find({"featured" : true },{_id:0,__v:0}, function(err , dish)
    {
        if(err)
        {
            throw err;
        }
        else{
            res.send(dish[0]);
        }
    })
})

orderRoutes.get('/dishes/:id' , function(req , res)
{
    Dish.find({"id" : req.params.id }, function(err , dish)
    {
        if(err)
        {
            throw err;
        }
        else{
            res.send(dish[0]);
        }
    })
})

orderRoutes.post('/addComment' , authenticate.verifyUser , function(req , res)
{
    Dish.find({"id" : req.body.dishId }, function(err,dish)
    {
        if(err)
        {
            throw err;
        }
        else{
            Comment.create(req.body , function(err2,cm)
            {
                if(err2)
                {
                    throw err2;
                }  
                else{
                    cm.author = req.user.name;
                    cm.dish = dish[0];
                    cm.save(function(err3)
                    {
                       if(err3)
                       {
                           throw err3;
                       } 
                    });
                    dish[0].comments.push(cm);
                    dish[0].save(function(err)
                    {
                        if(err)
                        {
                            throw err;
                        }
                        else{
                            res.Json({
                                "status" : 200,
                                "success" : true
                            });
                        }
                    })
                }
            })
        }
    })
})

orderRoutes.get('/fetchComment/:id' , function(req , res)
{
    Dish.find({"id" : req.params.id})
            .populate('comments')
            .exec(function(err, dish)
            {
                if(err)
                {
                    throw err;
                }
                else
                {
                    var ret = [];
                    for(var i=0;i<dish[0].comments.length;i++)
                    {
                        var ans = {};
                        ans.rating = dish[0].comments[i].rating;
                        ans.comment = dish[0].comments[i].comment;
                        ans.date = dish[0].comments[i].updatedAt;
                        ans.author = dish[0].comments[i].author;
                        ret.push(ans);
                    }
                    res.send(ret);
                }
            })
})

orderRoutes.get('/warning/:id' , function(req,res)
{
    Dish.find({"id" : req.params.id } , function(err , dish)
    {
        dish[0].comments = [];
        dish[0].save(function()
        {
            res.send("success");
        });  
    })
})

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
            res.json({
                "success" : true
            }) 
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
                res.json({
                    "success" : true
                }) 
            });

        })
    }
});

module.exports = orderRoutes;
