//////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');
var request = require('request');
var scrape  = require('./scraper/scrape').scrape;
var db      = require('./database/db');
var mysql   = require('mysql');
var pg      = require('pg');

var app = express();


//////////////////////////////////////////////////////////////////
// EXPRESS SETUP
//////////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var conString = "postgres://postgres:password@localhost:5432/wikiviz";


//////////////////////////////////////////////////////////////////
// EXPRESS ROUTING
//////////////////////////////////////////////////////////////////

// app.get('/', routes.index);  //KEEP ME!

// app.get('/', function(request, response) {
//   console.log('SERVING ROOT');
//   var client = new pg.Client(conString);
//   client.connect(function(err) {
//     if(err) {
//       return console.error('could not connect to postgres', err);
//     }
//     console.log("Made the connection");
//     var query = client.query("INSERT INTO urlLinks (url) VALUES ($1)",['www.hi.com'])

    // query.on('row', function(row){
    //   response.end(row.id + ' ' + row.url);
    // });
//     response.end('hello world ' + query);
//   });
// });
app.get('/', function(request, response) {
  pg.connect(process.env.HEROKU_POSTGRESQL_GOLD_URL, function(err, client, done) {
    client.query("INSERT INTO urlLinks (url) VALUES ($1)",['www.hi.com']);
    });
  });
  response.end('hi');
});

// app.get('/', function(request, response) {
//     db.connection.query("SELECT * FROM urls", function(err, rows, fields) {
//         if (err) {
//             console.log('error: ', err);
//             throw err;
//             response.send("ERROR: " + error);

//         } else {
//           response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
//         }
//     });
// });

app.post('/urls', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log(req.body.url);
  scrape(req.body.url, res);
});


//////////////////////////////////////////////////////////////////
// START THE SERVER
//////////////////////////////////////////////////////////////////

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
