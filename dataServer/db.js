//////////////////////////////////////////////////////////////////
// MYSQL SETUP
//////////////////////////////////////////////////////////////////

var mysql   = require('mysql');

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
      'CREATE TABLE IF NOT EXISTS inputUrls ('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY (id),'
        + 'url VARCHAR(100)'
      + ')', function(err) { if (err) console.log(err); }
    );
    connection.query(
      'CREATE TABLE IF NOT EXISTS urlToUrls ('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY (id),'
        + 'urla VARCHAR(100),'
        + 'urls VARCHAR(2000)'
      + ')', function(err) { if (err) console.log(err); }
    );
    connection.query(
      'CREATE TABLE IF NOT EXISTS urlToUrl ('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY (id),'
        + 'urla VARCHAR(100),'
        + 'urlb VARCHAR(100)'
      + ')', function(err) { if (err) console.log(err); }
    );
  });
});


//////////////////////////////////////////////////////////////////
// INSERTING USER INPUT INTO TABLE (inputUrls)
//////////////////////////////////////////////////////////////////

var insertInputUrl = function(req, cb) {
  connection.query('INSERT INTO inputUrls SET ?', 
    req.body, function(err, result) {
      if (err) console.log(err);
      cb();
  });
};


//////////////////////////////////////////////////////////////////
// EXPORTING FUNCTIONS
//////////////////////////////////////////////////////////////////

exports.insertInputUrl = insertInputUrl;