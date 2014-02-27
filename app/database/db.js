//////////////////////////////////////////////////////////////////
// MYSQL SETUP
//////////////////////////////////////////////////////////////////

var mysql   = require('mysql');
var Promise = require('bluebird');
var pg      = require('pg');

var conString = "postgres://postgres:password@localhost:5432/wikiviz";
//var client = new pg.Client(conString);

//Promise.promisifyAll(client);

//////////////////////////////////////////////////////////////////
// INSERTING USER INPUT INTO TABLE (inputUrls)
//////////////////////////////////////////////////////////////////

// var urlLinksSelect = function(url, title) {
//   return 'select * from urlLinks where url = \''1
//           + url
//           + '\' AND title != \'NULL\';';
// };


var contains = function(url) {
  return client.queryAsync(urlLinksSelect(url, null));
};


var insertInputUrl = function(data, cb) {
  pg.connect(process.env.HEROKU_POSTGRESQL_GOLD_URL, function(err, client, done) {
    if (err) { console.log(err) }
    else {
      client.query("INSERT INTO urlLinks (url) VALUES ($1)",[data.url]);
      cb();
    }
  });
};


// //////////////////////////////////////////////////////////////////
// // EXPORTING FUNCTIONS
// //////////////////////////////////////////////////////////////////

exports.insertInputUrl = insertInputUrl;
//exports.contains = contains;
// exports.connection = connection;
