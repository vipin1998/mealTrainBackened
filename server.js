var http = require("http");
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://vipin1407:vipin1407@cluster0-shard-00-00-8toc1.mongodb.net:27017,cluster0-shard-00-01-8toc1.mongodb.net:27017,cluster0-shard-00-02-8toc1.mongodb.net:27017/mealTrain?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

var port = process.env.PORT||8080;
var users = require('./routes/user');
var admin = require('./routes/admin');
var order = require('./routes/order');
var train = require('./routes/train');

var app = express();

app.use(express.static('public'))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user',users);
app.use('/admin',admin);
app.use('/order',order);
app.use('/train',train);

app.listen(port,function(err)
{
    if(err)
    {
        throw err;
    }
    console.log('app is running at ' + port);
})

/*
MongoClient.connect(uri, function(err, db) 
{
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("Connected Successfully to mongodb");
    }   
});
*/

mongoose.connect('mongodb://127.0.0.1/mealTrain' , function(err,db)
{
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("Connected Successfully to mongodb");
    }
});

process.on('uncaughtException',function(err)
{
    console.log('Caught Exception :'+err);
})