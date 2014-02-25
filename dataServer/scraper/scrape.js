var cheerio = require('cheerio');
var request = require('request');
var db      = require('database/db');


var scrape = function(url) {

  var getLinks = function(err, resp, html) {
    var $ = cheerio.load(html);

    $('#mw-content-text a').each(function(i, link) {
      var internal = /#/gi.test( $(link).attr('href') );

      if (!internal) {
        var href = $(link).attr('href');
        db.insertInputUrl(url, href, function() {
          console.log('inserted');
        })    
      }
      
    });
    
  };

  request(url, getLinks);
};


exports.scrape = scrape;
