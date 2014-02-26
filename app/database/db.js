//////////////////////////////////////////////////////////////////
// MYSQL SETUP
//////////////////////////////////////////////////////////////////

var mysql   = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

//////////////////////////////////////////////////////////////////
// INSERTING USER INPUT INTO TABLE (inputUrls)
//////////////////////////////////////////////////////////////////

var urlLinksSelect = function(url, title) {
  return 'select * from urlLinks where url = '
          + url 
          + 'AND title != ' 
          + title 
          + ';'
};

var dbContains = function(url) {
  connection.query(urlLinksSelect(url, null), function(err, rows) {
    console.log(rows, rows.length);
    return rows.length > 0;
  });
};

//retrieve

var insertInputUrl = function(data, cb) {
  connection.query('USE wikiUrls', function(err, result) {
    var query = connection.query('INSERT INTO urlLinks SET ?', 
    data, function(err, result) {
      if (err) console.log(err);
      cb();
    });
  });
};


//////////////////////////////////////////////////////////////////
// EXPORTING FUNCTIONS
//////////////////////////////////////////////////////////////////

exports.insertInputUrl = insertInputUrl;
exports.dbContains = dbContains;
