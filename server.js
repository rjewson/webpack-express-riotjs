var express = require('express');
var path = require('path');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

var redis = require("redis");

app.use(express.static(publicPath));

var client = redis.createClient();
app.get('/db/keys/:pattern?', getKeys);
app.get('/db/key/:key', getKeyDetails);

function getKeys(req, res, next) {
  var pattern = req.params.pattern || "*";
  console.log('getting keys matching pattern ' + pattern);
  client.keys(pattern, function(err, keys) {
    res.json(keys);
  });
}

function getKeyDetails(req, res, next) {
  var key = req.params.key;
  console.log('getting value of key ' + key);
  client.get(key, function(err, value) {
    res.json(value);
  });
}


var server = app;

if (!isProduction) {
  //If in dev, run it through a proxy that also handles webpack
  var webpackProxy = require('./server/support/webpackProxy.js');
  server = webpackProxy(app);
} 

server.listen(port, function () {
  console.log('Server running on port ' + port);
}); 

