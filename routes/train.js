var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const https = require('https');
var config = require('../config');
const fetch = require('node-fetch');
var Station = require('./models/stations');
var trainRoutes = express.Router();
trainRoutes.use(bodyParser.json());


trainRoutes.get('/query/:trainNumber', function(req,res)
{
    var trainNumber = req.params.trainNumber;
    const options = {
      hostname: config.railwayBaseUrl,
      port: 443,
      path: '/v2/route/train/'+trainNumber+'/apikey/'+config.railwayKey,
      method: 'GET'
    };
    
    fetch(options.hostname + options.path)
    .then(res => res.json())
    .then(function(json)
    {
      
      var stat = []
      
      for(var i=0;i<json["route"].length;i++)
      {
        var dict = { };
        dict["name"] = json["route"][i]["station"]["name"];
        dict["code"] =json["route"][i]["station"]["code"];
        stat.push(dict);
      }
      res.send(stat)
      
    })
    .catch(err => console.error(err))
});


trainRoutes.get('/allStations' , function(req , res)
{
    Station.find({},{_id : 0,code : 1, name : 1} , function (err , stat)
    {
        if(err)
        {
          throw err;
        }
        else
        {
          res.send(stat)
        }
    })
})

module.exports = trainRoutes;
