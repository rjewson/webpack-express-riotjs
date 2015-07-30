var express = require('express');
var path = require('path');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3002;
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

app.listen(port, function () {
  console.log('Server listening on port:' + port);
}); 