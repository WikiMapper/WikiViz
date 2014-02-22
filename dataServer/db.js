var mysql   = require('mysql');

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
      'CREATE TABLE IF NOT EXISTS inputUrls ('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY (id),'
        + 'url VARCHAR(100)'
      + ')', function(err) { if (err) console.log(err); }
    );
  });
});


/********
INSERTING USER INPUT INTO TABLE (inputUrls)
*********/

module.exports.insertInputUrl = function(req, res) {
  connection.query('INSERT INTO inputUrls SET ?', 
    req.body, function(err, result) {
      if (err) console.log(err);
      scrapeInputUrl();
      res.send('URL added to database');
  });
}


var scrapeInputUrl = function() {
  connection.query('SELECT url FROM inputUrls ORDER BY id DESC LIMIT 1;', function(err, result) {
    var inputUrl = result[0].url;
  });
};