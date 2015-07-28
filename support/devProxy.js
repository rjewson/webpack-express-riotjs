var http = require('http');
var httpProxy = require('http-proxy');
var express = require('express');

var app = express();

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
}); 

var bundler = require('./webPackBundler.js')();

app.all('/build/*', function (req, res) {
	proxy.web(req, res, {
	    target: 'http://localhost:3001'
	});
});

app.all('/socket.io*', function (req, res) {
	proxy.web(req, res, {
	  target: 'ws://localhost:3001',
	  ws:true
	});
});

app.all('/*', function (req, res) {
	proxy.web(req, res, {
	  target: 'http://localhost:3002'
	});
});

proxy.on('error', function(e) {
	console.log(e);
});

var server = http.createServer(app);

server.on('upgrade', function (req, socket, head) {
	proxy.ws(req, socket, head);
});

server.listen(3000, function () {
  console.log('Server running on port ' + 3000);
}); 
