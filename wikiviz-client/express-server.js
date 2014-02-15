var express = require('express');
var server = express();
var url = require('url');
var path = require('path');
var fs = require('fs');

console.log('__dirname', __dirname);
//experss.static takes a path, makes it public
server.use(express.static(__dirname + '/app'));

// pokeServer.get('/', function(req, res){
// });

server.listen(8080);
console.log('Listening on port 8080');