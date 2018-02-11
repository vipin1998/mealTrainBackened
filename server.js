var http = require("http");
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var port = process.env.PORT||8080;
var users = require('./routes/user');
var admin = require('./routes/admin');
var order = require('./routes/order');
var train = require('./routes/train');

var app = express();

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

mongoose.connect('mongodb://localhost/mealTrain' , function(err,db)
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