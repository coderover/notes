var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('./config');

var logger = require('./lib/log');
var db = require('./lib/db');

var app = express();
module.exports = app;

// all environments
app.set('port', config.port);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded())
app.use(express.methodOverride());
app.use(express.basicAuth("system","Sy5t3m"));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Application routes
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});