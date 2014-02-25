//////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');
var scrape  = require('./scraper/scrape').scrape;
var db      = require('./database/db');

var app = express();


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
  scrape(req.body.url, res);
});


//////////////////////////////////////////////////////////////////
// START THE SERVER
//////////////////////////////////////////////////////////////////

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
