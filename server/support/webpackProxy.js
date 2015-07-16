var httpProxy = require('http-proxy');
var http = require('http');

module.exports = function (app) {

	var proxy = httpProxy.createProxyServer({
	  changeOrigin: true,
	  ws: true
	}); 

	var bundle = require('./bundle.js');
	bundle();
	app.all('/build/*', function (req, res) {
		proxy.web(req, res, {
		    target: 'http://127.0.0.1:3001'
		});
	});
	app.all('/socket.io*', function (req, res) {
		proxy.web(req, res, {
		  target: 'http://127.0.0.1:3001'
		});
	});

	proxy.on('error', function(e) {
		console.log(e);
	});

	// We need to use basic HTTP service to proxy
	// websocket requests from webpack
	var server = http.createServer(app);

	server.on('upgrade', function (req, socket, head) {
		proxy.ws(req, socket, head);
	});

	return server;
}