var mysql = require('mysql');
var http = require("http");

mysql.connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'test_urls'
});

//mysql.connection();

var handleRequest = require("./request-handler-mysql");
var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handleRequest.handleRequest);
server.listen(port, ip);