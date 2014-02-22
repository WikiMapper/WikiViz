//////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');
var mysql   = require('mysql')

var app = express();


//////////////////////////////////////////////////////////////////
// MYSQL SETUP
//////////////////////////////////////////////////////////////////

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.query('CREATE DATABASE IF NOT EXISTS wikiUrls', function(err) {
  if (err) console.log(err);
  connection.query('USE wikiUrls', function(err) {
    if (err) console.log(err);
    connection.query(
      'CREATE TABLE IF NOT EXISTS urls('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY (id),'
        + 'url VARCHAR(100)'
      + ')', function(err) { if (err) console.log(err); }
    );
  });
});


//////////////////////////////////////////////////////////////////
// EXPRESS SETUP
//////////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//////////////////////////////////////////////////////////////////
// EXPRESS ROUTING
//////////////////////////////////////////////////////////////////

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/urls', function(req, res) {
  connection.query('INSERT INTO urls SET ?', req.body, function(err, result) {
    if (err) console.log(err);
    res.send('URL added to database');
  });
});


//////////////////////////////////////////////////////////////////
// START THE SERVER
//////////////////////////////////////////////////////////////////

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});