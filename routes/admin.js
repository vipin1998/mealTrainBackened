var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dish = require('./models/dishes');
var Station = require('./models/stations');

var Verify = require('./verify');


var adminRoutes = express.Router();
adminRoutes.use(bodyParser.json());


adminRoutes.post('/addDish' ,Verify.checkAdmin , function(req,res)
{
    Dish.create(req.body , function(err)
    {
        if(err)
        {
            throw err;
        }
        res.send('New Dish added Successfuly');
    })
});

adminRoutes.post('/addStation' , Verify.checkAdmin , function(req,res)
{
    Station.create(req.body , function(err)
    {
        if(err)
        {
            throw err;
        }
        res.send('New Station added Successfuly');
    })
});

adminRoutes.post('/addDishStation' , Verify.checkAdmin , function(req,res)
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
                    Dish.find({"name" : req.body.name} , function(err,dsh)
                    {
                        if(err)
                        {
                            throw err;
                        }
                        var flag = 0;
                        for(var i =0;i<stat[0].dishes.length; i++)
                        {
                            if(stat[0].dishes[i].name == dsh[0].name)
                            {
                                flag = 1;
                                res.send('Dish already Exist');
                            }
                        }
                        if(flag == 0)
                        {
                            stat[0].dishes.push(dsh[0]);
                            stat[0].save(function(err)
                            {
                                if(err)
                                {
                                    throw err;
                                }
                                res.send('Dish added Successfuly'); 
                            });
                        }
                    })
                }
            })
});



module.exports = adminRoutes;
