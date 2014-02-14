var mysql = require('mysql');
var http = require("http");
var Bookshelf  = require('bookshelf');

Bookshelf.DB = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    //password : 'your_database_password',
    database : 'urls'
  }
});

var handleRequest = require("./request-handler");
var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handleRequest.handleRequest);
server.listen(port, ip);