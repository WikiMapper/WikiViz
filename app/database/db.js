//////////////////////////////////////////////////////////////////
// MYSQL SETUP
//////////////////////////////////////////////////////////////////

var mysql   = require('mysql');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: ''
// });

var db_config = {
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b6c17621c70215',
    password: 'cb66271d',
    database: 'heroku_73f08b2ebf46a85'
};

var connection;

function handleDisconnect() {
  console.log('1. connecting to db:');
  connection = mysql.createConnection(db_config); // Recreate the connection, since the old one cannot be reused.
  connection.connect(function(err) {  // The server is either down
    if (err) {  // or restarting (takes a while sometimes).
      console.log('2. error when connecting to db:', err);
      setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
    }  // to avoid a hot loop, and to allow our node script to
  });  // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('3. db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {  // Connection to the MySQL server is usually
      handleDisconnect();  // lost due to either server restart, or a
    } else {  // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

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
